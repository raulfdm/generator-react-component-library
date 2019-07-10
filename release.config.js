module.exports = {
  release: {
    branch: 'master',
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: 'CHANGELOG',
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
};
