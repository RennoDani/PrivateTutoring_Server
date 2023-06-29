const userModel = require('../Model/userModel');
const bcryptjs = require('bcryptjs');


//generate and encrypt password 
function generatePassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pass = '';

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        pass += caracteres.charAt(indice);
    }

    console.log('generatePassword: ', pass);    

    const hashpassword = bcryptjs.hashSync(pass, 10);

    return hashpassword;
}


exports.resetPassword = (req, res, next) => {
    const newpassword = generatePassword();

    //console.log('resetPassword: ', newpassword);    

    userModel.resetPassword({
        email: req.body.emailLoginReset,
        password: newpassword
    }, (err, result) => {
        if(err){
            console.log('Error - Reset Password: ' + err);

            return res.json({
                message: err,
                sucess: false
            });
        }else{
            return res.json({
                message: 'Successfully reset password!',
                sucess: true
            });
        }
    });

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

            //console.log('newpassword: ', newpassword);    

            userModel.createLogin({
                email: req.body.emailUser,
                password: newpassword
            });

            return res.json({
                message: 'User successfully saved!',
                sucess: true
            });
        }
    });


}


exports.validateLogIn = async (req, res, next) => {

    //console.log('postLogin - crtl - body: ',req.body);

    userModel.validateLogIn(req.body, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
            return res.json({
                message: err,
                sucess: false,
                login: false
            });
        } else {
            //if the email validation is empty
            if (result.length <= 0) {
                return res.json({
                    message: 'Invalid email or password - not exist',
                    sucess: false,
                    login: false
                })
            } else {

                // console.log('postLogin - crtl - body: ',req.body.passwordLogin);
                // console.log('postLogin - crtl - result.password: ',result[0].password);

                bcryptjs.compare(req.body.passwordLogin, result[0].password, function (err, isMatch) {
                    if (err) {
                        console.error(err);

                        return res.json({
                            message: 'LogIn - Error ', err,
                            sucess: false,
                            login: false
                        });
                    }

                    if (isMatch) {
                        return res.json({
                            message: 'Success',
                            sucess: true,
                            login: true,
                            user: result
                        });
                    } else {
                        return res.json({
                            message: 'LogIn - Invalid email or password - not exist',
                            sucess: false,
                            login: false
                        });
                    }
                })
            }
        }


    });
}

