'use strict';
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack-config/webpack.config.' + process.env.NODE_ENV || 'development');
const execSync = require('child_process').execSync;
const opn = require('opn');

const port = process.argv[2] || 3000;

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
let handleCompile;
const isSmokeTest = process.argv.some(arg =>
    arg.indexOf('--smoke-test') > -1
);
if (isSmokeTest) {
  handleCompile = function(err, stats) {
        /* eslint-disable no-process-exit */
    if (err || stats.hasErrors() || stats.hasWarnings()) {
      process.exit(1);
    } else {
      process.exit(0);
    }
        /* eslint-enable no-process-exit */
  };
}

const compiler = webpack(config, handleCompile);

/**
 * Opens the app in the browser
 * @returns {void}
 */
function openBrowser() {
  if (process.platform === 'darwin') {
    try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync(
                'osascript ' +
                path.resolve(__dirname, './openChrome.applescript') +
                ` http://localhost:${port}/`
            );
      return;
    } catch (err) {
            // Ignore errors.
    }
  }
    // Fallback to opn
    // (It will always open new tab)
  opn(`http://localhost:${port}/`);
}

new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true, // Note: only CSS is currently hot reloaded
  publicPath: config.output.publicPath,
  quiet: true
}).listen(port, 'localhost', function(err, result) {
  if (err) {
    console.log(err);
  }

  openBrowser();
});
