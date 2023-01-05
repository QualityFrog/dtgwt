/**
 * @classdesc
 * This is a Dtgwt class.
 * Simple Decision Table to "Given" , "When" and "Then"
 * @class
 *
 * @example
 * const dtgwt = new Dtgwt();
 * dtgwt.setContents();
 * dtgwt.setContents(require('fs').readFileSync('FILENAME','utf8'));
 * dtgwt.parse();
 * dtgwt.generateResults();
 */
class Dtgwt {
  /**
   * @constructor
   * @desc
   * this.initialize();
   */
  constructor() {
    this.initialize();
  }
  /**
   * store content from arguments
   * @param {string} contents Target Table(Should be markdown string)
   * @returns {Dtgwt} this This object
   * @desc
   * fill this.contents from outside of this instance
   */
  setContents(contents) {
    this.contents = contents;
    return this;
  }
  /**
   * initialize
   * @returns {Dtgwt} this This object
   * @desc
   * initialize this.contents and this.parsedContents
   */
  initialize() {
    this.contents = "";
    this.parsedContents = {
      given: [],
      when: [],
      then: [],
    };
    this.results = [];
    return this;
  }
  /**
   *  parse contents
   *  @returns {Dtgwt} this This object
   *  @desc
   *  parse this.contents
   *  and store it to this.parsedContents
   */
  parse() {
    let headerParsed = false;
    let thParsed = false;
    let parsing = {
      given: false,
      when: false,
      then: false,
    };
    this.contents.split("\n").forEach(
      function (line) {
        // ignore empty line
        if (line.match(/^$/)) {
          return;
        }
        // ignore headers
        if (!headerParsed || !thParsed) {
          if (!headerParsed && line.match(/^\s*\|/)) {
            headerParsed = true;
            return;
          }
          if (headerParsed && line.match(/^\s*\|\s*-/)) {
            thParsed = true;
            return;
          }
        }
        // parse contents
        const parsingTypes = [
          { type: "given", regex: "Cond" },
          { type: "when", regex: "Act" },
          { type: "then", regex: "Res" },
        ];
        for (let i = 0; i < parsingTypes.length; i++) {
          const parsingType = parsingTypes[i];
          if (!parsing[parsingType["type"]]) {
            if (line.match(new RegExp(`^\\s*\\|\\s*${parsingType["regex"]}`))) {
              parsing[parsingType["type"]] = true;
              Object.keys(parsing).map((type) => {
                if (type != parsingType["type"]) {
                  parsing[type] = false;
                }
              });
              return;
            }
          }
          if (parsing[parsingType["type"]]) {
            const result = line.split("|").map((cell) => cell.trim());
            result.shift();
            result.shift();
            result.pop();
            this.parsedContents[parsingType["type"]].push(result);
          }
        }
      }.bind(this)
    );
    ["given", "when"].forEach(
      function (type) {
        this.parsedContents[type].pop();
      }.bind(this)
    );
    return this;
  }
  /**
   * generate result array
   * @returns {Dtgwt} this This object
   * @desc
   * generate this.results array from this.parsedContents
   * @example
   * dtgwt.generateResults();
   */
  generateResults() {
    this.results = []
    this.results.push(
      `|Scenario No|Test conditions|Step description|Step expected result|`
    );
    this.results.push(`|---|---|---|---|`);
    // ignore error patterns
    if (
      this.parsedContents["given"].length === 0 ||
      this.parsedContents["given"][0] < 2
    ) {
      this.results.push(`|No "givens" are properly provided||||`);
      return;
    }
    let error = false;
    ["when", "then"].forEach(
      function (type) {
        if (
          this.parsedContents[type].length === 0 ||
          this.parsedContents[type][0].length !==
            this.parsedContents["given"][0].length
        ) {
          this.results.push(`|No "${type}" are properly provided||||`);
          error = true;
        }
      }.bind(this)
    );
    if (error) {
      return;
    }

    const numberOfScenarios = this.parsedContents["given"][0].length - 1;
    for (let s = 1; s <= numberOfScenarios; s++) {
      const givens = [];
      this.parsedContents["given"].forEach(
        function (g, i) {
          const given = g[0];
          if (g[s].match(/^y$/i)) {
            givens.push(`${given}`);
          }
        }.bind(this)
      );
      const whens = [];
      this.parsedContents["when"].forEach(
        function (w, i) {
          const when = w[0];
          if (w[s].match(/^y$/i)) {
            whens.push(`${when}`);
          }
        }.bind(this)
      );
      const thens = [];
      this.parsedContents["then"].forEach(
        function (t, i) {
          const then = t[0];
          thens.push(`${then}:${t[s]}`);
        }.bind(this)
      );
      this.results.push(
        `|${s}|Given ${givens.join(" and ")}|When ${whens.join(
          " and "
        )}|Then ${thens.join(" and ")}|`
      );
    }
    return this;
  }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = Dtgwt;
} else {
  window.Dtgwt = Dtgwt;
}
