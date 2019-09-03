import User from '../../model/user';
import httpError from '../../utils/httpError';
/**
 * Controller for /create.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function create(ctx, next) {
  try {
    const createdUser = new User(ctx.request.body);
    await createdUser.hashPassword(createdUser.password);
    await createdUser.save();

    ctx.body = {
      id: createdUser._id,
      userName: createdUser.email,
    };
    await next();
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) throw httpError(409, 'email already in use');
    if (err.name === 'ValidationError') throw httpError(400, 'all required properties must be fulfilled');

    throw err;
  }
}
