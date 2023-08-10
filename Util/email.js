const { response } = require('express');
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

