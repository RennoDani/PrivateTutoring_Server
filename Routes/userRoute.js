const express = require('express');
const path = require('path');
const userCtlr = require('../Controllers/userCtrl');
const router = express.Router();

router.get('/User',userCtlr.getAllUser);
router.post('/User', userCtlr.addNewUser);

router.post('/postLogIn',userCtlr.postLogIn);

module.exports = router;