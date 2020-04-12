module.exports = {
  /* It solves css/less/scss import issues.
    You might have similar issues with different file extensions (e.g. md).
    Just search for "<file type> jest loader"
  */
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
};
