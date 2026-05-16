import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

export default app;
