//Configurations
const port = 5005
const address = 'franklyn.htl-leonding.ac.at'
const useHttps = true;

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
  return http
}

/**
 * Returns the full url
 */
function getFullUrl() {
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
