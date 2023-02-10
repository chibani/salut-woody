const path = require('path');

module.exports = {
  entry: "./test/greeter.test.js",
  output: {
    path: path.resolve(__dirname, "."),
    filename: "bundle.test.js"
  },
  mode: "none"
};