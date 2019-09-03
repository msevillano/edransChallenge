import User from '../../model/user';
import Career from '../../model/career';
import httpError from '../../utils/httpError';

/**
 * Controller for /career.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function setCareer(ctx, next) {
  const desiredCareer = await Career.findById(ctx.request.body.careerId);
  if (!desiredCareer) throw httpError(404, 'career not found');
  const user = await User.findOneAndUpdate({_id: ctx.request.body.user._id}, {career: ctx.request.body.careerId});
  ctx.body = {
    oldCareer: user.career,
    career: ctx.request.body.careerId,
  };
  await next();
}
