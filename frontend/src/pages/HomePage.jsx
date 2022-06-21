import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';
import styles from './HomePage.module.scss';
import Product from '../components/Product';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { fetchAllProducts } from '../store/product-actions';
import ErrorMessage from '../components/UI/ErrorMessage';
import Container from '../components/UI/Container';
import Category from '../components/filters/Category';
import Heading from '../components/UI/Heading';
import Pagination from '../components/pagination/Pagination';

const HomePage = () => {
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

  const sort = searchParams.get('sort') ? searchParams.get('sort') : '';

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
        priceAt,
        sort
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
    priceAt,
    sort
  ]);

  let filter = false;

  if (keyword || brands || category || availableInStock || rating || priceAt) {
    filter = true;
  }

  return (
    <section>
      <Category />
      <Container>
        <div className={styles.content}>
          {filter && (
            <div className={styles.filter}>
              <Outlet />
            </div>
          )}
          <div className={styles['products-view']}>
            {products.length === 0 && !pending && (
              <Heading>Not found any product</Heading>
            )}
            {products.length > 0 && filter && <Heading>products Found</Heading>}
            {products.length > 0 && !filter && (
              <Heading>Latest products</Heading>
            )}

            {pending ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : (
              <div className={styles.products}>
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
            {!pending && !products.length < 1 && (
              <Pagination page={page} pages={pages} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
