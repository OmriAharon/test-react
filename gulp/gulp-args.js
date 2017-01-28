"use strict";

const yargs = require('yargs');

module.exports = {
  showProccesedFiles: yargs.argv.show || false,
  all: yargs.argv.all,
  path: yargs.argv.path,
  fix: yargs.argv.fix
};
