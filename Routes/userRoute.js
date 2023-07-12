const express = require('express');
//const path = require('path');
const userCtlr = require('../Controllers/userCtrl');
const router = express.Router();


console.log('router user ');

router.get('/User',userCtlr.getAllUser);
router.get('/User/:id', userCtlr.getIdUser);

router.post('/User', userCtlr.addNewUser);

router.put('/User/edit', userCtlr.editUser);

//router.delete('/User/delete/:id', userCtlr.delUser);

module.exports = router;