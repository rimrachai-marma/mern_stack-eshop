import React from 'react';
import ShippingForm from '../components/shipping/ShippingForm';
import Container from '../components/UI/Container';

function ShippingPage() {
  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <ShippingForm />
      </Container>
    </section>
  );
}

export default ShippingPage;
