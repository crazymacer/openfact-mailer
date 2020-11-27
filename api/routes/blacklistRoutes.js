'use strict';
module.exports = function (app) {

    var blacklistController = require('../controllers/blacklistController');

    app.route('/blacklist/add-email')
        .post(blacklistController.addBlacklist);

    app.route('/blacklist/remove-email')
        .post(blacklistController.removeBlacklist);
};
