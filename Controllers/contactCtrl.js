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



exports.delContact = async (req, res, next) => {

    console.log('delContact - id: ',req.params.id);
    
        userModel.deleteContact(req.params.id, (err, result) => {
            if (err) {
                console.log('Error: ' + err);
    
                return res.json({
                    message: err,
                    sucess: false
                });
    
            } else {
    
                return res.json({
                    message: 'Contact successfully deleted!',
                    sucess: true
                });
            }
        });
    }