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
    expect(d.parsedContents).toStrictEqual({
      "given": [],
      "when": [],
      "then": []
    });
  });
  it(' parse() : can parse the contents', () => {
    const d = new Dtgwt();
    d.initialize();
    d.setContents(fs.readFileSync('__tests__/sample_dt.md','utf8'));
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
  it(' print() : can parse the contents', () => {
    const d = new Dtgwt();
    d.initialize();
    d.setContents(fs.readFileSync('__tests__/sample_dt.md','utf8'));
    d.parse();
    expect(d.print).toBeInstanceOf(Function);
    const output = [];
    const log = console.log;
    console.log = function(line){
      output.push(line);
    };
    d.print();
    expect(output).toStrictEqual(
      ['|Scenario No|Test conditions|Step description|Step expected result|',
       '|---|---|---|---|',
       '|1|Given Initial input is "0"|When Click "+"|Then Input:1 and Error Message:N/A|',
       '|2|Given Initial input is "0"|When Click "-"|Then Input:0 and Error Message:N/A|',
       '|3|Given Initial input is "1"|When Click "+"|Then Input:2 and Error Message:N/A|',
       '|4|Given Initial input is "1"|When Click "-"|Then Input:1 and Error Message:N/A|',
       '|5|Given Initial input is "254"|When Click "+"|Then Input:255 and Error Message:N/A|',
       '|6|Given Initial input is "254"|When Click "-"|Then Input:253 and Error Message:N/A|',
       '|7|Given Initial input is "255"|When Click "+"|Then Input:255 and Error Message:N/A|',
       '|8|Given Initial input is "255"|When Click "-"|Then Input:254 and Error Message:N/A|',
       '|9|Given Initial input is "0"|When Modify Initial input to "AB"|Then Input:0 and Error Message:Invalid Input|',
       '|10|Given Initial input is "0"|When Modify Initial input to "1%"|Then Input:0 and Error Message:Invalid Input|']
      );
    d.initialize();
    while(output.length > 0) {
        output.pop();
    }
    d.print();
    expect(output).toStrictEqual(
      ['|Scenario No|Test conditions|Step description|Step expected result|',
       '|---|---|---|---|',
       '|No "givens" are properly provided||||']
      );
    console.log = log;
  });
});
