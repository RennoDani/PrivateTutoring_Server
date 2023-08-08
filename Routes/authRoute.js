const express = require('express');
//const path = require('path');
const authCtrl = require('../Controllers/authCtrl');
const router = express.Router();


router.post('/postLogIn', authCtrl.validateLogIn);
router.post('/postResetPassword',authCtrl.resetPassword);
router.post('/logout', authCtrl.logOut);


module.exports = router;