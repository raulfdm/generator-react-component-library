import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import css from './Button.css';

const Button = ({ className, ...rest }) => {
  return <button className={classnames(css.Button, className)} {...rest} />;
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
