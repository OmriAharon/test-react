/**
 * @fileoverview Utils functions for all the gulp tasks.
 */

"use strict";

const gutil = require('gulp-util');

const gulpUtils = {};

/**
 * Prints to the console
 * @param {String} message - the message to print
 * @param {Object} options - Extra option for the printing (like color)
 */
gulpUtils.print = function print(message, options) {
  if (message) {
    message = JSON.stringify(message);
    const color = options && options.color || 'white';
    gutil.log(gutil.colors[color](message));
  } else {
    gutil.log(gutil.colors.red('Warning! Trying to print an undefined message'));
  }
};

/**
 * Matches 'git status --porcelain' with a given filters
 * @param {String} statusRow - the 'git status --porcelain' status row
 * @param {Object} options - Extra option for the filtering (like excludeStatuses, filter)
 *
 * @return {Boolean} if the file matched the filters
 */
gulpUtils.doesWorkspaceFileMatch = function doesWorkspaceFileMatch(statusRow, options) {
  const excludeStatuses = options.excludeStatuses;
  const filter = options.filter;
  let isMatched = true;

  if (statusRow && statusRow !== '') {
    const stagedStatus = statusRow[0].toUpperCase();
    const unStagedStatus = statusRow[1].toUpperCase();

    for (let statusIndex = 0; statusIndex < excludeStatuses.length; statusIndex++) {
      const status = excludeStatuses[statusIndex].toUpperCase();
      if (stagedStatus === status || unStagedStatus === status) {
        isMatched = false;
        break;
      }
    }

    if (isMatched && filter) {
      const filterRegex = new RegExp(filter, 'gi');
      isMatched = filterRegex.test(statusRow);
    }
  } else {
    isMatched = false;
  }

  return isMatched;
};

module.exports = gulpUtils;
