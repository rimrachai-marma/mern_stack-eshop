import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import OrderItem from '../components/OrderItem';
import ErrorMessage from '../components/UI/ErrorMessage';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Message from '../components/UI/Message';
import { getUserDetails } from '../store/user-actions';
import { formatCurrency, round } from '../utilities';

import styles from './PlaceOrderPage.module.scss';
import LineLoader from '../components/UI/LineLoader';
import Container from '../components/UI/Container';

function PlaceOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, pending } = userDetails;

  const shippingAddress = useSelector((state) => state.shippingAndPaymentinfo);

  if (!isLoggedIn) {
    navigate('/auth');
  }

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails());
    }
  }, [dispatch, user]);

  const cart = useSelector((state) => state.cart);
  const { items, totalAmount } = cart;

  //order summury
  const shippingPrice = 0;

  const tax = 0;
  const taxPrice = round(
    items.reduce((acc, item) => acc + item.price * tax * item.quantity, 0),
    2
  );

  const totalPayable = round(totalAmount + shippingPrice + taxPrice, 2);

  //handler
  const orderHandler = async () => {
    setLoading(true);

    const createOrder = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.items,
          shippingAddress,
          itemsPrice: totalAmount,
          taxPrice,
          shippingPrice,
          totalPrice: totalPayable
        },
        config
      );

      return data;
    };

    try {
      const order = await createOrder();
      navigate(`/order/${order._id}`);

      setError(null);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setLoading(false);
  };

  //element
  const orderItem = items.map((item, id) => <OrderItem key={id} item={item} />);

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <div className={styles['order-detaile']}>
          <div className={styles.detailes}>
            <div className={styles['order-detaile-group']}>
              <h1>shipping to</h1>

              {pending ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div>
                    <span>Name: </span>
                    {user.name}
                  </div>

                  <div>
                    <span>Email: </span>
                    {user.email}
                  </div>

                  <div>
                    <span>Address: </span>
                    {shippingAddress.address}, {shippingAddress.city},{' '}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </div>
                </>
              )}
            </div>
            <div className={styles['order-detaile-group']}>
              <h1>order items</h1>
              {cart.pending ? (
                <LoadingSpinner />
              ) : items.length === 0 ? (
                <Message>
                  Your cart is empty!{' '}
                  <Link className={styles['back-btn']} to="/">
                    &#8592;back to homepage
                  </Link>
                </Message>
              ) : (
                orderItem
              )}
            </div>
          </div>

          <div className={styles.action}>
            <div className={styles.summary}>
              <h1>order summary</h1>
              <ul>
                <li>
                  <label>subtotal</label>
                  <span>{formatCurrency(totalAmount, 'USD')}</span>
                </li>
                <li>
                  <label>shipping</label>
                  <span>{formatCurrency(shippingPrice, 'USD')}</span>
                </li>
                <li>
                  <label>tax</label>
                  <span>{formatCurrency(taxPrice, 'USD')}</span>
                </li>
                <li>
                  <label>total</label>
                  <span>{formatCurrency(totalPayable, 'USD')}</span>
                </li>
              </ul>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <button
              className={styles['order-btn']}
              onClick={orderHandler}
              disabled={items.length === 0 || loading}
            >
              {loading ? <LineLoader /> : 'order'}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PlaceOrderPage;
