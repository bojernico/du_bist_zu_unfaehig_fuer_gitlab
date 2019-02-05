//Configurations

/**
 * Returns the port
 */
function getPort() {
  return 5005;
}

/**
 * Returns the address
 */
function getAddress() {
  return 'franklyn.htl-leonding.ac.at';
}

/**
 * Returns the Protocol (http, https)
 */
function getProtocol() {
  return 'http';
}

/**
 * Returns the full url
 */
function getFullUrl() {
  return getProtocol() + '://' + getAddress() + ':' + getPort();
}


module.exports.getPort = getPort;
module.exports.getAddress = getAddress;
module.exports.getProtocol = getProtocol;
module.exports.getFullUrl = getFullUrl;
