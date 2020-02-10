//Configurations

const locally = false;

const port = 5005;
var address = 'franklyn.htl-leonding.ac.at';
var useHttps = true;

if (locally) {
  address = 'localhost'
  useHttps = false
}

/**
 * Returns the port
 */
function getPort() {
  return port
}

/**
 * Returns the address
 */
function getAddress() {
  return address
}

/**
 * Returns the Protocol (http, https)
 */
function getProtocol() {
  if (useHttps) return 'https'
  return 'http'
}

/**
 * Returns the full url
 */
function getFullUrl() {
  if (locally) return getFullUrlWithPort()
  return getProtocol() + '://' + getAddress()
}

/**
 * Returns the full url
 */
function getFullUrlWithPort() {
  return getProtocol() + '://' + getAddress() + ':' + getPort()
}

module.exports.getPort = getPort;
module.exports.getAddress = getAddress;
module.exports.getProtocol = getProtocol;
module.exports.getFullUrl = getFullUrl;
