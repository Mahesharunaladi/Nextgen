import mongoose from 'mongoose';

const studentInquirySchema = new mongoose.Schema(
  {
    inquiryId: {
      type: String,
      required: [true, 'Inquiry ID is required'],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[0-9]{10}$|^[+][0-9]{1,3}[0-9]{9,}$/, 'Please provide a valid mobile number']
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required']
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters']
    },
    submissionDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'interested', 'enrolled', 'rejected'],
      default: 'new'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    notes: {
      type: String,
      trim: true
    },
    followUpDate: {
      type: Date,
      default: null
    },
    isContacted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create index for faster queries
studentInquirySchema.index({ email: 1, submissionDate: -1 });
studentInquirySchema.index({ status: 1 });
studentInquirySchema.index({ course: 1 });

const StudentInquiry = mongoose.model('StudentInquiry', studentInquirySchema);

export default StudentInquiry;
