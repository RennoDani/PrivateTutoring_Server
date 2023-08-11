const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'test.code.web.2023@gmail.com',
        pass: 'zwnhobhwlpueoiwm'
    }
});


exports.sendEmailContact = (email) => {
    transport.sendMail({
        from: 'Private Tutoring <test.code.web.2023@gmail.com>',
        to: email,
        subject: 'Private Tutoring',
        html: '<p> As soon as possible I will contact you.</p> <p>Thank you!</p>',        
        text: 'As soon as possible I will contact you. Thank you!',
    })
    .then((response) => console.log('New contact email sent successfully!'))
    .catch((err) => console.log('Err new contact email',err));    
}



exports.sendEmailUser = (email) => {
    transport.sendMail({
        from: 'Private Tutoring <test.code.web.2023@gmail.com> ',
        to: email.email_user,
        subject: 'Private Tutoring - New user',
        html: '<p> Welcome! Now you can access our system with your email and this password: </p>'+email.pass_user,        
        text: 'Welcome! Now you can access our system with your email and this password: '+email.pass_user,
    })
    .then((response) => console.log('New user email/password sent successfully!'))
    .catch((err) => console.log('Err new user email/password',err)); 
}


exports.sendEmailResetPassword = (email) => {
    transport.sendMail({
        from: 'Private Tutoring <test.code.web.2023@gmail.com> ',
        to: email.email_user,
        subject: 'Private Tutoring - Reset Password',
        html: '<p> Now you can access our system with your email and this is your new password: </p>'+email.pass_user,        
        text: 'Now you can access our system with your email and this is your new password: '+email.pass_user,
    })
    .then((response) => console.log('Reset password email sent successfully!'))
    .catch((err) => console.log('Err email reset password',err)); 
}