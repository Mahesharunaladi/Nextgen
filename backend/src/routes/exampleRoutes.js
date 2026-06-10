import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// CREATE new course
router.post('/', async (req, res) => {
  try {
    const { courseId, courseName, description, duration } = req.body;

    // Validate required fields
    if (!courseId || !courseName || !description || !duration) {
      return res.status(400).json({ error: 'courseId, courseName, description, and duration are required' });
    }

    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json({
      message: 'Course created successfully',
      course: savedCourse
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all courses
router.get('/', async (req, res) => {
  try {
    const { isActive, level, category } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (level) filter.level = level;
    if (category) filter.category = category;

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET course by ID
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

// GET course by courseId
router.get('/courseId/:courseId', async (req, res) => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE course
router.delete('/:id', async (req, res) => {
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

// Get active courses only
router.get('/filter/active', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({ courseName: 1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
