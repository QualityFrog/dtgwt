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
    expect(d.parsedContents).not.toBeNull();
  });
  it(' parse() : can parse the contents', () => {
    const d = new Dtgwt();
    d.setContents(fs.readFileSync('__tests__/sample_dt.md','utf8'));
    d.initialize();
    expect(d.parse).toBeInstanceOf(Function);
    expect(d.parse()).toBeInstanceOf(Dtgwt);
    expect(d.parsedContents).toStrictEqual({
      "given": [
        [
          'Initial input is "0"',
          'Y',
          'Y',
          '',
          '',
          '',
          '',
          '',
          '',
          'Y',
          'Y'
        ],
        [
          'Initial input is "1"',
          '',
          '',
          'Y',
          'Y',
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        [
          'Initial input is "254"',
          '',
          '',
          '',
          '',
          'Y',
          'Y',
          '',
          '',
          '',
          ''
        ],
        [
          'Initial input is "255"',
          '',
          '',
          '',
          '',
          '',
          '',
          'Y',
          'Y',
          '',
          ''
        ]
      ],
      "when": [
        [ 'Click "+"', 'Y', '', 'Y', '', 'Y', '', 'Y', '', '', '' ],
        [ 'Click "-"', '', 'Y', '', 'Y', '', 'Y', '', 'Y', '', '' ],
        [
          'Modify Initial input to "AB"',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          'Y',
          ''
        ],
        [
          'Modify Initial input to "1%"',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          'Y'
        ]
      ],
      "then": [
        [
          'Input', '1',   '0',
          '2',     '1',   '255',
          '253',   '255', '254',
          '0',     '0'
        ],
        [
          'Error Message', 'N/A',
          'N/A',           'N/A',
          'N/A',           'N/A',
          'N/A',           'N/A',
          'N/A',           'Invalid Input',
          'Invalid Input'
        ]
      ]
    });
  });
});
