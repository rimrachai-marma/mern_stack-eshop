import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './Category.module.scss';
import Container from '../UI/Container';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data: categories } = await axios.get(
        '/api/products/all/categories'
      );

      setCategories(categories);
    };
    fetchAllProducts();
  }, []);

  const filter = (category) => {
    if (location.pathname !== '/search') {
      navigate(`search?category=${category}`);
    } else {
      search.set('category', category);
      setSearch(search, {
        replace: true
      });
    }
  };

  return (
    <section id={styles.category}>
      <Container>
        <ul className={styles.category}>
          {categories.map((category, index) => (
            <li key={index}>
              <button onClick={() => filter(category)}>{category}</button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default React.memo(Category);
