import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ className, ...rest }) => {
  return <button className={classnames(styles.Button, className)} {...rest} />;
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
