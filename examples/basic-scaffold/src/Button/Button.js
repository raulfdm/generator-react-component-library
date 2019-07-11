import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = props => {
  return <button {...props} />;
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
