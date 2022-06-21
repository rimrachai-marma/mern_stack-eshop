import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderItems from '../components/OrderItems';
import Container from '../components/UI/Container';
import ErrorMessage from '../components/UI/ErrorMessage';
import Heading from '../components/UI/Heading';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getMyOrders } from '../store/order-action';

const MyOrdersPage = () => {
  const dispatch = useDispatch();

  const { orders, pending, error } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <Heading>My Orders</Heading>
        {pending ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <OrderItems orders={orders} />
        )}
      </Container>
    </section>
  );
};

export default MyOrdersPage;
