import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';
import { ReactComponent as NextIcon } from '../../assets/cheveron-right.svg';
import { ReactComponent as PreviousIcon } from '../../assets/cheveron-left.svg';

const Pagination = ({ page, pages }) => {
  const [search, setSearch] = useSearchParams();

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 1) {
      search.delete('pageNumber');
      setSearch(search, {
        replace: true
      });
    } else {
      search.set('pageNumber', pageNumber);
      setSearch(search, {
        replace: true
      });
    }
  };

  ///
  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => handlePageChange(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => handlePageChange(startValue + idx + 1)}
          >
            {startValue + idx + 1}
          </button>
        ))}

        <strong>...</strong>

        <button onClick={() => handlePageChange(pages)}>{pages}</button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>

            <strong>...</strong>

            <button onClick={() => handlePageChange(startValue)}>
              {startValue}
            </button>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => handlePageChange(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}

            <strong>...</strong>

            <button onClick={() => handlePageChange(pages)}>{pages}</button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>

            <strong>...</strong>

            <button onClick={() => handlePageChange(startValue)}>
              {startValue}
            </button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: 'none' } : null
                }
                onClick={() => handlePageChange(startValue + idx + 1)}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <PreviousIcon />
          <span>previous</span>
        </button>

        {middlePagination}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
        >
          <span>next</span>
          <NextIcon />
        </button>
      </div>
    )
  );
};

export default Pagination;
