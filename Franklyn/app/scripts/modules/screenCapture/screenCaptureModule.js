const os = require('os');
const { sleep } = require('../../utils/sleep');
const screenCaptureMacOs = require('./screenCapture_macOS');
const httpService = require('../../httpService');
var continueScreenshotting = false;
var screenshotNumber = 1;

/**
 * Start taking screenshots of desktop and send them to the server.
 * @author mh
 * @param {String} resolution [HD, FHD]
 * @param {Number} interval seconds
 */
async function takeScreenshots(resolution, interval) {
    var w;
    switch (resolution) {
        case 'HD':
            w = 1280;
            break;
        case 'FHD':
            w = 1920;
            break;
        default:
            w = null;
    }
    continueScreenshotting = true;
    var base64Data;
    do {
        if (os.platform == 'darwin') {
            try {
                base64Data = await screenCaptureMacOs.getScreenshot(); //because the Electron screenCapturer is badly optimized
            } catch (error) {
                console.log(error);
            }
        } else {
            base64Data = getScreenshot(w, 'image/jpeg');
        }
        await sendScreenshotToServer(base64Data);
        await sleep(interval * 1000);
    } while (continueScreenshotting);
}

/**
 * Stops taking screenshots.
 * @author mh
 */
function stopScreenshotting() {
    continueScreenshotting = false;
}

/**
 * Sends base64Data to Server.
 * @author mh
 * @param {String} base64Data
 * @return {Promise}
 */
async function sendScreenshotToServer(base64Data) {
    try {
        var url = sessionStorage.getItem('serverUrl') + '/api/screenshots';
        var headers = {
            'Content-Type': 'application/json',
            'x-auth-token': sessionStorage.getItem('x-auth-token'),
            'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam')
        };
        var body = {
            screenshotNumber: screenshotNumber,
            timestamp: '' + Date.now(),
            base64Data: base64Data
        };
        var res = await httpService.post(url, headers, body);
        if (res == 'Screenshot saved.') {
            screenshotNumber++;
        }
    } catch (error) {
        return error;
    }
}

//SCREENCAPTURER
const { desktopCapturer } = require('electron');
const fs = require('fs');

var width = 1280; // The default width of the screenshot
var height = 720; // The default height of the screenshot
var imageFormat = 'image/jpeg'; // The default image format
// The various HTML elements we need to configure or control
var video = null;
var canvas = null;
var setUp = -1; //<0 screen capture not set up; 0 setting up screen capture; >0 set up screen capture

/**
 * Set up screen capture
 * @author cs
 */
function startup() {
    desktopCapturer.getSources({
            types: ['screen']
        },
        (error, sources) => {
            if (error) throw error;
            for (let i = 0; i < sources.length; ++i) {
                if (sources[i].name === 'Entire screen') {
                    navigator.mediaDevices.getUserMedia({
                            audio: false,
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: sources[i].id,
                                    minWidth: width,
                                    maxWidth: width,
                                    minHeight: height,
                                    maxHeight: height
                                }
                            }
                        })
                        .then(stream => handleStream(stream))
                        .catch(error => handleError(error));
                }
            }
        }
    );
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.setAttribute('hidden', true);
    clearPhoto();
}
/**
 * @author cs
 * @param {*} stream
 */
function handleStream(stream) {
    video = document.createElement('video');
    video.id = 'video';
    video.setAttribute('hidden', true);
    video.srcObject = stream;
    video.onloadedmetadata = e => video.play();
    setUp = 1;
}

/**
 * @author cs
 * @param {*} error
 */
function handleError(error) {
    console.log(error);
}

/**
 * Fill the photo with an indication that none has been
 * captured
 * @author cs
 */
function clearPhoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var data = canvas.toDataURL(imageFormat);
}
/**
 * PLATFORM Windows and Linux
 * Capture a screenshot by fetching the current contents of the video
 * and drawing it into a canvas, then converting that to a preferred
 * format data URL. By drawing it on an offscreen canvas and then
 * converting that to base64
 * @author cs
 * @param {Number} w
 * @param {String} format
 * @returns {String} base64 encoded screenshot
 */
function getScreenshot(w, format) {
    if (setUp < 0) {
        setUp = 0;
        width = w || width;
        height = width / (screen.width / screen.height);
        imageFormat = format || imageFormat;
        startup();
    } else if (setUp > 0) {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var data = canvas.toDataURL(imageFormat);
            return data.split(';base64,').pop();
        } else clearPhoto();
    }
    return null;
}

module.exports.takeScreenshots = takeScreenshots;
module.exports.stopScreenshotting = stopScreenshotting;