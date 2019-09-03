import Router from 'koa-router';
import error from '../middleware/error';

import status from '../controller/status';
import user from './user';
import subject from './subject';
import career from './career';

const router = new Router();

router.use('/', error);

router.post('/status', status);
router.use('/user', user.routes());
router.use('/subject', subject.routes());
router.use('/career', career.routes());

export default router;
