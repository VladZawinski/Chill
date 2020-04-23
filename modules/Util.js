
class Util {
  static escapeCharacter(text) {
    
    return text
    .replace(/&lt;/g,'<') 
    .replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"')

  }

}

module.exports = Util
