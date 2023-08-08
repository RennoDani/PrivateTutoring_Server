const db = require('../Util/database');

exports.getAllUser = (callback) => {
    const query = 'SELECT iduser, name, email, phone, DATE_FORMAT(datebirth, "%d-%m-%Y") as datebirth, profile, active FROM user';

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
    const query = 'SELECT iduser, name, email, phone, DATE_FORMAT(datebirth, "%d-%m-%Y") as datebirth, profile, active FROM user WHERE user.iduser = ?';
    const values = [id];

    db.query(query, values, function (err, result) {

        //console.log('user model - result: ',result);

        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

exports.getEmailUser = async (email) => {
    const query = 'SELECT iduser, name, profile FROM user WHERE email = ?';
    const values = [email];
    const util = require('util');

    const queryAsync = util.promisify(db.query).bind(db);

    try {
        const result = await queryAsync(query, values);
        //console.log('user model - getEmailUser - result: ', result);
        return result;
    } catch (err) {
        throw err;
    }

    // db.query(query, values, function (err, result){
    //     if (err) {
    //         return err;
    //     } else {
    //         return result;
    //     }
    // });
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
        ' SET name = COALESCE(?,name), phone = COALESCE(?,phone), datebirth = COALESCE(?,datebirth), active = COALESCE(?,active) ' +
        ' WHERE user.iduser = ?';
    const values = [user.name, user.phone, user.datebirth, user.active, user.iduser];

    //console.log('updateuser - query: ' + query);

    //console.log('updateuser - values: ' + values);

    db.query(query, values, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

