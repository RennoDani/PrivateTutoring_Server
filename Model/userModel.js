const db = require('../Util/database');

exports.getAllUser = (callback) => {
    const query = 'select * from user';
    db.query(query, function(err,result){
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
            //console.log('result model login ',result);
            callback(null, result);
        }
    });   
}


exports.resetPassword = (login) => {
    const query = 'INSERT INTO login (email, password) VALUES (?,?)';
    const values = [login.email, login.password];

    //console.log('user model - reset - values: ',values);
    //console.log('user model - reset - login.password: ',login.password);
    return db.query(query, values);
}

exports.LogIn = (login, callback) => {
    const query = 
        ' SELECT email, password '
        +' FROM login '
        +' WHERE email = ? ';
        //+' AND password = ? ';
        
    const values = [login.emailLogin];//, login.passwordLogin];

    //console.log('model - login/password: ',values);

    db.query(query, values, function (err, result) {

        if (err) {
            callback(err, null);
        } else {
            //console.log('result model login ',result);
            callback(null, result);
        }
    });   
}