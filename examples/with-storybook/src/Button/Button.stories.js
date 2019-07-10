import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import README from './README.md';
import Button from './Button';

const stories = storiesOf('Button', module).addDecorator(withReadme(README));

stories.add('Default', () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
));

stories.add('With some emoji', () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
));
