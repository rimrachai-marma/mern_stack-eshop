import { Fragment } from 'react';
import styles from './Layout.module.scss';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main id={styles.main}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
