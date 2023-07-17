const express = require('express');
const path = require('path');
const contactCtlr = require('../Controllers/contactCtrl');
const router = express.Router();

router.get('/Contact',contactCtlr.getAllContacts);
router.post('/Contact',contactCtlr.addNewContact);
//router.delete('/Contact/delete/:id', contactCtlr.delContact);

module.exports = router;