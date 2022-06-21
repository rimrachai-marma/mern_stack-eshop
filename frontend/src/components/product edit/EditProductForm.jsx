import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './EditProductForm.module.scss';

import FormInput from './FormInput';
import Heading from '../UI/Heading';
import { isNotEmpty } from '../../utilities';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../UI/ErrorMessage';
import LineLoader from '../UI/LineLoader';

const EditProductForm = () => {
  const navigate = useNavigate();

  const params = useParams();

  const token = useSelector((state) => state.auth.token);

  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [updatePending, setUpdatePending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const [enteredProdctInfo, setEnteredProdctInfo] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    countInStock: 0,
    category: '',
    description: ''
  });

  const [productInfoToutched, setProductInfoToutched] = useState({
    name: false,
    price: false,
    image: false,
    brand: false,
    countInStock: false,
    category: false,
    description: false
  });

  useEffect(() => {
    const fetchProductdata = async (id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data: product } = await axios.get(
          `/api/products/${id}`,
          config
        );

        setEnteredProdctInfo({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          countInStock: product.countInStock,
          category: product.category,
          description: product.description
        });
      } catch (error) {
        setFetchError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };

    fetchProductdata(params.id);
  }, [params.id]); //eslint-disable-line

  //handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnteredProdctInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    setProductInfoToutched((prevValue) => {
      return {
        ...prevValue,
        [name]: true
      };
    });
  };

  ///validation logic
  const enteredNameIsValied = isNotEmpty(enteredProdctInfo.name);
  const nameInputIsInvalied = !enteredNameIsValied && productInfoToutched.name;

  const enteredPriceIsValied =
    isNotEmpty(enteredProdctInfo.price) && enteredProdctInfo.price >= 0;
  const priceInputIsInvalied =
    !enteredPriceIsValied && productInfoToutched.price;

  const enteredImageIsValied = isNotEmpty(enteredProdctInfo.image);
  const imageInputIsInvalied =
    !enteredImageIsValied && productInfoToutched.image;

  const enteredBrandIsValied = isNotEmpty(enteredProdctInfo.brand);
  const brandInputIsInvalied =
    !enteredBrandIsValied && productInfoToutched.brand;

  const enteredStockIsValied =
    isNotEmpty(enteredProdctInfo.countInStock) &&
    enteredProdctInfo.countInStock >= 0;
  const stockInputIsInvalied =
    !enteredStockIsValied && productInfoToutched.countInStock;

  const enteredCategoryIsValied = isNotEmpty(enteredProdctInfo.category);
  const categoryInputIsInvalied =
    !enteredCategoryIsValied && productInfoToutched.category;

  const enteredDescriptionIsValied = isNotEmpty(enteredProdctInfo.description);
  const descriptionInputIsInvalied =
    !enteredDescriptionIsValied && productInfoToutched.description;

  let formIsValid = false;
  if (
    enteredNameIsValied &&
    enteredPriceIsValied &&
    enteredImageIsValied &&
    enteredBrandIsValied &&
    enteredStockIsValied &&
    enteredCategoryIsValied &&
    enteredDescriptionIsValied
  ) {
    formIsValid = true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUpdatePending(true);

    const updateProduct = async (id) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        `/api/products/${id}`,
        enteredProdctInfo,
        config
      );

      return data;
    };

    try {
      await updateProduct(params.id);

      setUpdateError(null);
      navigate('/admin/products');
    } catch (error) {
      setUpdateError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setUpdatePending(false);
  };

  // FILE UPLOAD
  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data: imgUrl } = await axios.post(
        '/api/upload/image',
        formData,
        config
      );

      setEnteredProdctInfo((prevValue) => {
        return {
          ...prevValue,
          image: imgUrl
        };
      });
      setUploadError(null);
    } catch (error) {
      setUploadError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setUploading(false);
  };

  return (
    <div className={styles.form}>
      <Heading>Edit your product</Heading>
      {fetchError && <ErrorMessage>{fetchError}</ErrorMessage>}
      {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormInput
          name="name"
          label="name"
          id="name"
          htmlFor="name"
          type="text"
          placeholder="name"
          value={enteredProdctInfo.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={nameInputIsInvalied}
          errorMassage="Name must not be empty!"
        />
        <FormInput
          name="price"
          label="price"
          id="price"
          htmlFor="price"
          type="number"
          placeholder="price"
          value={enteredProdctInfo.price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={priceInputIsInvalied}
          errorMassage="Price must not be empty and negative value!"
        />
        <FormInput
          name="image"
          label="image"
          id="image"
          htmlFor="image"
          type="text"
          placeholder="image"
          value={enteredProdctInfo.image}
          disabled={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={imageInputIsInvalied}
          errorMassage="Image code must not be empty!"
        />
        <FormInput
          name="imageUpload"
          label="upload image"
          id="imageUpload"
          htmlFor="imageUpload"
          type="file"
          placeholder="image"
          onChange={uploadFileHandler}
          error={uploadError}
          errorMassage={uploadError}
          loading={uploading}
        />
        <FormInput
          name="brand"
          label="brand"
          id="brand"
          htmlFor="brand"
          type="text"
          placeholder="brand"
          value={enteredProdctInfo.brand}
          onChange={handleChange}
          onBlur={handleBlur}
          error={brandInputIsInvalied}
          errorMassage="Brand must not be empty!"
        />
        <FormInput
          name="countInStock"
          label="Count in Stock"
          id="countInStock"
          htmlFor="countInStock"
          type="number"
          placeholder="Count in Stock"
          value={enteredProdctInfo.countInStock}
          onChange={handleChange}
          onBlur={handleBlur}
          error={stockInputIsInvalied}
          errorMassage="Stock must not be empty and negative value!"
        />
        <FormInput
          name="category"
          label="category"
          id="category"
          htmlFor="category"
          type="text"
          placeholder="category"
          value={enteredProdctInfo.category}
          onChange={handleChange}
          onBlur={handleBlur}
          error={categoryInputIsInvalied}
          errorMassage="Category must not be empty!"
        />
        <FormInput
          name="description"
          label="description"
          id="description"
          htmlFor="description"
          type="text"
          textarea={true}
          rows={4}
          placeholder="description"
          value={enteredProdctInfo.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={descriptionInputIsInvalied}
          errorMassage="Description must not be empty!"
        />

        <button disabled={!formIsValid}>
          {updatePending ? <LineLoader /> : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
