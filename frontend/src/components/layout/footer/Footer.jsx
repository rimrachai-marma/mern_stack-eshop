import React from 'react';

import Container from '../../UI/Container';
import styles from './Footer.module.scss';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id={styles.footer}>
      <Container>
        <p className={styles.footer}>
          Copyright &copy; eShop, {currentYear}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
