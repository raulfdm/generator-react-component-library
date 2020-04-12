/* How to write stories: https://storybook.js.org/docs/formats/component-story-format/ */
import React from 'react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import README from './README.md';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [withReadme(README)],
};

export const basic = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export const passingChildren = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
