const db = require('../Util/database');

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