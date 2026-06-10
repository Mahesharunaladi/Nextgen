import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: [true, 'Course ID is required'],
      unique: true,
      trim: true
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      maxlength: [100, 'Course name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      example: '3 months', // e.g., "3 months", "6 weeks", "12 hours"
      description: 'Course duration in human-readable format'
    },
    instructor: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      trim: true,
      example: 'Technology, Business, Design, etc.'
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Beginner'
    },
    price: {
      type: Number,
      default: 0
    },
    maxStudents: {
      type: Number,
      default: null
    },
    enrolledStudents: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
