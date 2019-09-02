import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hoursPerWeek: {
    type: String,
    required: true,
  },
});

const SubjectModel = mongoose.model('subject', SubjectSchema);

export default SubjectModel;
