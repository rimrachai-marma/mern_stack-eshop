import axios from 'axios';
import React, { useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ProductList.module.scss';

import { ReactComponent as EditIcon } from '../assets/pencil-square.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import ErrorMessage from './UI/ErrorMessage';
import { fetchAllProducts } from '../store/product-actions';
import Pagination from './pagination/Pagination';

const ProductList = ({ products, page, pages, pending }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('keyword')
    ? searchParams.get('keyword')
    : '';

  const pageNumber = searchParams.get('pageNumber')
    ? searchParams.get('pageNumber')
    : 1;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure? You wanna delete!')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch(fetchAllProducts(keyword, pageNumber));
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  };

  const productCreateHandler = async () => {
    setLoading(true);

    const createProduct = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.post('/api/products', {}, config);

      return data;
    };

    try {
      const createdProduct = await createProduct();
      setError(null);
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setLoading(false);
  };

  return (
    <div className={styles['table-wraper']}>
      {error && <ErrorMessage>{error}/</ErrorMessage>}
      <h1>Products</h1>
      <button
        disabled={loading}
        onClick={productCreateHandler}
        className={styles['create-btn']}
      >
        &#43; Create product
      </button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>category</th>
            <th>brand</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <div className={styles['action-btn']}>
                  <button>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <EditIcon className={styles['icon-edit']} />
                    </Link>
                  </button>

                  <button onClick={() => deleteHandler(product._id)}>
                    <DeleteIcon className={styles['icon-delete']} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!pending && !products.length < 1 && (
        <Pagination page={page} pages={pages} />
      )}
    </div>
  );
};

export default ProductList;
