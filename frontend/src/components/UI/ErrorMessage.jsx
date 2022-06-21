import React from 'react';

import styles from './ErrorMessage.module.scss';

const ErrorMessage = (props) => {
  return <div className={styles.error}>{props.children}</div>;
};

export default ErrorMessage;
