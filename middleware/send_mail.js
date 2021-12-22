const nodeMailer = require('nodemailer');
const adminMail = 'facebookfinderhelp@gmail.com';
const adminPassword = 'phu14062000';
const mailPort = 587;
const mailHost = 'smtp.gmail.com';
const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
       /*  service: 'gmail', */
        host: mailHost,
        port: mailPort,
        secure: false,
        requireTLS: true,
        auth: {
            user: adminMail,
            pass: adminPassword
        }
    })
    const options = {
        from: adminMail,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transporter.sendMail(options)
}
module.exports = {
    sendMail: sendMail
}