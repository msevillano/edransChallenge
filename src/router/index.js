import Router from 'koa-router';
import error from '../middleware/error';
import status from '../controller/status';

const router = new Router();

router.use('/', error);

router.post('/status', status);

export default router;
