import React from 'react';

import EditProductForm from '../components/product edit/EditProductForm';
import Container from '../components/UI/Container';
import styles from './EditProductPage.module.scss';

const EditProductPage = () => {
  return (
    <section id={styles['edit-product-page']}>
      <Container>
        <EditProductForm />
      </Container>
    </section>
  );
};

export default EditProductPage;
