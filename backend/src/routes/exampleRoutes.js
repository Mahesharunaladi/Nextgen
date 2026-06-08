import express from 'express';
import Example from '../models/Example.js';

const router = express.Router();

// GET all examples
router.get('/', async (req, res) => {
  try {
    const examples = await Example.find().sort({ createdAt: -1 });
    res.status(200).json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET example by ID
router.get('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }
    res.status(200).json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new example
router.post('/', async (req, res) => {
  try {
    const example = new Example(req.body);
    const savedExample = await example.save();
    res.status(201).json(savedExample);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE example
router.put('/:id', async (req, res) => {
  try {
    const example = await Example.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }
    res.status(200).json(example);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE example
router.delete('/:id', async (req, res) => {
  try {
    const example = await Example.findByIdAndDelete(req.params.id);
    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }
    res.status(200).json({ message: 'Example deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
