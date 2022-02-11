/**
 * @classdesc
 * This is a Dtgwt class.
 * Simple Decision Table to "Given" , "When" and "Then"
 * Overall flow is the following
 * - setContents(contents)
 * - initialize()
 * - printTable()
 *
 */
class Dtgwt {
  /**
   * @constructor
   * @desc
   * this._clean()
   */
  constructor(){
  }
  /**
   * store content from arguments
   * @param {string} contents Target Table
   * @returns {Dtgwt} this This object
   * @desc
   * fill this.contents from outside of this instance
   */
  setContents(contents){
    this.contents = contents;
    return this;
  }
  /**
   * initialize
   * @returns {Dtgwt} this This object
   * @desc
   * initialize this.contents
   */
  initialize(){
    this.parsedContents = {
      "given": [],
      "when": [],
      "then": []
    };
    return this;
  }
  /**
   *  parse contents
   *  @returns {Dtgwt} this This object
   *  @desc
   *  parse this.contents
   *  and store it to this.parsedContents
   */
  parse(){
    let headerParsed = false;
    let thParsed = false;
    let parsing = {
      "given":false,
      "when":false,
      "then":false
    };
    this.contents.split("\n").forEach(function(line){
      // ignore empty line
      if(line.match(/^$/)){
        return;
      }
      // ignore headers
      if(!headerParsed || !thParsed){
        if(!headerParsed && line.match(/^\|/)){
          headerParsed = true;
          return;
        }
        if(headerParsed && line.match(/^\|-/)){
          thParsed = true;
          return;
        }
      }
      // parse contents
      const parsingTypes = [
        {"type":"given","regex":"Cond"},
        {"type":"when", "regex":"Act"},
        {"type":"then", "regex":"Res"}];
      for(let i = 0 ; i < parsingTypes.length ; i++ ){
        const parsingType = parsingTypes[i];
        if(!parsing[parsingType["type"]]){
          if(line.match(new RegExp(`^\\|${parsingType["regex"]}`))){
            parsing[parsingType["type"]] = true;
            Object.keys(parsing).map(type => {
              if(type != parsingType["type"]){
                parsing[type] = false;
              }
            });
            return;
          }
        }
        if(parsing[parsingType["type"]]){
          const result = line.split("|").map(cell => cell.trim());
          result.shift();
          result.shift();
          result.pop();
          this.parsedContents[parsingType["type"]].push(result);
        }
      }
    }.bind(this));
    ["given","when"].forEach(function(type){
      this.parsedContents[type].pop();
    }.bind(this));
    return this;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Dtgwt;
} else {
  window.Dtgwt = Dtgwt;
}
