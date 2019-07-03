const { JEST_ENZYME } = require('./constants');

module.exports = {
  [JEST_ENZYME]: {
    devDependencies: {
      '@babel/preset-env': '^7.4.5',
      '@babel/preset-react': '^7.0.0',
      '@types/jest': '^24.0.15',
      'babel-jest': '^24.8.0',
      'enzyme-adapter-react-16': '^1.14.0',
      enzyme: '^3.10.0',
      'jest-enzyme': '^7.0.2',
      jest: '^24.8.0',
    },
    scripts: {
      test: 'jest .',
      'test:watch': 'jest --watch',
    },
  },
};
