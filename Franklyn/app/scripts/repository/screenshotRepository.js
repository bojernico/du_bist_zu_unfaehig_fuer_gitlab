const httpService = require('../httpService');
const {
    sleep
} = require('../utils/sleep');

var screenshots = [];
var screenshotNumber = 1;

const ScreenshotRepository = {
    countInCache() {
        return screenshots.length;
    },
    setScreenshotNumber(latestScreenshotNumber) {
        screenshotNumber = screenshotNumber;
    },
    add(screenshot) {
        screenshots.push(screenshot);
    },
    addNewScreenshot(base64Data) {
        var screenshot = {
            screenshotNumber: screenshotNumber,
            timestamp: Number(sessionStorage.getItem('serverTimeDifference')) + Date.now(),
            base64Data: base64Data
        };
        screenshotNumber++;
        ScreenshotRepository.add(screenshot);
    },
    sortScreenshots() {
        screenshots = screenshots.sort((s1, s2) => {
            s1.timestamp < s2.timestamp
        });
    },
    async sendScreenshotsToServer() {
        while (true) {
            if (screenshots.length != 0) {
                try {
                    var url = sessionStorage.getItem('serverUrl') + '/api/screenshots';
                    var headers = {
                        'Content-Type': 'application/json',
                        'x-auth-token': sessionStorage.getItem('x-auth-token'),
                        'x-auth-token-exam': sessionStorage.getItem('x-auth-token-exam')
                    };
                    var body = screenshots[0];
                    body.timestamp = String(body.timestamp);
                    var res = await httpService.post(url, headers, body);
                    if (res == 'Screenshot saved.') {
                        screenshots.shift();
                    }
                } catch (error) {
                    console.log("not sent")
                }
            }
            await sleep(300);
        }
    }
}

module.exports = ScreenshotRepository;
