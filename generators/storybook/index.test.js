const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const rimraf = require('rimraf');
const { promisify } = require('util');
const fs = require('fs-extra');
const glob = require('glob');

const promiseGlob = promisify(glob);

const clearTmpDir = () => {
  rimraf.sync(TMP_PATH);
};

const TMP_PATH = path.join(__dirname, '../../tmp');

const generateDistPath = (file) => path.join(TMP_PATH, file);

describe.only('Storybook Module', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '../app'))
      .inDir(TMP_PATH)
      .withPrompts({ name: 'tmp', tester: 'none', storybook: true });
  });

  afterAll(clearTmpDir);

  it('copy all files from ".storybook" folder', async () => {
    const templatesFile = path.join(__dirname, './templates/.storybook/**/*');

    const files = await promiseGlob(templatesFile);
    const rootFilesInTmp = files
      .filter((file) => fs.lstatSync(file).isFile())
      .map((file) => {
        /* TODO: This is too hacky 🤦🏽‍, refactor pls */
        const splittedFilePath = file.split('/');
        const srcIndex = splittedFilePath.findIndex(
          (pathPart) => pathPart === '.storybook',
        );

        const filePath = splittedFilePath
          .slice(srcIndex, splittedFilePath.length)
          .join('/');

        return filePath;
      })
      .map((fileName) => path.join(TMP_PATH, fileName));

    assert.file(rootFilesInTmp);
  });

  it('copy all files from jest folder', () => {
    const readmeButton = generateDistPath('./src/Button/README.md');
    const buttonStories = generateDistPath('./src/Button/Button.stories.js');

    assert.file([buttonStories, readmeButton]);
  });
});
