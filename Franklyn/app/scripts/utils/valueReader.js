//const fs = require("fs");
const path = require('path');
/**
 * Returns the text for the given id in the specific language.
 * Returns the default text if there's no in the given language.
 * Return "text not found" if the id wasn't found.
 * @author hg
 * @param {String} id The id of the wanted text.
 * @param {String} language The language in which the text should get returned.
 */
function getText(id, language) {
  /*var file = fs.readFileSync("../config/text.json");
  var jsonFile = JSON.parse(file);

  for (var i = 0; i < jsonFile.content.length; i++) {
    let element = jsonFile.content[i];
    if (element.id == id) {
      if (!element.translateable) {
        return element.languages.de;
      } else {
        for (var l in element.languages) {
          if (l == language) {
            //Otherwise it tries to access element.languages.l (instead of ...de for instance)
            return element.languages[l.valueOf()];
          }
        }
      }
    }
  }*/
  return "text not found";
}

/**
 * Returns the image for the given id.
 * Returns the default image if the id wasn't found.
 * @author hg
 * @param {String} id The id of the wanted image.
 */
function getImage(id) {
  /*var file = fs.readFileSync("../config/images.json");
  var jsonFile = JSON.parse(file);

  for (var i = 0; i < jsonFile.content.length; i++) {
    let element = jsonFile.content[i];
    if (element.id == id) {
      return element.file;
    }
  }
  return jsonFile.default;*/
  return 0;
}

/**
 * Returns the color for the given id.
 * Returns the default color if the id wasn't found.
 * @param {String} id The id of the wanted color.
 */
function getColor(id) {
  /*var file = fs.readFileSync("../config/colors.json");
  var jsonFile = JSON.parse(file);
  for (var i = 0; i < jsonFile.content.length; i++) {
    let element = jsonFile.content[i];
    if (element.id == id) {
      return element.color;
    }
  }
  return jsonFile.default;*/
  return 0;
}
/**
 * Returns the font for the given id.
 * Returns the default font if the id wasn't found.
 * @author hg
 * @param {String} id The id of the wanted font.
 */
function getFont(id) {
  /*var file = fs.readFileSync("../config/fonts.json");
  var jsonFile = JSON.parse(file);
  for (var i = 0; i < jsonFile.content.length; i++) {
    let element = jsonFile.content[i];
    if (element.id == id) {
      return element.font;
    }
  }
  return jsonFile.default;*/
  return 0;
}

/**
 * Gets the default configuration for the server.
 * @author mh
 * @returns {JSON} config
 */
function getDefaultConfig() {
  return new Promise(async (resolve) => {
    resolve({
      "ports": [5005, 5006, 5007, 5008]
    });
    /*
    fs.readFile('default_config.json', (err, data) => {
      var file = fs.readFileSync('default_config.json');
      if (err) throw new Error('FATAL ERROR: default_config file does not exist.');
      resolve(JSON.parse(data.toString()));
    });
    */
  });
}

module.exports.getText = getText;
module.exports.getImage = getImage;
module.exports.getFont = getFont;
module.exports.getDefaultConfig = getDefaultConfig;
