import Router from 'koa-router';
import createUser from '../../controller/user/create';

const router = new Router();

router.post('/create', createUser);

export default router;
