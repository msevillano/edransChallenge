import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
  },
  currentSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  }],
  approvedSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  }],
});

/**
 * hashes a given string and appends it to the password field.
 * @param {string} password - Koa parameter for middleware.
 */
UserSchema.methods.hashPassword = async function hashPassword(password) {
  this.password = await bcrypt.hash(password, 10);
};

/**
 * checks if the password corresponds with the user.
 * @param {String} password - password to compare.
 *
 * @return {Boolean} - the result of the comparision.
 */
UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('user', UserSchema);

export default userModel;
