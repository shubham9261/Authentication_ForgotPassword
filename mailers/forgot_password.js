const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.forgot = (comment) => {
    let htmlString=nodemailer.renderTemplate({comment:comment},'/forgot_password.ejs');
   // console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
       from: 'rmsb3993@gmail.com',
       to: comment.user.email,
       subject: "Password",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}