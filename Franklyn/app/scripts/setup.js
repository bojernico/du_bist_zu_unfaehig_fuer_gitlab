const httpService = require('./httpService');
//const config = require('../config/config');

/**
 * Check if ip and port are correct and server is online
 * Save the serverUrl in sessionStorage
 * @author cs, hg
 * @param {String} url url
 * @returns {Boolean}
 */
async function testConnection(url) {
  return new Promise(async (resolve, reject) => {
    try {
      var res = await httpService.get(url + '/api');
      res = JSON.parse(res);
      if (res.isOnline == true) {
        sessionStorage.setItem('config', JSON.stringify(res));
        sessionStorage.setItem('serverUrl', url);
        sessionStorage.setItem('version', res.version);
        resolve({
          state: true
        });
      }
    } catch (error) {
      reject(error);
    }
    resolve({
      state: false
    });
  });
}

/**
 * Get token of specified exam if it exists and save it in sessionStorage
 * @author cs
 * @param {String} pin
 * @param {Date} date
 * @returns {Object} With the state true, or false and an error
 */
async function getExamToken(pin, date) {
  try {
    var url = sessionStorage.getItem('serverUrl');
    var headers = {
      'Content-Type': 'application/json'
    };
    var body = {
      pin: pin,
      date: date
    };
    var res = await httpService.post(url + '/api/authExam', headers, body);
    sessionStorage.setItem('x-auth-token-exam', res);
    return {
      state: true
    };
  } catch (error) {
    return {
      state: false,
      error: error
    };
  }
}

/**
 * Registers examinee for exam and calls getExamineeToken
 * @author cs
 * @param {String} enrolmentNumber
 * @param {String} firstname
 * @param {String} lastname
 * @returns {Object} With the state true, or false and an error
 */
async function registerExaminee(enrolmentNumber, firstname, lastname) {
  try {
    var url = sessionStorage.getItem('serverUrl') + '/api/examinees';
    var headers = {
      'Content-Type': 'application/json'
    };
    var body = {
      enrolmentNumber: enrolmentNumber,
      firstname: firstname,
      lastname: lastname
    };
    var res = await httpService.post(url, headers, body);
    res = await getExamineeToken(JSON.parse(res)._id);
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

/**
 * Get token of examinee and save it into sessionStorage
 * @author cs
 * @param {ObjectId} id
 * @returns {Object} With the state true, or false and an error
 */
async function getExamineeToken(id) {
  try {
    var url = sessionStorage.getItem('serverUrl') + '/api/authExaminee';
    var headers = {
      'Content-Type': 'application/json',
      'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam')
    };
    var body = {
      id: id
    };
    var res = await httpService.post(url, headers, body);
    sessionStorage.setItem('x-auth-token', res);
    return {
      state: true
    };
  } catch (error) {
    return {
      state: false,
      error: error
    };
  }
}

/**
 * Enroll examinee for exam
 * @author cs
 * @returns {Object} With the state true, or false and an error
 */
async function enroll() {
  try {
    var url = sessionStorage.getItem('serverUrl') + '/api/exams/enroll';
    var headers = {
      'Content-Type': 'application/json',
      'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam'),
      'x-auth-token': sessionStorage.getItem('x-auth-token')
    };
    var res = await httpService.put(url, null, headers, {});
    sessionStorage.setItem('exam', res);
    return {
      state: true
    };
  } catch (error) {
    return {
      state: false,
      error: error
    }
  }
}

module.exports.testConnection = testConnection;
module.exports.getExamToken = getExamToken;
module.exports.getExamineeToken = getExamineeToken;
module.exports.registerExaminee = registerExaminee;
module.exports.enroll = enroll;
