const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'nextgen-admin-secret';

export function createAdminToken(username, password) {
  return Buffer.from(`${username}:${password}:${ADMIN_SECRET}`).toString('base64url');
}

export function isValidAdmin(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const expectedToken = createAdminToken(ADMIN_USERNAME, ADMIN_PASSWORD);

  if (!token || token !== expectedToken) {
    return res.status(401).json({ error: 'Admin authentication required' });
  }

  next();
}
