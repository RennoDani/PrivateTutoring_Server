const lessonModel = require('../Model/lessonModel');


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
                message: err,
                sucess: false
            });

        } else {

            return res.json({
                message: 'Lesson successfully saved!',
                sucess: true
            });
        }
    });


}

exports.updateLesson = async (req, res, next) => {

    console.log('add udpate lesson - ctrl - req.body: ', req.body);
    //console.log('add update lesson - ctrl - req.file: ', req.file);    

    let filename;

    if (req.file) {
        filename = req.file.path;
    }

    //console.log('add update lesson - ctrl - filename: ', filename);

    console.log('add update lesson 1 - req.body.title: ', req.body.title);

    lessonModel.updateLesson({
        idlesson: req.body.idlesson,
        title: req.body.title,
        type: req.body.type,
        level: req.body.level,
        //filepath: req.file.path
        filepath: filename
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: err,
                sucess: false
            });

        } else {

            return res.json({
                message: 'Lesson successfully updated!',
                sucess: true
            });
        }
    });

    console.log('add update lesson 2 - req.body.title: ', req.body.title);
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
    const fs = require('fs');
    const path = require('path');

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