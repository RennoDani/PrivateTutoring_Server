const express = require('express');
const lessonCtlr = require('../Controllers/lessonCtrl');
const router = express.Router();

//router.get('/Lesson',lessonCtlr.getAllLesson);

router.post('/Lesson',lessonCtlr.addNewLesson);

module.exports = router;