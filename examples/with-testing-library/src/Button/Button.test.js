import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('<Button />', () => {
  it('renders component without break', () => {
    const { getByTestId } = render(<Button data-testid="button" />);

    expect(getByTestId('button')).toMatchInlineSnapshot(`
      <button
        class=""
        data-testid="button"
      />
    `);
  });

  it('triggers sent onClick function', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <Button data-testid="button" onClick={onClick} />,
    );

    fireEvent.click(getByTestId('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
