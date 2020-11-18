'use strict';
module.exports = function (app) {

  var MailController = require('../controllers/mailController');

  app.route('/send-email')
    .post(MailController.sendMail);

  app.route('/send-email-custom')
    .post(MailController.sendMailCustom);

};
