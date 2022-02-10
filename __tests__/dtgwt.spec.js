const fs = require('fs');
const Dtgwt = require('../src/dtgwt');

describe('Dtgwt', () => {
  it(' constructor() : can create new instance', () => {
    const d = new Dtgwt();
    expect(d).not.toBeNull();
    expect(d).toBeInstanceOf(Dtgwt);
  });
  it(' setContents(contents) : can read all strings from contents', () => {
    const d = new Dtgwt();
    expect(d.setContents).toBeInstanceOf(Function);
    expect(d.setContents(fs.readFileSync('__tests__/sample_dt.md','utf8'))).toBeInstanceOf(Dtgwt);
    expect(d.contents).not.toBe("");
  });
  it(' initialize() : can initialize the instance', () => {
    const d = new Dtgwt();
    expect(d.initialize).toBeInstanceOf(Function);
    expect(d.initialize()).toBeInstanceOf(Dtgwt);
    expect(d.contents).toBe("");
  });
});
