import React from 'react';
import Container from '../components/UI/Container';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <p className={styles['not-found-page']}>Page Not Found!</p>
      </Container>
    </section>
  );
};

export default NotFoundPage;
