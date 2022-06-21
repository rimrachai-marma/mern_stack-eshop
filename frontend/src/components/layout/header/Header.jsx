import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as CartStoreIcon } from '../../../assets/cart-store.svg';
import { ReactComponent as UserIcon } from '../../../assets/user-circle.svg';

import Container from '../../UI/Container';
import styles from './Header.module.scss';
import Userprofile from './Userprofile';
import AdminProfile from './AdminProfile';
import Search from './Search';

function Header() {
  const cartTotalQty = useSelector((state) => state.cart.totalQuantity);
  const [cartIsHighlighted, setCartIsHighlighted] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userInfo);

  const isLoggedIn = !!token;

  useEffect(() => {
    if (cartTotalQty === 0) {
      return;
    }
    setCartIsHighlighted(true);

    const timer = setTimeout(() => {
      setCartIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartTotalQty]);

  const cartIconGroupClasses = `${styles['cart-icon-group']} ${
    cartIsHighlighted ? styles.bump : ''
  }`;

  return (
    <header id={styles.header}>
      <Container>
        <div className={styles.header}>
          <NavLink replace to="/">
            <img src="/images/logo.png" alt="logo" className={styles.logo} />
          </NavLink>
          <Search />
          <nav className={styles['user-nav']}>
            <NavLink to="/cart" className={styles.cart}>
              <div className={cartIconGroupClasses}>
                <CartStoreIcon className={styles['cart-icon']} />
                <span className={styles['cart-quantity']}>{cartTotalQty}</span>
              </div>
            </NavLink>
            {isLoggedIn && user.isAdmin && <AdminProfile />}

            {isLoggedIn && <Userprofile />}
            {!isLoggedIn && (
              <NavLink to="/auth" className={styles.login}>
                <UserIcon className={styles['user-icon']} />
                <span>Sign in</span>
              </NavLink>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Header;
