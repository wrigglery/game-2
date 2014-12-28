/* jshint camelcase: false */

var request = require('../lib/superagent'),
    store = require('store'),
    debug = require('debug')('game:services:sessions');

var SessionsService = {
  new: function(data) {
    var defer;

    data = {
      'grant_type': 'password',
      'client_id': 'test',
      'client_secret': 'test',
      username: data.login,
      password: data.password
    };

    debug('new request %o', data);
    defer = request
      .post('/oauth/token')
      .send(data)
      .promise();

    defer.then(function(res) {
        var accessToken = res.access_token;

        if (accessToken) {
          store.set('accessToken', accessToken);
          debug('get access token %s', accessToken);
        }
      });

    return defer;
  }
};

module.exports = SessionsService;