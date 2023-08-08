const express = require('express');
const lessonCtlr = require('../Controllers/lessonCtrl');
const authCtrl = require('../Controllers/authCtrl');
const router = express.Router();


//Lesson
router.get('/Lesson', authCtrl.verifyToken, lessonCtlr.getAllLesson);
router.get('/Lesson/:id', authCtrl.verifyToken, lessonCtlr.getIdLesson);

router.post('/Lesson', authCtrl.verifyToken, lessonCtlr.addNewLesson);

router.put('/Lesson', authCtrl.verifyToken, lessonCtlr.updateLesson);


//Lesson - View PDF
router.get('/LessonPDF/:namepdf',authCtrl.verifyToken, lessonCtlr.getPDF);



//Lesson - Type
router.get('/LessonType',lessonCtlr.getAllLessonType);

//Lesson - Level
router.get('/LessonLevel',lessonCtlr.getAllLessonLevel);


module.exports = router;