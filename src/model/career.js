import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  }],
});

const careerModel = mongoose.model('career', CareerSchema);

export default careerModel;
