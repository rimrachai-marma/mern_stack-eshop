import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, payOrder } from '../../store/order-action';

import LoadingSpinner from '../UI/LoadingSpinner';

const ButtonWrapper = () => {
  const dispatch = useDispatch();

  const [{ isPending }] = usePayPalScriptReducer();
  const { order } = useSelector((state) => state.orderDetailes);
  const { orderItems, _id } = order;

  const createOrder = async () => {
    try {
      const { data } = await axios.post(
        '/api/payment/paypal',
        { orderItems },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { id } = data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();

    dispatch(
      payOrder(_id, {
        paymentMethod: 'PayPal',
        id: details.id,
        status: details.status,
        update_time: details.update_time,
        name: `${details.payer.name.given_name} ${details.payer.name.surname}`,
        email_address: details.payer.email_address
      })
    );
    dispatch(getOrderById(_id));
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </>
  );
};

const PayPal = () => {
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    const fetchClienId = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      setClientId(clientId);
    };
    fetchClienId();
  }, []);

  const options = {
    'client-id': clientId
  };

  return clientId ? (
    <PayPalScriptProvider options={options}>
      <ButtonWrapper />
    </PayPalScriptProvider>
  ) : (
    <LoadingSpinner />
  );
};

export default PayPal;
