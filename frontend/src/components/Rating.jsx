import React from 'react';

import styles from './Rating.module.scss';

import { ReactComponent as StarFullIcon } from '../assets/star-full.svg';
import { ReactComponent as StarHalfIcon } from '../assets/star-half.svg';
import { ReactComponent as StarOutlineIcon } from '../assets/star-outline.svg';

const Rating = ({ value, text, fill }) => {
  return (
    <div className={styles.rating}>
      <span>
        {value >= 1 ? (
          <StarFullIcon className={styles['star-icon']} style={{ fill }} />
        ) : value >= 0.5 ? (
          <StarHalfIcon className={styles['star-icon']} style={{ fill }} />
        ) : (
          <StarOutlineIcon className={styles['star-icon']} style={{ fill }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <StarFullIcon className={styles['star-icon']} style={{ fill }} />
        ) : value >= 1.5 ? (
          <StarHalfIcon className={styles['star-icon']} style={{ fill }} />
        ) : (
          <StarOutlineIcon className={styles['star-icon']} style={{ fill }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <StarFullIcon className={styles['star-icon']} style={{ fill }} />
        ) : value >= 2.5 ? (
          <StarHalfIcon className={styles['star-icon']} style={{ fill }} />
        ) : (
          <StarOutlineIcon className={styles['star-icon']} style={{ fill }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <StarFullIcon className={styles['star-icon']} style={{ fill }} />
        ) : value >= 3.5 ? (
          <StarHalfIcon className={styles['star-icon']} style={{ fill }} />
        ) : (
          <StarOutlineIcon className={styles['star-icon']} style={{ fill }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <StarFullIcon className={styles['star-icon']} style={{ fill }} />
        ) : value >= 4.5 ? (
          <StarHalfIcon className={styles['star-icon']} style={{ fill }} />
        ) : (
          <StarOutlineIcon className={styles['star-icon']} style={{ fill }} />
        )}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  fill: '#f8e825'
};

export default Rating;
