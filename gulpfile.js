const { src, dest } = require('gulp');

const copy = () => {
  return src('src/styles/test.scss').pipe(dest('dist'));
};

exports.copy = copy;