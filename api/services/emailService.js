// Imports
const nodeMailer = require('nodemailer');

// Module Name
const emailService = {};

// Envio de Correos con la configuración enviada
emailService.sendCustom = (email, res) => {

    try {
        // Email Config
        const transporter = nodeMailer.createTransport({
            host: email.config.host,
            port: email.config.port,
            secure: email.config.secure,  //true for 465 port, false for other ports
            auth: {
                user: email.config.user,
                pass: email.config.password
            }
        });

        // Email Options
        const mailOptions = {
            from: '"' + email.data.senderName + '" <' + email.config.user + '>', // sender address
            to: email.data.recipients, // list of receivers, multiple mails separated by commas
            subject: email.data.subject, // Subject line
            text: email.data.senderName, // plain text body
            html: email.data.body, // html body
        };

        // Send Email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                throw "" + error;
            } else {
                console.log('Message %s sent to: %s from: %s', info.messageId, mailOptions.to, mailOptions.from);
            }
        });

    } catch (error) {
        throw "" + error;
    }
}

// Export
module.exports = emailService;