const userModel = require('../Model/userModel');
//const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

function generatePassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        pass += caracteres.charAt(indice);
    }

    return pass;
}

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
            const newpassword = generatePassword();

            console.log('newpassword: ',newpassword);

            const hashpassword = bcryptjs.hashSync(newpassword, 10);

            userModel.resetPassword({
                email: req.body.emailUser,
                password: hashpassword
            });

            return res.json({
                message: 'User successfully saved!',
                sucess: true
            });
        }
    });


}

exports.postLogIn = async (req, res, next) => {

    //console.log('postLogin - crtl - body: ',req.body);

    //userModel.LogIn(req.body, (err, result) => {
    userModel.LogIn(req.body, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
            return res.json({
                message: err,
                login: false
            });
        } else {
            //if the email validation is empty
            if (result.length <= 0) {
                return res.json({ message: 'Invalid email or password - not exist', login: false })
            } else {

                const passwordDecript = bcryptjs.compare(req.body.passwordLogin, result.password);

                if (passwordDecript) {
                    return res.json({
                        message: 'Success',
                        login: true,
                        user: result
                    });
                }                
            }
        }


    });
}