import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Rating from '../Rating';
import ErrorMessage from '../UI/ErrorMessage';
import LineLoader from '../UI/LineLoader';
import Message from '../UI/Message';
import LoadingSpinner from '../UI/LoadingSpinner';

import styles from './Review.module.scss';
import { formatRelativeDate } from '../../utilities';

const Review = () => {
  const params = useParams();

  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [product, setProduct] = useState({});
  const [fetchPending, setFetchpending] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [reviewPending, setReviewPending] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const getProductById = async () => {
    setFetchpending(true);
    try {
      const { data: product } = await axios.get(`/api/products/${params.id}`);

      setFetchError(null);
      setProduct(product);
    } catch (error) {
      setFetchError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setFetchpending(false);
  };

  useEffect(() => {
    getProductById();
  }, []); //eslint-disable-line

  const submitHandler = async (event) => {
    event.preventDefault();

    setReviewPending(true);

    const sendData = async (id) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
        config
      );

      return data;
    };

    try {
      await sendData(params.id);

      setReviewError(null);
      getProductById();
    } catch (error) {
      setReviewError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setReviewPending(false);
    setComment('');
    setRating(0);
  };

  return (
    <div className={styles.review}>
      <div className={styles['review-form']}>
        <h1>Write a review</h1>
        {reviewError && <ErrorMessage>{reviewError}</ErrorMessage>}
        {isLoggedIn ? (
          <form onSubmit={submitHandler}>
            <div className={styles['form-group']}>
              <label>Rating</label>
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="">Select</option>
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
            </div>
            <div className={styles['form-group']}>
              <label>Comment</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>

            <button disabled={reviewPending}>
              {reviewPending ? <LineLoader /> : 'Submit'}
            </button>
          </form>
        ) : (
          <Message>
            Please,{' '}
            <Link className={styles['link-btn']} to="/auth">
              sign in
            </Link>{' '}
            to write a review
          </Message>
        )}
      </div>
      <div className={styles['review-list']}>
        <h1>reviews</h1>
        {product.reviews && product.reviews.length === 0 && (
          <Message>No Reviews</Message>
        )}
        <ul>
          {fetchPending && <LoadingSpinner />}
          {fetchError && <ErrorMessage>{fetchError}</ErrorMessage>}
          {product.reviews &&
            product.reviews.map((review) => (
              <li key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                {/* <span>{review.createdAt.substring(0, 10)}</span> */}
                <span>
                  {formatRelativeDate(new Date(`${review.createdAt}`)) ===
                    'now' && 'Just'}{' '}
                  {formatRelativeDate(new Date(`${review.createdAt}`))}
                </span>
                <p>{review.comment}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Review;
