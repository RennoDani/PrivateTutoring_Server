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


exports.addNewContact = async (req, res, next) => {
    //console.log('add - ctrl');

    //console.log(req.body);

     contactModel.addContacts({
         name: req.body.nameContact,
         email: req.body.emailContact,
         phone: req.body.phoneContact,
         message: req.body.messageContact
     }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: 'Problems sending this message.',
                success: false
            });

        } else {
            //console.log('Contact successfully saved!');

            return res.json({                
                message: 'Your message has been sent successfully!',
                success: true
            });
        }
    });
}



exports.delContact = async (req, res, next) => {

    console.log('delContact - id: ',req.params.id);
    
        userModel.deleteContact(req.params.id, (err, result) => {
            if (err) {
                console.log('Error: ' + err);
    
                return res.json({
                    message: err,
                    success: false
                });
    
            } else {
    
                return res.json({
                    message: 'Contact successfully deleted!',
                    success: true
                });
            }
        });
    }