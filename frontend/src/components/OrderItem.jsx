import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utilities';

import styles from './OrderItem.module.scss';

const OrderItem = ({ item }) => {
  return (
    <div className={styles['order-item']}>
      <div className={styles['order-item_img']}>
        <Link to={`/product/${item.product}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      <div className={styles['order-item_details']}>
        <Link to={`/product/${item.product}`}>
          <div className={styles.name}>{item.name}</div>
        </Link>
        <div className={styles.qty}>
          <span>&#10006;</span>
          {item.quantity} {item.quantity === 1 ? 'item' : 'items'}
        </div>
        <div className={styles.price}>
          {formatCurrency(item.totalPrice, 'USD')}
          <span>({formatCurrency(item.price, 'USD')}/item)</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
