const db = require('../Util/database');


exports.getAllLesson = (callback) => {
    const query = 'SELECT le.idlesson, le.title, le.type, lt.description as dstype, le.level, ll. description as dslevel, le.filepath ' +
        ' FROM lesson le ' +
        ' JOIN lesson_type lt ON le.type = lt.type ' +
        ' JOIN lesson_level ll ON le.level = ll.level ' +
        ' ORDER BY le.title ';

    db.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getIdLesson = (id, callback) => {
    const query = 'SELECT le.idlesson, le.title, le.type, lt.description as dstype, le.level, ll. description as dslevel, le.filepath ' +
        ' FROM lesson le ' +
        ' JOIN lesson_type lt ON le.type = lt.type ' +
        ' JOIN lesson_level ll ON le.level = ll.level  ' +
        ' WHERE le.idlesson = ? ';
    const values = [id];

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.insertLesson = (lesson, callback) => {
    const query = 'INSERT INTO lesson (title, type, level, filepath) VALUES (?,?,?,?)';
    const values = [lesson.title, lesson.type, lesson.level, lesson.filepath];

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


exports.updateLesson = (lesson, callback) => {
    let query;
    let values;

    if(lesson.filepath){
        query = 'UPDATE lesson ' +
        ' SET title = COALESCE(?,title) , type = COALESCE(?,type), level = COALESCE(?,level), filepath = COALESCE(?,filepath) ' +
        ' WHERE idlesson = ?';

        values = [lesson.title, lesson.type, lesson.level, lesson.filepath, lesson.idlesson];

    }else{
        query = 'UPDATE lesson ' +
        ' SET title = COALESCE(?,title) , type = COALESCE(?,type), level = COALESCE(?,level) ' +
        ' WHERE idlesson = ?';

        values = [lesson.title, lesson.type, lesson.level, lesson.idlesson];

    }

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });

}


// -------------- TYPE ---------------------
exports.getAllLessonType = (callback) => {
    const query = 'SELECT type, description FROM lesson_type';
    //console.log('query - lesson type: ', query);
    db.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


// -------------- LEVEL ---------------------
exports.getAllLessonLevel = (callback) => {
    const query = 'SELECT level, description FROM lesson_level ORDER BY ordem';
    //console.log('query - lesson level: ', query);
    db.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

