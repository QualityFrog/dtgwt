#!/usr/bin/env node

const pkg = require('../package')
const argv = require('minimist')(process.argv.slice(2));
if (argv['_'].length < 1 || typeof argv['h'] !== 'undefined'){
  console.error("================================================================================");
  console.error(pkg.description);
  console.error("");
  console.error(`Author     : ${pkg.author.name} <${pkg.author.email}> ${pkg.author.url}`);
  console.error(`Homepage   : ${pkg.homepage}`);
  console.error(`LICENSE    : ${pkg.license}`);
  console.error(`Report bugs: ${pkg.bugs.url}`);
  console.error("================================================================================");
  console.error("");
  console.error("Usage: dtgwt [-h] <file>");
  console.error("");
  process.exit(1);
}

const fs = require('fs');
const Dtgwt = require('../src/dtgwt');
const d = new Dtgwt();
d.setContents(require('fs').readFileSync(argv['_'][0],'utf8'))
d.parse();
d.print();
