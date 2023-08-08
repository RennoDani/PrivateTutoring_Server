const express = require('express');
//const path = require('path');
const userCtlr = require('../Controllers/userCtrl');
const authCtrl = require('../Controllers/authCtrl');
const router = express.Router();


router.get('/User', authCtrl.verifyToken, userCtlr.getAllUser);
router.get('/User/:id', authCtrl.verifyToken, userCtlr.getIdUser);

router.post('/User', authCtrl.verifyToken, userCtlr.addNewUser);

router.put('/User/edit',authCtrl.verifyToken,  userCtlr.editUser);



module.exports = router;