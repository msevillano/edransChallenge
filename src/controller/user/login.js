import User from '../../model/user';
import httpError from '../../utils/httpError';
import {createSignedToken} from '../../utils/jwt';

/**
 * Controller for /login.
 * @param {Object} ctx - Koa parameter for middleware.
 * @param {Function} next - Callback function to be executed after controller ends.
 */
export default async function login(ctx, next) {
  if (!ctx.request.body.password) throw httpError(400, 'password is needed to perform login');

  const user = await User.findOne({email: ctx.request.body.userName});
  if (!user) throw httpError(404, 'user not found');

  const isValid = await user.isValidPassword(ctx.request.body.password);
  if (!isValid) throw httpError(403, 'invalid credentials');

  // eslint-disable-next-line no-unused-vars
  const {password, ...sanitizedUser} = {...user._doc};
  const authToken = createSignedToken(sanitizedUser);

  ctx.body = {token: authToken, ...sanitizedUser};
  await next();
}
