import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [{
    type: ObjectId,
    ref: 'User',
  }],
});

const careerModel = mongoose.model('career', CareerSchema);

export default careerModel;
