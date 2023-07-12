const db = require('../Util/database');

exports.getAllUser = (callback) => {
    const query = 'SELECT iduser, name, email, phone, DATE_FORMAT(datebirth, "%d-%m-%Y") as datebirth, profile FROM user';

    db.query(query, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            //console.log(result);
            callback(null, result);
        }
    });
}

exports.getIdUser = (id, callback) => {
    const query = 'SELECT iduser, name, email, phone, DATE_FORMAT(datebirth, "%d-%m-%Y") as datebirth, profile FROM user WHERE user.iduser = ?';
    const values = [id];

    db.query(query, values, function (err, result) {

console.log('user model - result: ',result);

        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });

}

exports.insertUser = (user, callback) => {
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

exports.updateUser = (user, callback) => {
    const query = 'UPDATE user ' +
        ' SET name = COALESCE(?,name), phone = COALESCE(?,phone), datebirth = COALESCE(?,datebirth) ' +
        ' WHERE user.iduser = ?';
    const values = [user.name, user.phone, user.datebirth, user.iduser];

    console.log('updateuser - query: '+query);

    console.log('updateuser - values: '+values);

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}


exports.deleteUser = (id, callback) => {
    const query = 'DELETE FROM user WHERE user.iduser = ?';
    const values = [id];


    // console.log('deleteUser - user.iduser: ',id);
    // console.log('deleteUser - values: ',values);

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });

}