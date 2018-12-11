/**
 * Waits until time passed.
 * @author mh
 * @param {Number} ms milliseconds
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.sleep = sleep;