//Configurations
const port = 5005
const address = 'franklyn-odroid.fritz.box'
const protocol = 'http'

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
  return protocol
}

/**
 * Returns the full url
 */
function getFullUrl() {
  return getProtocol() + '://' + getAddress() + ':' + getPort()
}


module.exports.getPort = getPort;
module.exports.getAddress = getAddress;
module.exports.getProtocol = getProtocol;
module.exports.getFullUrl = getFullUrl;
