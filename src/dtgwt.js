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
    this.contents = "";
    return this;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Dtgwt;
} else {
  window.Dtgwt = Dtgwt;
}
