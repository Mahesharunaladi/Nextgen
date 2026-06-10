import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
      maxlength: [120, 'Course title cannot be more than 120 characters']
    },
    tag: {
      type: String,
      required: [true, 'Please provide a course category'],
      trim: true,
      maxlength: [40, 'Course category cannot be more than 40 characters']
    },
    duration: {
      type: String,
      required: [true, 'Please provide course duration'],
      trim: true,
      maxlength: [60, 'Duration cannot be more than 60 characters']
    },
    overview: {
      type: String,
      required: [true, 'Please provide a course overview'],
      trim: true,
      maxlength: [1000, 'Overview cannot be more than 1000 characters']
    },
    technologies: {
      type: [String],
      default: []
    },
    outcomes: {
      type: [String],
      default: []
    },
    careers: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
