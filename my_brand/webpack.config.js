const path = require("path");

module.exports = {
  mode: "production",
  entry: "./scripts/blogsManager.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
