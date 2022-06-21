import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as CartIcon } from '../assets/cart-store.svg';
import { cartActions } from '../store/cart-slice';
import { formatCurrency } from '../utilities';

import styles from './Product.module.scss';
import Rating from './Rating';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1
      })
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles['card-header']}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className={styles['card-body']}>
        <Link to={`/product/${product._id}`}>
          <div className={styles['card-title']}>
            {product.name.substring(0, 45)}
          </div>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
      <div className={styles['card-footer']}>
        <span className={styles['card-amount']}>
          {formatCurrency(product.price, 'USD')}
        </span>
        <button
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          className={styles['btn']}
        >
          <span className={styles['text']}>Add to cart</span>
          <span className={styles['icon']}>
            <CartIcon className={styles['cart-icon']} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Product;
