import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import ProductList from '../components/ProductList';
import Container from '../components/UI/Container';
import ErrorMessage from '../components/UI/ErrorMessage';
import { fetchAllProducts } from '../store/product-actions';

const ProductlistPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const productsData = useSelector((state) => state.productsData);
  const { products, page, pages, error, pending } = productsData;

  const keyword = searchParams.get('keyword')
    ? searchParams.get('keyword')
    : '';

  const pageNumber = searchParams.get('pageNumber')
    ? searchParams.get('pageNumber')
    : 1;

  useEffect(() => {
    dispatch(fetchAllProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <ProductList
            products={products}
            page={page}
            pages={pages}
            pending={pending}
          />
        )}
      </Container>
    </section>
  );
};

export default ProductlistPage;
