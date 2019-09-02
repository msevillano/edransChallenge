import Router from 'koa-router';
import createSubject from '../../controller/subject/create';

const router = new Router();

router.post('/create', createSubject);

export default router;
