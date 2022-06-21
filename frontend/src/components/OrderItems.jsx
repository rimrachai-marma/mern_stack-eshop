import React from 'react';

import { Link } from 'react-router-dom';

import styles from './OrderItems.module.scss';

import { ReactComponent as CloseIcon } from '../assets/close.svg';

const OrderItems = ({ orders }) => {
  return (
    <div className={styles['table-wraper']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>date</th>
            <th>total</th>
            <th>paid</th>
            <th>Delivered</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <CloseIcon className={styles['icon-close']} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <CloseIcon className={styles['icon-close']} />
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>Detailes</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
