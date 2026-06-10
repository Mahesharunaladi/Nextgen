import express from 'express';
import Course from '../models/Course.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

const normalizeList = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean);
  return [];
};

const normalizeCourse = (body) => ({
  ...body,
  technologies: normalizeList(body.technologies),
  outcomes: normalizeList(body.outcomes),
  careers: normalizeList(body.careers)
});

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const course = await Course.create(normalizeCourse(req.body));
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      normalizeCourse(req.body),
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
