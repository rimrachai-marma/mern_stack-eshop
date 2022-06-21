import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import styles from './SearchPage.module.scss';
import Product from '../components/Product';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { fetchAllProducts } from '../store/product-actions';
import ErrorMessage from '../components/UI/ErrorMessage';
import Pagination from '../components/Pagination';
import Container from '../components/UI/Container';
import Category from '../components/filters/Category';
import Filters from '../components/filters/Filters';
import Heading from '../components/UI/Heading';

const SearchPage = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword')
    ? searchParams.get('keyword')
    : '';

  const pageNumber = searchParams.get('pageNumber')
    ? searchParams.get('pageNumber')
    : 1;

  const category = searchParams.get('category')
    ? searchParams.get('category')
    : '';

  const brands = searchParams.get('brands') ? searchParams.get('brands') : '';
  const availableInStock = searchParams.get('availableInStock')
    ? searchParams.get('availableInStock')
    : '';
  const rating = searchParams.get('rating') ? searchParams.get('rating') : '';
  const priceAt = searchParams.get('priceAt')
    ? searchParams.get('priceAt')
    : '';

  const productsData = useSelector((state) => state.productsData);
  const { products, pages, page, error, pending } = productsData;

  useEffect(() => {
    dispatch(
      fetchAllProducts(
        keyword,
        pageNumber,
        brands,
        category,
        availableInStock,
        rating,
        priceAt
      )
    );
  }, [
    dispatch,
    keyword,
    pageNumber,
    brands,
    category,
    availableInStock,
    rating,
    priceAt
  ]);

  return (
    <section>
      <Category />
      <Container>
        <div className={styles.content}>
          <div className={styles.filter}>
            <Filters />
          </div>
          <div className={styles['products-view']}>
            {pending ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : (
              <div className={styles.products}>
                {products.length === 0 && (
                  <Heading>Not found any product</Heading>
                )}
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
            {!pending && !products.length === 0 && (
              <Pagination page={page} pages={pages} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SearchPage;
