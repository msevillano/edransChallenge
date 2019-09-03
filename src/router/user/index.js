import Router from 'koa-router';
import authenticated from './authenticated';
import createUser from '../../controller/user/create';
import loginUser from '../../controller/user/login';

const router = new Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.use('/auth', authenticated.routes());

export default router;
