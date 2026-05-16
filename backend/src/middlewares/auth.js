import { verifyAccessToken } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = header.slice(7);
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
