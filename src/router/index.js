import Router from 'koa-router';
import error from '../middleware/error';

import status from '../controller/status';
import user from './user';
import subject from './subject';

const router = new Router();

router.use('/', error);

router.post('/status', status);
router.use('/user', user.routes());
router.use('/subject', subject.routes());

export default router;
