import React from 'react';

import styles from './Heading.module.scss';

const Heading = ({ children }) => {
  return <h1 className={styles.heading}>{children}</h1>;
};

export default Heading;
