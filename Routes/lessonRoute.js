const express = require('express');
const lessonCtlr = require('../Controllers/lessonCtrl');
const authCtrl = require('../Controllers/authCtrl');
const router = express.Router();


//Lesson
router.get('/Lesson', authCtrl.verifyToken, lessonCtlr.getAllLesson);
router.get('/Lesson/:id', authCtrl.verifyToken, lessonCtlr.getIdLesson);

//view lessons with profile student
router.get('/Lesson/student/:iduser', authCtrl.verifyToken, lessonCtlr.getAllUserLesson);


router.post('/Lesson', authCtrl.verifyToken, lessonCtlr.addNewLesson);
router.put('/Lesson', authCtrl.verifyToken, lessonCtlr.updateLesson);


//Lesson - View PDF
router.get('/LessonPDF/:namepdf',authCtrl.verifyToken, lessonCtlr.getPDF);


//Lesson - add Student
router.get('/LessonStudents/All/:idlesson', authCtrl.verifyToken, lessonCtlr.getStudentByIdLesson);
router.get('/LessonStudents/Other/:idlesson', authCtrl.verifyToken, lessonCtlr.getOtherStudentsByIdLesson);
router.post('/LessonStudents',authCtrl.verifyToken, lessonCtlr.addLessonStudent);
router.delete('/LessonStudents/:idlesson/:iduser',authCtrl.verifyToken, lessonCtlr.deleteLessonStudent);



//Lesson - Type
router.get('/LessonType',lessonCtlr.getAllLessonType);

//Lesson - Level
router.get('/LessonLevel',lessonCtlr.getAllLessonLevel);


module.exports = router;