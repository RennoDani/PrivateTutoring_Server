const userModel = require('../Model/userModel');
const authCtrl = require('./authCtrl');

exports.getAllUser = (req, res, next) => {
    
    //console.log('getAllUser - req ');

    userModel.getAllUser((err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}

exports.getIdUser = (req, res, next) => {
    
    //console.log('getIdUser - req.params.id ',req.params.id);

    userModel.getIdUser(req.params.id, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
        } else {
            res.send(result);
        }
    });
}

exports.addNewUser = async (req, res, next) => {
console.log('addnewuser');

    userModel.insertUser({
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


exports.editUser = async (req, res, next) => {

    console.log('edit user - req params id: ',req.params);
    console.log('edit user - req body: ',req.body);

    userModel.updateUser({
        iduser: req.body.idUser,
        name: req.body.nameUser,
        //email: req.body.emailUser,
        phone: req.body.phoneUser,
        datebirth: req.body.dateBirthUser
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: err,
                sucess: false
            });

        } else {

            return res.json({
                message: 'User successfully updated!',
                sucess: true
            });
        }
    });
}


exports.delUser = async (req, res, next) => {

console.log('delUser - id: ',req.params.id);

    userModel.deleteUser(req.params.id, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: err,
                sucess: false
            });

        } else {

            return res.json({
                message: 'User successfully deleted!',
                sucess: true
            });
        }
    });
}