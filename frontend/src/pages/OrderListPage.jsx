import React, { useEffect } from 'react';

import Heading from '../components/UI/Heading';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import OrderList from '../components/OrderList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../store/order-action';
import ErrorMessage from '../components/UI/ErrorMessage';
import Container from '../components/UI/Container';

const OrderListPage = () => {
  const dispatch = useDispatch();

  const { orders, pending, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]); //eslint-disable-line

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <Heading>orders</Heading>
        {pending ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <OrderList orders={orders} />
        )}
      </Container>
    </section>
  );
};

export default OrderListPage;
