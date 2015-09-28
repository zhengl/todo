var babel = require("babel-core");

module.exports = {
  process: function (src, filename) {
	if (filename.match(/\.svg$/) || filename.match(/\.css$/)) {
		return;
	}
	var stage = process.env.BABEL_JEST_STAGE || 0;
	return babel.transform(src, {
		filename: filename,
		stage: stage,
		retainLines: true,
	}).code;
  }
};
