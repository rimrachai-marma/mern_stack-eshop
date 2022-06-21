import React from 'react';
import AuthForm from '../components/AuthForm';
import Container from '../components/UI/Container';

import styles from './AuthPage.module.scss';

const AuthPage = () => {
  return (
    <section id={styles['auth-page']}>
      <Container>
        <div className={styles.auth}>
          <AuthForm />
        </div>
      </Container>
    </section>
  );
};

export default AuthPage;
