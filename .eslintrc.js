module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-underscore-dangle': 'warn',
    'import/prefer-default-export': 0,
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/templates/**/*'],
      settings: {
        react: {
          version: '16.3',
        },
      },
      extends: ['eslint:recommended', 'plugin:react/recommended'],
      rules: {
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': 0,
      },
    },
  ],
};
