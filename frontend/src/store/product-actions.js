import axios from 'axios';

import {
  getAllProductSclice,
  getSingleProductSlice,
  getTopProductSclice
} from './product-slice';

//fetching products from backend
export const fetchAllProducts = (
  keyword = '',
  pageNumber = '1',
  brands = '',
  category = '',
  availableInStock = '',
  rating = '',
  priceAt = '',
  sort = ''
) => {
  return async (dispatch) => {
    dispatch(getAllProductSclice.actions.padding());

    const fetchData = async () => {
      const { data } = await axios.get(
        `/api/products/?keyword=${keyword}&page=${pageNumber}&brands=${brands}&category=${category}&availableInStock=${availableInStock}&rating=${rating}&priceAt=${priceAt}&sort=${sort}`
      );
      return data;
    };

    try {
      const productsData = await fetchData();
      console.log(productsData);

      dispatch(
        getAllProductSclice.actions.succces({
          products: productsData.products,
          page: productsData.page,
          pages: productsData.pages
        })
      );
    } catch (error) {
      dispatch(
        getAllProductSclice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};

//fetching single product from backend
export const fetchProductById = (id) => {
  return async (dispatch) => {
    dispatch(getSingleProductSlice.actions.padding());

    const fetchData = async () => {
      const { data } = await axios.get(`/api/products/${id}`);

      return data;
    };

    try {
      const product = await fetchData();

      dispatch(
        getSingleProductSlice.actions.succces({
          product
        })
      );
    } catch (error) {
      dispatch(
        getSingleProductSlice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};

//
export const fetchTopProducts = () => {
  return async (dispatch) => {
    dispatch(getTopProductSclice.actions.padding());

    const fetchData = async () => {
      const { data } = await axios.get('/api/top/products');

      return data;
    };

    try {
      const products = await fetchData();

      dispatch(
        getTopProductSclice.actions.succces({
          products
        })
      );
    } catch (error) {
      dispatch(
        getTopProductSclice.actions.fail({
          error:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
      );
    }
  };
};
