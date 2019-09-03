import Router from 'koa-router';
import setCareer from '../../controller/user/setCareer';
import setSubjects from '../../controller/user/startSubjects';
import updateSubjectStatus from '../../controller/user/updateSubjectStatus';
import authenticator from '../../middleware/authentication';

const router = new Router();

router.use('/', authenticator);

router.put('/career', setCareer);
router.put('/subjects', setSubjects);
router.put('/grade', updateSubjectStatus);

export default router;
