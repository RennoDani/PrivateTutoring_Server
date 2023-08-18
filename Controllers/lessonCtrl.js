const lessonModel = require('../Model/lessonModel');
const fs = require('fs');
const path = require('path');

exports.getAllLesson = async (req, res, next) => {
    lessonModel.getAllLesson((err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            //console.log(' lessonModel.getAllLesson - result: ',result);
            res.send(result);
        }
    });
}

exports.getAllUserLesson = async (req, res, next) => {
    lessonModel.getAllUserLesson(req.params.iduser, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}

exports.getIdLesson = async (req, res, next) => {
    lessonModel.getIdLesson(req.params.id, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}


exports.addNewLesson = async (req, res, next) => {
    //console.log('add new lesson - ctrl');

    //console.log('add new lesson - ctrl - req.body: ', req.body);
    //console.log('add new lesson - ctrl - req.file: ', req.file);

    lessonModel.insertLesson({
        title: req.body.title,
        type: req.body.type,
        level: req.body.level,
        filepath: req.file.path
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: '' + err,
                success: false
            });

        } else {

            return res.json({
                message: 'Lesson successfully saved!',
                success: true
            });
        }
    });
}


exports.updateLesson = async (req, res, next) => {

    //console.log('add udpate lesson - ctrl - req.body: ', req.body);
    //console.log('add update lesson - ctrl - req.file: ', req.file);    

    let filename;

    if (req.file) {
        filename = req.file.path;
    }

    //console.log('add update lesson - ctrl - filename: ', filename);

    lessonModel.updateLesson({
        idlesson: req.body.idlesson,
        title: req.body.title,
        type: req.body.type,
        level: req.body.level,
        filepath: filename
        //filepath: req.file.path //verify before if has or not changes        
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: '' + err,
                success: false
            });

        } else {

            return res.json({
                message: 'Lesson successfully updated!',
                success: true
            });
        }
    });
}

exports.deleteLesson = async (req, res, next) => {

    // console.log('delete lesson - req.params.idlesson: ', req.params.idlesson);
    // console.log('delete lesson - req.params.namepdf: ', req.params.namepdf);


    const pdfPath = path.join(__dirname, '../', 'PDF_files', req.params.namepdf);

    fs.unlink(pdfPath, (err) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: 'Error deleting file. ' + err,
                success: false
            });
        } else {
            lessonModel.deleteLesson(req.params.idlesson, (err, result) => {
                if (err) {
                    console.log('Error: ' + err);

                    return res.json({
                        message: '' + err,
                        success: false
                    });
                } else {
                    return res.json({
                        message: 'Lesson and students for this lesson have been successfully deleted!',
                        success: true
                    });
                }
            });
        }
    });
}

// -------------- LESSON USER -----------------
//List Students in Id Lesson
exports.getStudentByIdLesson = async (req, res, next) => {
    lessonModel.getStudentByIdLesson(req.params.idlesson, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}

//List Other Students who are not in this Id Lesson 
exports.getOtherStudentsByIdLesson = async (req, res, next) => {
    lessonModel.getOtherStudentsByIdLesson(req.params.idlesson, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}

exports.addLessonStudent = async (req, res, next) => {
    //console.log('addLessonStudent - req.body: ',req.body);
    lessonModel.insertLessonStudent({
        idlesson: req.body.idlesson,
        iduser: req.body.iduser
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: '' + err,
                success: false
            });
        } else {
            return res.json({
                message: 'Student added successfully!',
                success: true
            });
        }
    });
}

exports.deleteLessonStudent = async (req, res, next) => {
    //console.log('deleteLessonStudent - req.params: ',req.params);
    lessonModel.deleteLessonStudent({
        idlesson: req.params.idlesson,
        iduser: req.params.iduser
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: '' + err,
                success: false
            });
        } else {
            return res.json({
                message: 'The student for this lesson has been successfully deleted!',
                success: true
            });
        }
    });
}

// -------------- Type ---------------------
exports.getAllLessonType = async (req, res, next) => {
    lessonModel.getAllLessonType((err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            //console.log(' lessonModel.getAllLessonType - result: ', result);
            res.send(result);
        }
    });
}


// -------------- LEVEL ---------------------
exports.getAllLessonLevel = async (req, res, next) => {
    lessonModel.getAllLessonLevel((err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}


// --------------- PDF -----------------------
exports.getPDF = async (req, res, next) => {

    const pdfPath = path.join(__dirname, '../', 'PDF_files', req.params.namepdf);

    //console.log('getPDF - req.params.namepdf: ',req.params.namepdf);
    //console.log('get PDF - __dirname: ', __dirname);
    //console.log('getPDF - pdfPath: ', pdfPath);


    fs.readFile(pdfPath, (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo PDF.');
        } else {
            res.contentType('application/pdf');
            res.send(data);
        }
    });
}