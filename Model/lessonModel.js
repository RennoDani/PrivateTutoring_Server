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

exports.getAllUserLesson = (iduser, callback) => {
    const query = 'SELECT le.idlesson, le.title, le.type, lt.description as dstype, le.level, ll. description as dslevel, le.filepath ' +
        ' FROM lesson le ' +
        ' JOIN lesson_type lt ON le.type = lt.type ' +
        ' JOIN lesson_level ll ON le.level = ll.level  ' +
        ' JOIN lesson_user lu ON le.idlesson = lu.idlesson ' +
        ' WHERE lu.iduser = ? ' +
        ' ORDER BY le.title ';
    const values = [iduser];

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getIdLesson = (idlesson, callback) => {
    const query = 'SELECT le.idlesson, le.title, le.type, lt.description as dstype, le.level, ll. description as dslevel, le.filepath ' +
        ' FROM lesson le ' +
        ' JOIN lesson_type lt ON le.type = lt.type ' +
        ' JOIN lesson_level ll ON le.level = ll.level  ' +
        ' WHERE le.idlesson = ? ';
    const values = [idlesson];

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

    if (lesson.filepath) {
        query = 'UPDATE lesson ' +
            ' SET title = COALESCE(?,title) , type = COALESCE(?,type), level = COALESCE(?,level), filepath = COALESCE(?,filepath) ' +
            ' WHERE idlesson = ?';

        values = [lesson.title, lesson.type, lesson.level, lesson.filepath, lesson.idlesson];
    } else {
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

exports.deleteLesson = (idlesson, callback) => {
    db.beginTransaction((err) => {
        const query1 = 'DELETE FROM lesson_user WHERE idlesson = ? ';
        const query2 = 'DELETE FROM lesson WHERE idlesson = ? ';

        const values = [idlesson];
        //console.log('values: ', values);

        db.query(query1, values, function (err) {
            //console.log('query1: ', query1);
            if (err) {
                db.rollback(() => {
                    console.error('Error delete student lesson: ', err);
                    db.end();
                    callback(err, null);
                });
            } else {
                db.query(query2, values, function (err, result2) {
                    //console.log('query2: ', query2);
                    //console.log('result2: ', result2);

                    if (err || result2.affectedRows === 0) {
                        db.rollback(() => {
                            console.error('Error delete lesson: ', err);
                            db.end();
                            callback(err, null);
                        });
                    } else {
                        db.commit((err) => {
                            //console.log('commit - result2 ', result2);
                            if (err) {
                                db.rollback(() => {
                                    console.error('Error - commit lesson: ', err);
                                    db.end();
                                });
                                callback(err, null);
                            } else {
                                callback(null, result2);
                            }
                        });
                    }
                });
            }
        });
    });
}


// -------------- LESSON USER -----------------
exports.getStudentByIdLesson = (idlesson, callback) => {
    const query = 'SELECT lu.idlesson, lu.iduser, u.name, u.email ' +
        ' FROM lesson_user lu ' +
        ' JOIN user u ON lu.iduser = u.iduser ' +
        ' WHERE lu.idlesson = ? ';
    const values = [idlesson];

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


exports.getOtherStudentsByIdLesson = (idlesson, callback) => {
    const query = 'SELECT u.iduser, u.name, u.email ' +
        ' FROM user u ' +
        ' WHERE u.iduser NOT IN (SELECT lu.iduser FROM lesson_user lu WHERE lu.idlesson = ?)  ' +
        ' AND u.profile = "student" ' +
        ' AND u.active = "Y" ';
    const values = [idlesson];

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


exports.insertLessonStudent = (lessonUser, callback) => {
    //console.log('model - insertLessonStudent - lessonUser: ',lessonUser);

    const query = 'INSERT INTO lesson_user (idlesson, iduser) VALUES (?,?)';
    const values = [lessonUser.idlesson, lessonUser.iduser];

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.deleteLessonStudent = (lessonUser, callback) => {
    const query = 'DELETE FROM lesson_user WHERE idlesson = ? AND iduser = ? ';
    const values = [lessonUser.idlesson, lessonUser.iduser];

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

