const db = require('../Util/database');


exports.getContacts = (callback) => {
    db.query('select * from contact', function (err, result) {

        if (err) {
            callback(err, null);
        } else {
            //console.log(result);
            callback(null, result);
        }
    });
}

exports.addContacts = (contact) => {
    //console.log('add - model');
    //const { name, email, phone, message } = req.body;

    const query = 'INSERT INTO contact (name,email,phone,message) VALUES (?,?,?,?)';
    const values = [contact.name, contact.email, contact.phone, contact.message];
    //["bob2", "bob2@email.com", 2123123, "a2aaaaaaaaa"]);


    //console.log('contact - model: '+contact.name);
    //console.log('values - model: '+values);

    return db.query(query, values);

}