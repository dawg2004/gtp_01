import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'dev_access_secret_change_me',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  corsOrigin: process.env.CORS_ORIGIN ?? '*'
};
