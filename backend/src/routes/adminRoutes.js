import express from 'express';
import Admin from '../models/Admin.js';

const router = express.Router();

// CREATE new admin
router.post('/', async (req, res) => {
  try {
    const { adminId, username, password, email } = req.body;

    // Validate required fields
    if (!adminId || !username || !password || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }, { adminId }]
    });

    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists' });
    }

    const admin = new Admin({ adminId, username, password, email });
    const savedAdmin = await admin.save();
    
    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        _id: savedAdmin._id,
        adminId: savedAdmin.adminId,
        username: savedAdmin.username,
        email: savedAdmin.email,
        role: savedAdmin.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET admin by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE admin
router.put('/:id', async (req, res) => {
  try {
    const { username, email, role, isActive } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({
      message: 'Admin updated successfully',
      admin
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE password
router.put('/:id/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    const admin = await Admin.findById(req.params.id).select('+password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isPasswordCorrect = await admin.comparePassword(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE admin
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    res.status(200).json({
      message: 'Login successful',
      admin: {
        _id: admin._id,
        adminId: admin.adminId,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
