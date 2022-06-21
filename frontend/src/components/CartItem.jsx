import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../store/cart-slice';
import { formatCurrency } from '../utilities';

import styles from './CartItem.module.scss';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: 1
      })
    );
  };

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeItemByOneFromCart(item.product));
  };

  // const removeFromCartHandler2 = () => {
  //   dispatch(cartActions.removeItemsFromCart(item.product));
  // };

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item_img']}>
        <Link to={`/product/${item.product}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      <div className={styles['cart-item_title']}>
        <Link to={`/product/${item.product}`}>
          <div className={styles.name}>{item.name}</div>
        </Link>
        <div className={styles.qty}>
          <span>&#10006;</span>
          {item.quantity} {item.quantity === 1 ? 'item' : 'items'}
        </div>
      </div>
      <div className={styles['cart-item_price']}>
        {formatCurrency(item.totalPrice, 'USD')}
        <span>({formatCurrency(item.price, 'USD')}/item)</span>
      </div>
      <div className={styles['cart-item_add-and-remove']}>
        <button onClick={removeFromCartHandler}>&#8722;</button>
        <button onClick={addToCartHandler}>&#43;</button>
      </div>
    </div>
  );
};

export default CartItem;
