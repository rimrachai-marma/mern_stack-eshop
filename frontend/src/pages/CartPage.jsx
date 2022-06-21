import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import CartItem from '../components/CartItem';
import Container from '../components/UI/Container';
import Heading from '../components/UI/Heading';
import Message from '../components/UI/Message';
import { formatCurrency } from '../utilities';

import styles from './CartPage.module.scss';

const CartPage = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { items, totalAmount } = cart;

  const cartItem = items.map((item, id) => <CartItem key={id} item={item} />);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <section id={styles['cart-page']}>
      <Container>
        <div className={styles.cart}>
          <div className={styles.cart_detailes}>
            <Heading>Shoping cart</Heading>
            {items.length === 0 ? (
              <Message>
                Your cart is empty!{' '}
                <Link className={styles['back-btn']} to="/">
                  &#8592;back to homepage
                </Link>
              </Message>
            ) : (
              cartItem
            )}
          </div>

          <div className={styles.cart_action}>
            <div className={styles.checkout}>
              <h3>total price</h3>
              <h1>{formatCurrency(totalAmount, 'USD')}</h1>
            </div>
            <button
              onClick={checkoutHandler}
              disabled={items.length === 0}
              className={styles.checkout_btn}
            >
              Checkout
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CartPage;
