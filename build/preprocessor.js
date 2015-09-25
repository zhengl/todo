var babel = require("babel-core");

module.exports = {
  process: function (src, filename) {
    var stage = process.env.BABEL_JEST_STAGE || 0;

    return babel.transform(src, {
      filename: filename,
      stage: stage,
      retainLines: true,
    }).code;
  }
};
