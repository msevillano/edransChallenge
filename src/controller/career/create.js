import Career from '../../model/career';

/**
 * Controller for /create.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function create(ctx, next) {
  const createdCareer = new Career(ctx.request.body);
  await createdCareer.save();
  ctx.body = {
    id: createdCareer._id,
  };
  next();
}
