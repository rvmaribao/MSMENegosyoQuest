import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().regex(/^postgres(ql)?:\/\//),
  JWT_SECRET: z.string().min(32),
  ADMIN_USERNAME: z.string().trim().min(1),
  ADMIN_PASSWORD: z.string().min(12),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  TRUST_PROXY: z.coerce.number().int().min(0).max(5).default(0),
});
export type Config = z.infer<typeof schema>;
export function readConfig(): Config {
  const result = schema.safeParse(process.env);
  if (!result.success) throw new Error(`Invalid server environment: ${result.error.issues.map(issue => issue.path.join('.')).join(', ')}`);
  return result.data;
}
