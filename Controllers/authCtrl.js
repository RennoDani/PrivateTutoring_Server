const jwt = require('jsonwebtoken');
const secretKey = 'my-first-project-angular-nodejs';
const authModel = require('../Model/authModel');
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

function generateToken(email) {
    const jwt = require('jsonwebtoken');
    const sK = require('./authCtrl');

    const secretKey = sK.secretKey_auth;
    const user = email;
    const token = jwt.sign(user, secretKey); // {expiresIn: 300} 300s = 5 min

    return token;
}

exports.secretKey_auth = secretKey;

exports.verifyToken = (req, res, next) => {
    ///// Middleware - Verify token
    console.log('Middleware - Verify token ');

    //const token = req.headers.authorization?.split(' ')[1];
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                //console.log('verify token 2.1 - err - req.user: ', req.user);
                return res.sendStatus(403); // Token is invalid or expired
            }
            req.user = decodedToken; // Attach the decoded token to the request object
            //console.log('verify token 2.2 - req.user: ', req.user);
            next();
        });
    } else {
        //console.log('verify token 3 - req.user: ', req.user);
        res.sendStatus(401); // Token not provided
    }
}


exports.createLogin = (email) => {
    const newpassword = generatePassword();

    console.log('createLogin - newpassword: ', newpassword);

    authModel.createLogin({
        email: email,
        password: newpassword
    });
}

exports.resetPassword = (req, res, next) => {

    //console.log('reset password - req.body: ', req.body);

    //verify email login
    authModel.validateLogIn({ emailLogin: req.body.email }, (err, result) => {

        console.log('reset password - result: ', result);

        if (err) {
            console.log('Error: ' + err);
            return res.json({
                message: err,
                success: false,
                login: false
            });
        } else {
            //if the email validation
            if (result.length > 0) {

                const newpassword = generatePassword();

                //console.log('reset password - newpassword: ', newpassword);

                authModel.resetPassword({
                    email: req.body.email,
                    password: newpassword
                }, (err, result) => {
                    if (err) {
                        console.log('Error - Reset Password: ' + err);

                        return res.json({
                            message: err,
                            success: false
                        });
                    } else {
                        return res.json({
                            message: 'Successfully reset password! Verify your email box.',
                            success: true
                        });
                    }
                });
            } else {
                return res.json({
                    message: 'Verify your email box!',
                    success: false
                });
            }
        }
    });




}


exports.validateLogIn = async (req, res, next) => {

    //console.log('postLogin validateLogIn ---- crtl - body: ',req.body);       

    authModel.validateLogIn(req.body, (err, result) => {
        if (err) {
            console.log('Error: ' + err);
            return res.json({
                message: err,
                success: false,
                login: false
            });
        } else {
            //if the email validation is empty
            if (result.length <= 0) {
                return res.json({
                    message: 'Invalid email or password - not exist',
                    success: false,
                    login: false
                })
            } else {

                //console.log('postLogin - crtl - body: ',req.body.passwordLogin);
                //console.log('postLogin - crtl - result.password: ',result[0].password);

                //if the password validation
                bcryptjs.compare(req.body.passwordLogin, result[0].password, async function (err, isMatch) {
                    if (err) {
                        console.error(err);

                        return res.json({
                            message: 'LogIn - Error ', err,
                            success: false,
                            login: false
                        });
                    }

                    if (isMatch) {
                        //token user
                        userToken = generateToken(req.body.emailLogin);

                        //console.log('userToken: ' + userToken);

                        let userResult;
                        try {
                            userResult = await userModel.getEmailUser(req.body.emailLogin);
                            //console.log('authCtrl - userResult: ', userResult);
                        } catch (err) {
                            console.error(err);
                            return res.json({
                                message: err,
                                success: false,
                                login: false,
                                auth: false
                            });
                        }


                        return res.json({
                            message: 'Success',
                            success: true,
                            isloggedIn: true,
                            token: userToken,
                            iduser: userResult[0].iduser,
                            nameuser: userResult[0].name,
                            profileuser: userResult[0].profile
                        });
                    } else {
                        return res.json({
                            message: 'LogIn - Invalid email or password - not exist',
                            success: false,
                            login: false,
                            auth: false
                        });
                    }
                })
            }
        }
    });
}

exports.logOut = async (req, res, next) => {
    res.end();
}
