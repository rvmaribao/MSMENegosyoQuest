import { randomUUID } from 'node:crypto';
import type { ErrorRequestHandler, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import type { Config } from './config.js';
import { requireAdmin, signAdminToken } from './auth.js';
import { AppError } from './domain.js';
import * as service from './service.js';

const registrationSchema = z.object({ fullName: z.string().trim().min(2).max(120), businessName: z.string().trim().min(2).max(160), location: z.string().trim().min(2).max(160), industry: z.string().trim().min(2).max(80), email: z.string().trim().email().max(254).optional().or(z.literal('')), mobile: z.string().trim().min(7).max(30).optional().or(z.literal('')) });
const submissionSchema = z.object({ participantId: z.string().uuid(), answers: z.array(z.object({ questionId: z.string().min(1), selectedOption: z.number().int() })).length(10) });
const loginSchema = z.object({ username: z.string().trim().min(1).max(120), password: z.string().min(1).max(256) });
const settingSchema = z.object({ postTestOpen: z.boolean() });

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) throw new AppError(400, result.error.issues[0]?.message ?? 'Invalid request.');
  return result.data;
}

export function createApp(config: Config) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.TRUST_PROXY);
  app.use(helmet());
  app.use(cors({ origin: [config.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'], methods: ['GET', 'POST', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_request, response) => response.status(200).json({ status: 'ok' }));
  app.post('/api/participants', async (request, response, next) => { try { response.status(201).json(await service.registerParticipant(parse(registrationSchema, request.body))); } catch (error) { next(error); } });
  app.get('/api/participants/:id', async (request, response, next) => { try { response.json(await service.getParticipant(request.params.id)); } catch (error) { next(error); } });
  app.get('/api/assessment/status/:participantId', async (request, response, next) => { try { response.json(await service.assessmentStatus(request.params.participantId)); } catch (error) { next(error); } });
  app.get('/api/assessment/pre/questions', async (_request, response, next) => { try { response.json(await service.assessmentQuestions('PRE')); } catch (error) { next(error); } });
  app.post('/api/assessment/pre/submit', async (request, response, next) => { try { const body = parse(submissionSchema, request.body); response.json(await service.submitAssessment('PRE', body.participantId, body.answers)); } catch (error) { next(error); } });
  app.get('/api/assessment/post/questions', async (request, response, next) => { try { const participantId = typeof request.query.participantId === 'string' ? request.query.participantId : undefined; response.json(await service.assessmentQuestions('POST', participantId)); } catch (error) { next(error); } });
  app.post('/api/assessment/post/submit', async (request, response, next) => { try { const body = parse(submissionSchema, request.body); response.json(await service.submitAssessment('POST', body.participantId, body.answers)); } catch (error) { next(error); } });
  app.get('/api/leaderboard', async (_request, response, next) => { try { response.json(await service.leaderboard()); } catch (error) { next(error); } });

  const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false, message: { message: 'Too many login attempts. Please try again later.' } });
  app.post('/api/admin/login', loginLimiter, (request, response, next) => { try { const credentials = parse(loginSchema, request.body); if (credentials.username !== config.ADMIN_USERNAME || credentials.password !== config.ADMIN_PASSWORD) throw new AppError(401, 'Invalid admin credentials.'); response.json({ token: signAdminToken(config), expiresIn: 8 * 60 * 60 }); } catch (error) { next(error); } });

  const admin = express.Router();
  admin.use(requireAdmin(config));
  admin.get('/dashboard', async (_request, response, next) => { try { response.json(await service.dashboard()); } catch (error) { next(error); } });
  admin.get('/participants', async (request, response, next) => { try { response.json(await service.adminParticipants(typeof request.query.search === 'string' ? request.query.search : '', typeof request.query.status === 'string' ? request.query.status : undefined)); } catch (error) { next(error); } });
  admin.get('/participants/:id', async (request, response, next) => { try { response.json(await service.adminParticipant(request.params.id)); } catch (error) { next(error); } });
  admin.delete('/participants/:id', async (request, response, next) => { try { await service.deleteParticipant(request.params.id); response.status(204).end(); } catch (error) { next(error); } });
  admin.post('/participants/:id/reset-pre', async (request, response, next) => { try { await service.resetAssessment(request.params.id, 'PRE'); response.status(204).end(); } catch (error) { next(error); } });
  admin.post('/participants/:id/reset-post', async (request, response, next) => { try { await service.resetAssessment(request.params.id, 'POST'); response.status(204).end(); } catch (error) { next(error); } });
  admin.get('/settings', async (_request, response, next) => { try { response.json(await service.postTestSetting()); } catch (error) { next(error); } });
  admin.patch('/settings/post-test', async (request, response, next) => { try { response.json(await service.updatePostTestSetting(parse(settingSchema, request.body).postTestOpen)); } catch (error) { next(error); } });
  admin.get('/leaderboard', async (_request, response, next) => { try { response.json(await service.leaderboard()); } catch (error) { next(error); } });
  admin.get('/analytics', async (_request, response, next) => { try { response.json(await service.analytics()); } catch (error) { next(error); } });
  app.use('/api/admin', admin);

  app.use((_request, _response, next) => next(new AppError(404, 'Endpoint not found.')));
  const errorHandler: ErrorRequestHandler = (error, request: Request, response: Response, _next) => {
    const requestId = request.header('x-request-id') ?? randomUUID();
    const status = error instanceof AppError ? error.status : 500;
    if (status >= 500) console.error({ requestId, error });
    response.status(status).json({ message: status >= 500 && config.NODE_ENV === 'production' ? 'Something went wrong. Please try again.' : error instanceof Error ? error.message : 'Something went wrong.', requestId });
  };
  app.use(errorHandler);
  return app;
}