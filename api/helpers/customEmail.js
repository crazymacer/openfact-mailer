const customEmail = {};

customEmail.getData = (req) => {
    let data = {};

    // Get values
    data = {
        config: {
            host: req.body.config.host,
            port: req.body.config.port,
            secure: req.body.config.secure,
            user: req.body.config.user,
            password: req.body.config.password,
        },
        data: {
            senderName: req.body.data.senderName,
            recipients: req.body.data.recipients,
            body: req.body.data.body,
            subject: req.body.data.subject
        }
    };

    return data;
}
// Export
module.exports = customEmail;