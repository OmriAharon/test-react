module.exports = {
  isWatching() {
    return process.argv[1].indexOf('start.js') !== -1;
  }
};
