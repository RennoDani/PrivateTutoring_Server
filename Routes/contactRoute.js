const express = require('express');
const path = require('path');
const contactCtlr = require('../Controllers/contactCtrl');
const authCtrl = require('../Controllers/authCtrl');
const router = express.Router();

router.get('/Contact',authCtrl.verifyToken, contactCtlr.getAllContacts);
router.post('/Contact',contactCtlr.addNewContact);
//router.delete('/Contact/delete/:id', contactCtlr.delContact);

module.exports = router;