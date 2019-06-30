const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const rimraf = require('rimraf');

const { ROOT_FILES } = require('./resources/constants');

const clearTmpDir = () => {
  rimraf.sync(TMP_PATH);
};

const TMP_PATH = path.join(__dirname, '../../tmp');

const generateDistPath = file => path.join(TMP_PATH, file);

describe('React Component Library Generator', () => {
  describe('Simple setup', () => {
    beforeEach(() => {
      return helpers
        .run(path.join(__dirname, '../app'))
        .inDir(TMP_PATH)
        .withPrompts({ name: 'tmp' });
    });

    afterEach(clearTmpDir);

    it('copy all root files file', () => {
      const files = ROOT_FILES.map(generateDistPath);
      assert.file(files);
    });
  });
});
