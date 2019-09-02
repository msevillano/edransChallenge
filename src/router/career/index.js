import Router from 'koa-router';
import createCareer from '../../controller/career/create';

const router = new Router();

router.post('/create', createCareer);

export default router;
