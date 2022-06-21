import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import FormInput from './FormInput';
import styles from './AuthForm.module.scss';
import {
  checkPassword,
  isEmail,
  isNotEmpty,
  matchTwoValues
} from '../utilities';
import { login, register } from '../store/auth-actions';
import ErrorMessage from './UI/ErrorMessage';
import LineLoader from './UI/LineLoader';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const origin = location.search?.split('=')[1] ?? '/';
  const origin = location.state?.from ?? '/';

  const authUi = useSelector((state) => state.authUi);

  const token = useSelector((state) => state.auth.token);

  const isLoggedIn = !!token;

  const { loginError, signUpError, pending } = authUi;

  const [enteredUserInfo, setEnteredUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [userInfoToutched, setUserInfoToutched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const [isLogin, setIsLogin] = useState(true);

  ///validation
  const enteredNameIsValied = isNotEmpty(enteredUserInfo.name);
  const nameInputIsInvalied = !enteredNameIsValied && userInfoToutched.name;

  const enteredEmailIsValied = isEmail(enteredUserInfo.email);
  const emailInputIsInvalied = !enteredEmailIsValied && userInfoToutched.email;

  const enteredPasswordIsValied = checkPassword(enteredUserInfo.password);
  const passwordInputIsInvalied =
    !enteredPasswordIsValied && userInfoToutched.password;

  const enteredPasswordIsNotEmpty = isNotEmpty(enteredUserInfo.password);
  const passwordInputIsInvaliedAsEmpty =
    !enteredPasswordIsNotEmpty && userInfoToutched.password;

  const enteredConfirmPasswordIsValied = matchTwoValues(
    enteredUserInfo.password,
    enteredUserInfo.confirmPassword
  );
  const confirmPasswordInputIsInvalied =
    !enteredConfirmPasswordIsValied && userInfoToutched.confirmPassword;

  let formIsValid = false;

  if (isLogin) {
    if (enteredEmailIsValied && enteredPasswordIsNotEmpty) {
      formIsValid = true;
    }
  }
  if (!isLogin) {
    if (
      enteredNameIsValied &&
      enteredEmailIsValied &&
      enteredPasswordIsValied &&
      enteredConfirmPasswordIsValied
    ) {
      formIsValid = true;
    }
  }

  //handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEnteredUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    setUserInfoToutched((prevValue) => {
      return {
        ...prevValue,
        [name]: true
      };
    });
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (isLogin) {
      dispatch(login(enteredUserInfo.email, enteredUserInfo.password));
    } else {
      dispatch(
        register(
          enteredUserInfo.name,
          enteredUserInfo.email,
          enteredUserInfo.password
        )
      );
    }

    setEnteredUserInfo({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setUserInfoToutched({
      name: false,
      email: false,
      password: false,
      confirmPassword: false
    });
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setEnteredUserInfo({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setUserInfoToutched({
      name: false,
      email: false,
      password: false,
      confirmPassword: false
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(origin, { replace: true });
    }
  }, [isLoggedIn, navigate, origin]);

  return (
    <div className={styles['auth-form']}>
      <div className={styles.heading}>{isLogin ? 'Login' : 'Sign Up'} </div>

      {isLogin && loginError && (
        <div className={styles.error}>
          <ErrorMessage>{loginError}</ErrorMessage>
        </div>
      )}

      {!isLogin && signUpError && (
        <div className={styles.error}>
          <ErrorMessage>{signUpError}</ErrorMessage>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <FormInput
            name="name"
            id="name"
            type="text"
            label="Name"
            placeholder="Name"
            value={enteredUserInfo.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={nameInputIsInvalied}
            errorMassage="Name must not be empty!"
          />
        )}
        <FormInput
          name="email"
          id="email"
          type="email"
          label="Email"
          placeholder="Email"
          value={enteredUserInfo.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={emailInputIsInvalied}
          errorMassage="Please enter a valid email address!"
        />
        <FormInput
          name="password"
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          value={enteredUserInfo.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={
            isLogin ? passwordInputIsInvaliedAsEmpty : passwordInputIsInvalied
          }
          errorMassage={
            passwordInputIsInvaliedAsEmpty
              ? 'Please enter password'
              : passwordInputIsInvalied
              ? 'Password must be at least a lowecase, an uppercase, a numeric value and a special character!'
              : ''
          }
        />
        {!isLogin && (
          <FormInput
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={enteredUserInfo.confirmPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={confirmPasswordInputIsInvalied}
            errorMassage="Password must be match!"
          />
        )}
        <button disabled={!formIsValid} className={styles.btn}>
          {isLogin && !pending ? 'Login' : pending ? <LineLoader /> : 'Sign Up'}
        </button>
      </form>

      <div className={styles.toggle}>
        {isLogin ? 'New Customer?' : 'Have an account?'}{' '}
        <button onClick={switchAuthModeHandler}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
