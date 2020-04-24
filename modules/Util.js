const cheerio = require("cheerio");

class Util {
  static escapeCharacter(text) {
    return text
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"');
  }

  // 414,736
  static modifyWidthAndHeight(html, width, height) {
    let $ = cheerio.load(html);
    $("iframe").attr("width", width).attr("height", height);
    return $.html();
  }
}

module.exports = Util;
