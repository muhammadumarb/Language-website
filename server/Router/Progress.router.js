const router=require('express').Router();const {Auth}=require('../middleware/Auth');const {saveResult,mine,certificates}=require('../Controller/Progress');
router.use(Auth);router.get('/mine',mine);router.post('/lesson/:lessonId',saveResult);router.get('/certificates',certificates);module.exports=router;
