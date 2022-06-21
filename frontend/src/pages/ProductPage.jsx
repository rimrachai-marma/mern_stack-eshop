import React, { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as CartIcon } from '../assets/cart-store.svg';

import styles from './ProductPage.module.scss';
import BackButton from '../components/UI/BackButton';
import Rating from '../components/Rating';
import { fetchProductById } from '../store/product-actions';
import ErrorMessage from '../components/UI/ErrorMessage';
import { cartActions } from '../store/cart-slice';
import { formatCurrency } from '../utilities';
import Container from '../components/UI/Container';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Meta from '../components/Meta';

const ProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { product, pending, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(params.id));
  }, [params.id, dispatch]);

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: qty
      })
    );
  };

  return (
    <>
      <Meta title={product?.name} description={product?.description} />
      <section style={{ paddingTop: '2rem' }}>
        <Container>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <BackButton>Go back</BackButton>
          <div className={styles.product__details}>
            <div className={styles.image}>
              {pending ? (
                <LoadingSpinner />
              ) : (
                <img src={product.image} alt={product.name} />
              )}
            </div>
            <div className={styles.details}>
              <h2 className={styles.details_title}>{product.name}</h2>
              <Rating
                className={styles.details_rating}
                value={product.rating}
                text={`(${product.numReviews} reviews)`}
              />
              <p className={styles.details_availability}>
                Availability &#40;
                <strong>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </strong>
                &#41;
              </p>
              {product.countInStock > 0 && product.countInStock <= 3 && (
                <span>
                  Only {product.countInStock} left in stock order soon.
                </span>
              )}
              <h3 className={styles.details_price}>
                {formatCurrency(product?.price ?? 0, 'USD')}
              </h3>
              <p className={styles.details_description}>
                <span>Description: </span>
                {product.description}
              </p>

              <div className={styles['details_add-to-cart']}>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  disabled={product.countInStock === 0}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

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
          </div>
        </Container>
      </section>
      <section style={{ paddingBottom: '2rem' }}>
        <Container>
          <Link className={styles.btn_inline} to="review">
            See reviews <span>&rarr;</span>
          </Link>
          <Outlet />
        </Container>
      </section>
    </>
  );
};
export default ProductPage;
