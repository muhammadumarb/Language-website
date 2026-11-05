const router=require('express').Router();
const {createAccount,loginAccount,LogOut,RefreshToken}=require('../Controller/User');
router.post('/register',createAccount);
router.post('/login',loginAccount);
router.post('/refresh',RefreshToken);
router.post('/logout',LogOut);
module.exports=router;
