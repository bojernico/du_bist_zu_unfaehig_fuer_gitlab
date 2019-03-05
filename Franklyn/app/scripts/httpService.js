const request = require('request');
const axios = require('axios');
const os = require('os');

/**
 * Sends http get request 
 * @author cs
 * @param {String} url including port
 * @param {Array} params content only
 * @param {JSON} headers
 * @returns {Promise}
 */
function get(url, params, headers) {
  return new Promise((resolve, reject) => {
    if (params) params.forEach((param) => {
      url += '/' + param;
    });
    var options = {
      method: 'GET',
      url: url,
      headers: headers
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) resolve(body);
      else if (error) reject(error);
      else {
        reject({
          statusCode: response.statusCode,
          response: body
        });
      }
    });
  });
}

/**
 * Sends http post request 
 * @author cs
 * @param {String} url including port
 * @param {JSON} headers
 * @param {JSON} body
 * @returns {Promise}
 */
function post(url, headers, data) {
  return new Promise((resolve, reject) => {
    if (os.platform == 'darwin') {
      var options = {
        method: 'POST',
        url: url,
        headers: headers,
        body: JSON.stringify(data),
      };
      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) resolve(body);
        else if (error) reject(error);
        else {
          reject({
            statusCode: response.statusCode,
            response: body
          });
        }
      });
    } else {
      axios.post(url, data, {
        headers: headers
      })
        .then(function (res) {
          resolve(res.request.response);
        })
        .catch(function (error) {
          reject({
            statusCode: error,
            response: error
          });
        });
    }
  });
}

/**
 * Sends http put request 
 * @author cs
 * @param {String} url including port
 * @param {Array} params content only
 * @param {JSON} headers
 * @param {JSON} body
 * @returns {Promise}
 */
function put(url, params, headers, body) {
  return new Promise((resolve, reject) => {
    if (params) params.forEach((param) => {
      url += '/' + param;
    });
    var options = {
      method: 'PUT',
      url: url,
      headers: headers,
      body: JSON.stringify(body),
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) resolve(body);
      else if (error) reject(error);
      else {
        reject({
          statusCode: response.statusCode,
          response: body
        });
      }
    });
  });
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
