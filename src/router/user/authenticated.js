import Router from 'koa-router';
import setCareer from '../../controller/user/setCareer';
import authenticator from '../../middleware/authentication';

const router = new Router();

router.use('/', authenticator);

router.put('/career', setCareer);

export default router;
