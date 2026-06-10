import express from 'express';
import { createAdminToken, isValidAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!isValidAdmin(username, password)) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  res.json({
    token: createAdminToken(username, password),
    username
  });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
