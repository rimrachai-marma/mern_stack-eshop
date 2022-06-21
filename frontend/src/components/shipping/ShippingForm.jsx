import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { isNotEmpty } from '../../utilities';
import Heading from '../UI/Heading';
import FormInput from './FormInput';
import CheckoutStep from '../CheckoutStep';
import { shippingAndPaymentActions } from '../../store/shippingAndPayment-slice';

import styles from './ShippingForm.module.scss';

function ShippingForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingAddress = useSelector((state) => state.shippingAndPaymentinfo);

  const [enteredShippingAddressInfo, setEnteredShippingAddressInfo] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || ''
  });
  const [shippingAddressInfoToutched, setShippingAddressInfoToutched] =
    useState({
      address: false,
      city: false,
      postalCode: false,
      country: false
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnteredShippingAddressInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    setShippingAddressInfoToutched((prevValue) => {
      return {
        ...prevValue,
        [name]: true
      };
    });
  };

  ///validation
  const enteredAddressIsValied = isNotEmpty(enteredShippingAddressInfo.address);
  const addressInputIsInvalied =
    !enteredAddressIsValied && shippingAddressInfoToutched.address;

  const enteredCityIsValied = isNotEmpty(enteredShippingAddressInfo.city);
  const cityInputIsInvalied =
    !enteredCityIsValied && shippingAddressInfoToutched.city;

  const enteredPostalCodeIsValied = isNotEmpty(
    enteredShippingAddressInfo.postalCode
  );

  const postalCodeInputIsInvalied =
    !enteredPostalCodeIsValied && shippingAddressInfoToutched.postalCode;

  const enteredCountryIsValied = isNotEmpty(enteredShippingAddressInfo.country);
  const countryInputIsInvalied =
    !enteredCountryIsValied && shippingAddressInfoToutched.country;

  let formIsValid = false;
  if (
    enteredAddressIsValied &&
    enteredCityIsValied &&
    enteredPostalCodeIsValied &&
    enteredCountryIsValied
  ) {
    formIsValid = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      shippingAndPaymentActions.addShippingAddress({
        address: enteredShippingAddressInfo.address,
        city: enteredShippingAddressInfo.city,
        postalCode: enteredShippingAddressInfo.postalCode,
        country: enteredShippingAddressInfo.country
      })
    );

    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        address: enteredShippingAddressInfo.address,
        city: enteredShippingAddressInfo.city,
        postalCode: enteredShippingAddressInfo.postalCode,
        country: enteredShippingAddressInfo.country
      })
    );

    setEnteredShippingAddressInfo({
      address: '',
      city: '',
      postalCode: '',
      country: ''
    });
    setShippingAddressInfoToutched({
      address: false,
      city: false,
      postalCode: false,
      country: false
    });

    navigate('/placeorder');
  };

  return (
    <div className={styles['shipping-form']}>
      <CheckoutStep />
      <Heading>shipping</Heading>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="address"
          label="address"
          id="address"
          htmlFor="address"
          type="text"
          placeholder="address"
          value={enteredShippingAddressInfo.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={addressInputIsInvalied}
          errorMassage="Address must not be empty!"
        />
        <FormInput
          name="city"
          label="city"
          id="city"
          htmlFor="city"
          type="text"
          placeholder="city"
          value={enteredShippingAddressInfo.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={cityInputIsInvalied}
          errorMassage="City must not be empty!"
        />
        <FormInput
          name="postalCode"
          label="postal code"
          id="postalCode"
          htmlFor="postalCode"
          type="number"
          placeholder="postal code"
          value={enteredShippingAddressInfo.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={postalCodeInputIsInvalied}
          errorMassage="Postal code must not be empty!"
        />
        <FormInput
          name="country"
          label="country"
          id="country"
          htmlFor="country"
          type="text"
          placeholder="country"
          value={enteredShippingAddressInfo.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={countryInputIsInvalied}
          errorMassage="Country must not be empty!"
        />

        <button disabled={!formIsValid}>Continue</button>
      </form>
    </div>
  );
}

export default ShippingForm;
