const { merge } = require('lodash');
const { JEST_ENZYME, TESTING_LIBRARY } = require('./constants');

const common = {
  devDependencies: {
    '@babel/preset-env': '^7.5.5',
    '@babel/preset-react': '^7.0.0',
    '@types/jest': '^24.0.17',
    'babel-jest': '^24.8.0',
    jest: '^24.8.0',
  },
  scripts: {
    test: 'jest .',
    'test:watch': 'jest --watch',
  },
};

module.exports = {
  [JEST_ENZYME]: merge(common, {
    devDependencies: {
      'enzyme-adapter-react-16': '^1.14.0',
      enzyme: '^3.10.0',
      'jest-enzyme': '^7.1.0',
    },
  }),
  [TESTING_LIBRARY]: merge(common, {
    devDependencies: {
      '@testing-library/react': '^8.0.8',
      '@babel/plugin-transform-runtime': '^7.5.5',
    },
  }),
};
