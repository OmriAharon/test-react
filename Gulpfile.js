/**
 * @fileoverview Initialization for all the general gulp tasks.
 */

"use strict";
const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const requireDir = require('require-dir');

global.rootRequire = function(name) {
  return require(path.join(__dirname, name));
};

const gulpTasks = requireDir('./gulp/tasks', { recurse: true });

/**
 * Recursively iterates over the registration object and registers all the tasks within it.
 * @param {Object} registrationObject - A key/value hash containing all the tasks to register,
 *                                      the key is the file name and the value is the registration function.
 */
const register = (registrationObject) => {
  _.forOwn(registrationObject, (taskRegistration) => {

        // If the current property value is a function which means it's an actually registering tasks, let's call it.
    if (_.isFunction(taskRegistration)) {
      taskRegistration(gulp);
    }
        // The property is an object which means it's a directory that contains several task registrations, let's recurse!
    else {
      register(taskRegistration);
    }
  });
};

register(gulpTasks);
