const db = require('../Util/database');

exports.resetPassword = (login) => {
    const query = 'UPDATE login SET password = ? WHERE email = ?';
    const values = [login.password, login.email];

    //console.log('user model - reset - values: ',values);
    //console.log('user model - reset - login.password: ',login.password);
    return db.query(query, values);

}

exports.createLogin = (login) => {
    const query = 'INSERT INTO login (email, password) VALUES (?,?)';
    const values = [login.email, login.password];

    //console.log('user model - createLogin - values: ',values);
    //console.log('user model - createLogin - login.password: ',login.password);
    return db.query(query, values);

}

exports.validateLogIn = (login, callback) => {
    //console.log('model - validateLogIn - login ',login);

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