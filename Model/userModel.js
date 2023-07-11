const db = require('../Util/database');

exports.getAllUser = (callback) => {
    const query = 'select * from user';
    db.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            //console.log(result);
            callback(null, result);
        }
    });
}

exports.addUser = (user, callback) => {
    const query = 'INSERT INTO user (name, email, phone, datebirth, profile) VALUES (?,?,?,?,?)';
    const values = [user.name, user.email, user.phone, user.datebirth, user.profile];

    //return db.query(query, values);

    db.query(query, values, function (err, result) {

        if (err) {
            callback(err, null);
        } else {
            //console.log('result model add user ',result);
            callback(null, result);
        }
    });
}