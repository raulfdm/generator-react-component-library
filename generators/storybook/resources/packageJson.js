module.exports = {
  scripts: {
    storybook: 'start-storybook -p 6006',
    'build:storybook': 'build-storybook -o public/',
  },
  devDependencies: {
    '@storybook/addon-a11y': '^5.1.10',
    '@storybook/addon-actions': '^5.1.10',
    '@storybook/addon-links': '^5.1.10',
    '@storybook/addon-storysource': '^5.1.10',
    '@storybook/addon-viewport': '^5.1.10',
    '@storybook/addons': '^5.1.10',
    '@storybook/react': '^5.1.10',
    'require-context.macro': '^1.1.1',
    'storybook-readme': '^5.0.6',
    'babel-loader': '^8.0.6',
  },
};
