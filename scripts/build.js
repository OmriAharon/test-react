'use strict';

const webpack = require('webpack');
const config = require('../webpack-config/webpack.config.' + process.env.NODE_ENV || 'production');

webpack(config).run(function(err, stats) {
  if (err) {
    console.error('Failed to create a ' + process.env.NODE_ENV + ' build. Reason:');
    console.error(err.message || err);
    throw new Error();
  }

  console.log('Successfully generated a bundle for ' + process.env.NODE_ENV + ' in the dist folder!');
});
