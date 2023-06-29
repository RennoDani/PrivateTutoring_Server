const mysql = require('mysql2');

const connect = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'tutoringdb',
    password : 'MCITMySql@2022'
});

module.exports = connect;