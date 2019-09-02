import Subject from '../../model/subject';

/**
 * Controller for /create.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function create(ctx, next) {
  const createdSubject = new Subject(ctx.request.body);
  await createdSubject.save();
  ctx.body = {
    id: createdSubject._id,
  };
  next();
}
