const userModel = require('../Model/userModel');
const authCtrl = require('./authCtrl');

exports.getAllUser = (req, res, next) => {
    let user = userModel.getAllUser((err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}

exports.addNewUser = async (req, res, next) => {
    userModel.addUser({
        name: req.body.nameUser,
        email: req.body.emailUser,
        phone: req.body.phoneUser,
        datebirth: req.body.dateBirthUser,
        profile: req.body.profileUser
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: err,
                sucess: false
            });

        } else {

            authCtrl.createLogin(req.body.emailUser);

            return res.json({
                message: 'User successfully saved!',
                sucess: true
            });
        }
    });


}
