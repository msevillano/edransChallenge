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
    ref: 'career',
  },
  currentSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
  }],
  approvedSubjects: [{
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
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

/**
 * find an user and append its career
 * since this is a simple wrapper it wont be tested.
 * @param {String} _id - id of user to find.
 *
 * @return {Object} - User.
 */
UserSchema.statics.findWithCareer = async function findWithCareer(_id) {
  return this.findById(_id).populate('career');
};

const userModel = mongoose.model('user', UserSchema);

export default userModel;
