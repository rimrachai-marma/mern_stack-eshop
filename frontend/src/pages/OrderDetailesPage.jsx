import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderItem from '../components/OrderItem';
import PayPal from '../components/payment/PayPal';
import Stripe from '../components/payment/Stripe';
import Container from '../components/UI/Container';
import ErrorMessage from '../components/UI/ErrorMessage';
import LineLoader from '../components/UI/LineLoader';
import Message from '../components/UI/Message';
import { getOrderById } from '../store/order-action';
import { orderDetailesSlice } from '../store/order-slice';
import { formatCurrency, round } from '../utilities';

import styles from './OrderDetailesPage.module.scss';

function OrderDetailesPage() {
  const dispatch = useDispatch();
  const params = useParams();

  const [updateDeliverLoading, setUpdateDeliverLoading] = useState(false);
  const [updateDeliverError, setUpdateDeliverError] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const user = useSelector((state) => state.auth.userInfo);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getOrderById(params.id));

    return () => {
      dispatch(orderDetailesSlice.actions.rest());
    };
  }, [params.id, dispatch]);

  const { order, error } = useSelector((state) => state.orderDetailes);

  // calculating price
  const totalAmount = order.orderItems
    ? round(
        order.orderItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        2
      )
    : 0;

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const markDeliverHandler = async (id) => {
    setUpdateDeliverLoading(true);

    const updateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        `/api/orders/${id}/deliver`,
        {},
        config
      );

      return data;
    };

    try {
      await updateData();

      dispatch(getOrderById(params.id));

      setUpdateDeliverError(null);
    } catch (error) {
      setUpdateDeliverError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setUpdateDeliverLoading(false);
  };

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <div className={styles['order-detaile']}>
            <div className={styles.detailes}>
              <h1 className={styles.order_id}>
                <span>Order id: </span>
                {order._id}
              </h1>
              <div className={styles['order-detaile-group']}>
                <h1>shipping to</h1>
                <div className={styles.address}>
                  <span>Name: </span>
                  {order.user && order.user.name}
                </div>

                <div className={styles.address}>
                  <span>Email: </span>

                  {order.user && (
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  )}
                </div>

                <div className={styles.address}>
                  <span>Address: </span>
                  {order.shippingAddress && order.shippingAddress.address},{' '}
                  {order.shippingAddress && order.shippingAddress.city},{' '}
                  {order.shippingAddress && order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress && order.shippingAddress.country}
                </div>

                {!order.isDelivered && (
                  <ErrorMessage>Not Delivered</ErrorMessage>
                )}
                {order.isDelivered && <Message>Delivered</Message>}
              </div>
              <div className={styles['order-detaile-group']}>
                <h1>payment</h1>

                {!order.isPaid && <ErrorMessage>Not Paid</ErrorMessage>}
                {order.isPaid && (
                  <Message>
                    Paid with {order.paymentMethod} on{' '}
                    {order.paidAt.substring(0, 10)}
                  </Message>
                )}
              </div>
              <div className={styles['order-detaile-group']}>
                <h1>order items</h1>
                {order.orderItems &&
                  order.orderItems.map((item, id) => (
                    <OrderItem key={id} item={item} />
                  ))}
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
                    <span>
                      {formatCurrency(
                        order.shippingPrice ? order.shippingPrice : 0,
                        'USD'
                      )}
                    </span>
                  </li>
                  <li>
                    <label>tax</label>
                    <span>
                      {formatCurrency(
                        order.taxPrice ? order.taxPrice : 0,
                        'USD'
                      )}
                    </span>
                  </li>
                  <li>
                    <label>total</label>
                    <span>
                      {formatCurrency(
                        order.totalPrice ? order.totalPrice : 0,
                        'USD'
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              {updateDeliverError && (
                <ErrorMessage>{updateDeliverError}</ErrorMessage>
              )}

              {/* Payment module */}
              {!order.isPaid && (
                <>
                  <fieldset className={styles['payment-method']}>
                    <legend>Select payment method</legend>
                    <div className={styles['radio-btn-group']}>
                      <label>
                        <input
                          type="radio"
                          name="payment_method"
                          value="paypal"
                          onChange={handleChange}
                          checked={paymentMethod === 'paypal'}
                        />
                        PayPal
                      </label>

                      <label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="payment_method"
                          value="stripe"
                        />
                        Stripe
                      </label>
                    </div>
                  </fieldset>

                  {order.orderItems && paymentMethod === 'paypal' && (
                    <PayPal items={order.orderItems} />
                  )}
                  {order.orderItems && paymentMethod === 'stripe' && (
                    <Stripe items={order.orderItems} />
                  )}
                </>
              )}

              {/* Mark as Delivered Button */}
              {user.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  onClick={() => markDeliverHandler(params.id)}
                  className={styles.btn}
                >
                  {updateDeliverLoading ? <LineLoader /> : 'Mark As Delivered'}
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default OrderDetailesPage;
