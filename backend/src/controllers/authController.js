import { users } from '../data/store.js';
import { signAccessToken } from '../utils/jwt.js';

export function login(req, res) {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role, email: user.email });
  return res.json({ accessToken, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
}
