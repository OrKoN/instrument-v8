#!/usr/bin/env node

'use strict';

function printUsage() {
  console.log('Usage: ');
}

let argv = require('minimist')(process.argv.slice(2));
let modulePath = argv._[0];
let run = require('passthru');
let fs = require('fs');
let tmp = require('tmp');
let path = require('path');
let verbose = false;
if (!modulePath) {
  printUsage();
}

let keys = Object.keys(argv);
let methods = [];

keys.forEach(key => {
  if (key !== '_') {
    methods.push({
      name: key,
      arguments: argv[key]
    });
  };
});

let moduleName = path.basename(modulePath);
let instrumentedPath = tmp.tmpNameSync();

let preamble =
`
var m = require('${modulePath}');
var instrument = require('${__dirname + '/../index.js'}');
`.trim();

let test = '';

for (let i = 0; i < methods.length; i++) {
  var method = methods[i];
  test +=
`
m['${method.name}'](${method.arguments});
m['${method.name}'](${method.arguments});
%OptimizeFunctionOnNextCall(m['${method.name}']);
m['${method.name}'](${method.arguments});
instrument.fnOptimizationStatus(m['${method.name}'], '${moduleName}::${method.name}');
`
}


fs.writeFileSync(instrumentedPath, preamble + test, 'utf-8');
if (verbose) {
  let cmd = `node --trace-deopt --allow-natives-syntax ${instrumentedPath}`;
  run(cmd);
} else {
  let cmd = `node --allow-natives-syntax ${instrumentedPath}`;
  run(cmd);
}

