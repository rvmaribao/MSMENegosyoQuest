import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import type { Config } from '../src/config.js';

const config: Config = {
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/negosyo_quest?schema=public',
  JWT_SECRET: 'test-jwt-secret-that-is-long-enough',
  ADMIN_USERNAME: 'facilitator',
  ADMIN_PASSWORD: 'test-password-that-is-long-enough',
  FRONTEND_URL: 'https://msme-negosyo-quest-client.vercel.app',
  PORT: 4000,
  NODE_ENV: 'production',
  TRUST_PROXY: 0,
};

describe('HTTP deployment contract', () => {
  it('authenticates valid admin environment credentials through POST /api/admin/login', async () => {
    const response = await request(createApp(config)).post('/api/admin/login').send({ username: config.ADMIN_USERNAME, password: config.ADMIN_PASSWORD });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ expiresIn: 28_800 });
    expect(response.body.token).toEqual(expect.any(String));
  });

  it('rejects invalid admin environment credentials through POST /api/admin/login', async () => {
    const response = await request(createApp(config)).post('/api/admin/login').send({ username: config.ADMIN_USERNAME, password: 'not-the-admin-password' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid admin credentials.');
  });

  it('serves the health endpoint with the configured production CORS origin', async () => {
    const response = await request(createApp(config)).get('/api/health').set('Origin', config.FRONTEND_URL);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
    expect(response.headers['access-control-allow-origin']).toBe(config.FRONTEND_URL);
  });

  it('accepts API preflight requests without allowing an unrelated production origin', async () => {
    const app = createApp(config);
    const allowed = await request(app).options('/api/admin/login').set('Origin', config.FRONTEND_URL).set('Access-Control-Request-Method', 'POST').set('Access-Control-Request-Headers', 'Content-Type, Authorization');
    const denied = await request(app).get('/api/health').set('Origin', 'https://untrusted.example');
    expect(allowed.status).toBe(204);
    expect(allowed.headers['access-control-allow-origin']).toBe(config.FRONTEND_URL);
    expect(allowed.headers['access-control-allow-headers']).toContain('Authorization');
    expect(denied.headers['access-control-allow-origin']).toBeUndefined();
  });
});