const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  '@babel/preset-react',
];

const plugins = ['@babel/plugin-proposal-class-properties'];

module.exports = {
  presets,
  plugins,
  env: {
    test: {
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};
