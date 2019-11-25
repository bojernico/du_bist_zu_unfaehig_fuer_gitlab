const httpService = require('./httpService');
const ScreenshotRepository = require('./repository/screenshotRepository');

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
        sessionStorage.setItem('serverTimeDifference', new Date((JSON.parse(sessionStorage.getItem('config'))).timestamp) - Date.now()); //to ensure the screenshots are sent with the correct time
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
 * @author cs, hg
 * @returns {Object} With the state true, or false and an error
 */
async function enroll(firstname, lastname, alreadyRegistered) {
  try {
    var url = sessionStorage.getItem('serverUrl') + '/api/exams/enroll';
    var headers = {
      'Content-Type': 'application/json',
      'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam'),
      'x-auth-token': sessionStorage.getItem('x-auth-token')
    };
    var body;
    if (alreadyRegistered) {
      body = {
        'firstname': firstname,
        'lastname': lastname,
        'alreadyRegistered': true
      };
    } else {
      body = {
        'firstname': firstname,
        'lastname': lastname
      };
    }
    var res = await httpService.put(url, null, headers, body);
    if (alreadyRegistered) {
      if (res === 'Duplicate name detected.') {
        console.log("false: Duplicate name detected")
        return {
          state: false,
        };
      }
    }
    sessionStorage.setItem('exam', JSON.stringify(JSON.parse(res).exam));
    sessionStorage.setItem('examinee', JSON.stringify(JSON.parse(res).examinee));

    await getExamineeToken(JSON.parse(res).examinee._id);
    await getOwnExamineeDetails();
    return {
      state: true
    };
  } catch (error) {
    console.log("false: ", error)
    return {
      state: false,
      error: error
    }
  }
}

async function getOwnExamineeDetails() {
  try {
    var url = sessionStorage.getItem('serverUrl') + '/api/exams/ownExamineeDetails';
    var headers = {
      'Content-Type': 'application/json',
      'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam'),
      'x-auth-token': sessionStorage.getItem('x-auth-token')
    };
    var res = await httpService.get(url, null, headers);
    sessionStorage.setItem('examineeDetails', res);

    if ((JSON.parse(sessionStorage.getItem('examineeDetails'))).modules.screenCapture) {
      ScreenshotRepository.setScreenshotNumber((JSON.parse(sessionStorage.getItem('examineeDetails'))).modules.screenCapture.latestScreenshotnumber);
    }
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
module.exports.enroll = enroll;
