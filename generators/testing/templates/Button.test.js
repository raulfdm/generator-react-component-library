import React from 'react';
import { mount } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {
  it('renders without error', () => {
    const wrapper = mount(<Button>Hello</Button>);
    expect(wrapper).toExist();
  });
});
