import React, { useState } from 'react';
import LineLoader from '../UI/LineLoader';

import styles from './Stripe.module.scss';

function Stripe({ items }) {
  const [pending, setPending] = useState(false);
  const handlePay = () => {
    setPending(true);

    fetch('/api/payment/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items
      })
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((error) => {
        console.error(error.message);
      });

    setPending(true);
  };

  return (
    <button disabled={pending} onClick={handlePay} className={styles.btn}>
      {pending ? <LineLoader /> : 'Pay with Stripe'}
    </button>
  );
}

export default Stripe;
