const screenshot = require('screenshot-desktop');

var encodingFormat = 'base64';

/**
 * PLATFORM MACOS
 * Takes a screenshot of the entire desktop in full resolution.
 * @author mh
 * @returns {String} Returns Promise with a base64 encoded string
 */
function getScreenshot() {
  return new Promise((resolve, reject) => {
    screenshot().then((image) => {
      resolve(Buffer.from(image).toString(encodingFormat));
    }).catch((err) => {
      reject("An error occurred: " + err);
    })
  });
}

module.exports.getScreenshot = getScreenshot;
