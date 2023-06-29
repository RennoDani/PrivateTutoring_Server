const contactModel = require('../Model/contactModel');


exports.getAllContacts = (req, res, next) => {

    let contacts = contactModel.getContacts((err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            //console.log(result);
            //console.log('Controller Contact - ok - get');
            //res.send('Controller - Contact - get!!');
            res.send(result);
        }
    });
}


exports.addNewContact = (req, res, next) => {
    //console.log('add - ctrl');

    //console.log(req.body);

     contactModel.addContacts({
         name: req.body.nameContact,
         email: req.body.emailContact,
         phone: req.body.phoneContact,
         message: req.body.messageContact
     });

    res.send();
}