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
    console.log('add update lesson - ctrl - req.file: ', req.file);

    lessonModel.updateLesson({
        idlesson: req.body.idlesson,
        title: req.body.title,
        type: req.body.type,
        level: req.body.level,
        filepath: null//req.file.path
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
