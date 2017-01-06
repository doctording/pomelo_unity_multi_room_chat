var chatRemote = require('../remote/chatRemote');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.send = function(msg, session, next) {
	var uid = msg.from;
	var rid = session.get('rid');
	var channelService = this.app.get('channelService');
	var channel = channelService.getChannel(rid, false);

    var param = {
        msg: msg.content,
        from: uid,
    };

	channel.pushMessage('onChat', param);

	next(null, {
		route: msg.route
	});
};