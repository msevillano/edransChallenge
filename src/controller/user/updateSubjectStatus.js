import mongoose from 'mongoose';
import User from '../../model/user';
import httpError from '../../utils/httpError';
import checkCommons from '../../utils/checkCommons';

const objectId = mongoose.Types.ObjectId;
/**
 * Controller for /grade.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function startSubjects(ctx, next) {
  const subjectsToApprove = Object.keys(ctx.request.body.subjects);
  if (subjectsToApprove.length === 0) throw httpError(400, 'must provide subjects');

  const user = await User.findById(ctx.request.body.user._id);

  const commonElements = checkCommons(user.currentSubjects, subjectsToApprove).map((elem) => elem);

  const finishedSubjectsWithGrades = commonElements.map((elem) => {
    return {
      subject: objectId(elem),
      grade: ctx.request.body.subjects[elem.toString()],
    };
  });
  user.approvedSubjects.push(...finishedSubjectsWithGrades);

  const subjectsToKeepOnCurrent = user.currentSubjects.filter((item) => !commonElements.includes(item.toString()));
  user.currentSubjects = subjectsToKeepOnCurrent.map((item) => objectId(item));

  await user.save();

  ctx.body = {
    currentSubjects: user.currentSubjects,
    approvedSubjects: user.approvedSubjects,
  };
  await next();
}
