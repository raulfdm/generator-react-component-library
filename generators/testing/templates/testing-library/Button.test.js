import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

const defaultProps = { 'data-testid': 'button' };

const mountComponent = props => {
  const finalProps = { ...defaultProps, ...props };
  const testingProps = render(<Button {...finalProps} />);

  return { ...testingProps, usedProps: finalProps };
};

describe('<Button />', () => {
  it('renders component without break', () => {
    const { usedProps, getByTestId } = mountComponent();

    expect(getByTestId(usedProps['data-testid'])).toBeTruthy();
  });

  it('triggers sent onClick function', () => {
    const onClick = jest.fn();

    const { usedProps, getByTestId } = mountComponent({ onClick });

    fireEvent.click(getByTestId(usedProps['data-testid']));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
