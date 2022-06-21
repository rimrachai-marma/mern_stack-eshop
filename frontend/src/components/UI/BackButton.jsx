import React from 'react';
import { Link } from 'react-router-dom';

import styles from './BackButton.module.scss';

const BackButton = (props) => {
  return (
    <Link to={props.to || -1} className={styles.btn}>
      <span>&#8592; </span>
      {props.children || props.content}
    </Link>
  );
};

export default BackButton;
