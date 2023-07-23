const express = require('express');
const lessonCtlr = require('../Controllers/lessonCtrl');
const router = express.Router();


//Lesson
router.get('/Lesson',lessonCtlr.getAllLesson);
router.get('/Lesson/:id',lessonCtlr.getIdLesson);

router.post('/Lesson',lessonCtlr.addNewLesson);

router.put('/Lesson',lessonCtlr.updateLesson);

//Lesson - Type
router.get('/LessonType',lessonCtlr.getAllLessonType);

//Lesson - Level
router.get('/LessonLevel',lessonCtlr.getAllLessonLevel);


module.exports = router;