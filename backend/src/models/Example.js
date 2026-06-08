import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [50, 'Title cannot be more than 50 characters']
    },
    description: {
      type: String,
      trim: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Example = mongoose.model('Example', exampleSchema);

export default Example;
