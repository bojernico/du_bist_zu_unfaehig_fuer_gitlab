const httpService = require('./httpService');
const {
  sleep
} = require('./utils/sleep');

async function startSendingHeartbeats() {
  var res;
  do {
    res = await sendHeartbeat();
    var config = JSON.parse(sessionStorage.getItem('config'));
    if (res.state) sessionStorage.setItem('exam', res.response);
    await sleep(config.heartbeatInterval * 1000);
  } while (true)
}

async function sendHeartbeat() {
  try {
    var url = sessionStorage.getItem('serverUrl') + '/api/heartbeat';
    var headers = {
      'x-auth-token': sessionStorage.getItem('x-auth-token'),
      'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam')
    };
    var res = await httpService.post(url, headers, {});
    return {
      state: true,
      response: res
    }
  } catch (error) {
    return {
      state: false,
      error: error
    };
  }
}

module.exports.startSendingHeartbeats = startSendingHeartbeats;
