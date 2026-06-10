import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    mobile: {
      type: String,
      required: [true, 'Please provide mobile number'],
      trim: true,
      maxlength: [20, 'Mobile number cannot be more than 20 characters']
    },
    courseInterestedIn: {
      type: String,
      required: [true, 'Please provide interested course'],
      trim: true,
      maxlength: [120, 'Course name cannot be more than 120 characters']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1200, 'Message cannot be more than 1200 characters']
    }
  },
  {
    timestamps: true
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
