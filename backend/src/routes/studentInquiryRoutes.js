import express from 'express';
import StudentInquiry from '../models/StudentInquiry.js';
import Course from '../models/Course.js';

const router = express.Router();

// CREATE new student inquiry
router.post('/', async (req, res) => {
  try {
    const { inquiryId, name, email, mobileNumber, course, courseName, message } = req.body;

    // Validate required fields
    if (!inquiryId || !name || !email || !mobileNumber || !course || !courseName || !message) {
      return res.status(400).json({ 
        error: 'inquiryId, name, email, mobileNumber, course, courseName, and message are required' 
      });
    }

    // Verify course exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const inquiry = new StudentInquiry(req.body);
    const savedInquiry = await inquiry.save();

    // Populate course reference
    await savedInquiry.populate('course', 'courseName courseId');

    res.status(201).json({
      message: 'Student inquiry created successfully',
      inquiry: savedInquiry
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all inquiries
router.get('/', async (req, res) => {
  try {
    const { status, priority, course, isContacted } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (course) filter.course = course;
    if (isContacted !== undefined) filter.isContacted = isContacted === 'true';

    const inquiries = await StudentInquiry.find(filter)
      .populate('course', 'courseName courseId')
      .sort({ submissionDate: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET inquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await StudentInquiry.findById(req.params.id)
      .populate('course', 'courseName courseId');

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE inquiry
router.put('/:id', async (req, res) => {
  try {
    const inquiry = await StudentInquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('course', 'courseName courseId');

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.status(200).json({
      message: 'Inquiry updated successfully',
      inquiry
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE inquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['new', 'contacted', 'interested', 'enrolled', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const inquiry = await StudentInquiry.findByIdAndUpdate(
      req.params.id,
      { status, isContacted: status !== 'new' ? true : false },
      { new: true }
    ).populate('course', 'courseName courseId');

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.status(200).json({
      message: 'Inquiry status updated successfully',
      inquiry
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await StudentInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET inquiries by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const inquiries = await StudentInquiry.find({ course: req.params.courseId })
      .populate('course', 'courseName courseId')
      .sort({ submissionDate: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET inquiries by email
router.get('/email/:email', async (req, res) => {
  try {
    const inquiries = await StudentInquiry.find({ email: req.params.email })
      .populate('course', 'courseName courseId')
      .sort({ submissionDate: -1 });

    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET inquiries statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalInquiries = await StudentInquiry.countDocuments();
    const byStatus = await StudentInquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byPriority = await StudentInquiry.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    const contacted = await StudentInquiry.countDocuments({ isContacted: true });

    res.status(200).json({
      totalInquiries,
      contacted,
      byStatus,
      byPriority
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
