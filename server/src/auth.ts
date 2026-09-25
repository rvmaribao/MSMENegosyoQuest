import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { Config } from './config.js';
import { AppError } from './domain.js';

export type AdminRequest = Request & { admin?: { username: string } };

export function signAdminToken(config: Config) {
  return jwt.sign({ role: 'admin', username: config.ADMIN_USERNAME }, config.JWT_SECRET, { expiresIn: '8h' });
}

export function requireAdmin(config: Config) {
  return (request: AdminRequest, _response: Response, next: NextFunction) => {
    const token = request.header('authorization')?.replace(/^Bearer\s+/i, '');
    if (!token) return next(new AppError(401, 'Admin authentication is required.'));
    try {
      const payload = jwt.verify(token, config.JWT_SECRET);
      if (typeof payload === 'string' || payload.role !== 'admin' || payload.username !== config.ADMIN_USERNAME) {
        throw new Error('Invalid token payload');
      }
      request.admin = { username: payload.username };
      return next();
    } catch {
      return next(new AppError(401, 'Your admin session is invalid or has expired.'));
    }
  };
}