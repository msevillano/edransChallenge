import mongoose from 'mongoose';
import User from '../../model/user';
import httpError from '../../utils/httpError';
import checkCommons from '../../utils/checkCommons';

const objectId = mongoose.Types.ObjectId;
/**
 * Controller for /subjects.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function startSubjects(ctx, next) {
  if (!ctx.request.body.subjects) throw httpError(400, 'must provide subjects');
  const user = await User.findWithCareer(ctx.request.body.user._id);
  if (!user.career) throw httpError(400, 'user must have a career before starting subjects');

  const commonElements = checkCommons(user.career.subjects, ctx.request.body.subjects).map((elem) => objectId(elem));
  user.currentSubjects.push(...commonElements);
  user.currentSubjects = user.currentSubjects.filter((item, index) => user.currentSubjects.indexOf(item) === index);
  await user.save();

  ctx.body = {
    currentSubjects: user.currentSubjects,
  };
  await next();
}
