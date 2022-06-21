import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './EditProfile.module.scss';
import ErrorMessage from './UI/ErrorMessage';
import { getUserDetails } from '../store/user-actions';
import LineLoader from './UI/LineLoader';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [message, setMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    gender: ''
  });

  const [avatarDeletePending, setAvatarDeletePending] = useState(false);
  const [avatarDeleteError, setAvatarDeleteError] = useState(null);

  const [file, setFile] = useState(null);

  const [enteredUserInfo, setEnteredUserInfo] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const [updatePending, setUpdatePending] = useState({
    name: false,
    email: false,
    gender: false,
    password: false,
    avater: false
  });
  const [updateError, setUpdateError] = useState({
    name: null,
    email: null,
    gender: null,
    password: null,
    avater: null
  });

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails());
    } else {
      setUserInfo({
        name: user.name,
        email: user.email,
        gender: user.gender
      });
    }
  }, [dispatch, navigate, user]);

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

  //Submit handler
  const nameChangeHandler = async (event) => {
    event.preventDefault();

    setUpdatePending({ name: true });

    const updateUser = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        '/api/users/profile',
        { name: enteredUserInfo.name },
        config
      );

      return data;
    };

    try {
      const user = await updateUser();

      setUserInfo((prevValue) => {
        return {
          ...prevValue,
          name: user.name
        };
      });
      dispatch(getUserDetails());

      setUpdateError({ name: null });
    } catch (error) {
      setUpdateError({
        name:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
    setUpdatePending({
      name: false
    });

    setEnteredUserInfo((prevValue) => {
      return {
        ...prevValue,
        name: ''
      };
    });
  };

  const emailChangeHandler = async (event) => {
    event.preventDefault();

    setUpdatePending({ email: true });

    const updateUser = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        '/api/users/profile',
        { email: enteredUserInfo.email },
        config
      );

      return data;
    };

    try {
      const user = await updateUser();

      setUserInfo((prevValue) => {
        return {
          ...prevValue,
          email: user.email
        };
      });
      dispatch(getUserDetails());

      setUpdateError({ email: null });
    } catch (error) {
      setUpdateError({
        email:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
    setUpdatePending({
      email: false
    });

    setEnteredUserInfo((prevValue) => {
      return {
        ...prevValue,
        email: ''
      };
    });
  };
  const genderChangeHandler = async (event) => {
    event.preventDefault();

    setUpdatePending({ gender: true });

    const updateUser = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        '/api/users/profile',
        { gender: enteredUserInfo.gender },
        config
      );

      return data;
    };

    try {
      const user = await updateUser();

      setUserInfo((prevValue) => {
        return {
          ...prevValue,
          gender: user.gender
        };
      });
      dispatch(getUserDetails());

      setUpdateError({ gender: null });
    } catch (error) {
      setUpdateError({
        gender:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
    setUpdatePending({
      gender: false
    });

    setEnteredUserInfo((prevValue) => {
      return {
        ...prevValue,
        gender: ''
      };
    });
  };
  const passwordChangeHandler = async (event) => {
    event.preventDefault();

    if (enteredUserInfo.password !== enteredUserInfo.confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      setMessage('');
      setUpdatePending({ password: true });

      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };

        const { data } = await axios.patch(
          '/api/users/profile',
          { password: enteredUserInfo.password },
          config
        );

        return data;
      };

      try {
        await updateUser();

        setUpdateError({ password: null });
      } catch (error) {
        setUpdateError({
          password:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        });
      }
      setUpdatePending({
        password: false
      });

      setEnteredUserInfo((prevValue) => {
        return {
          ...prevValue,
          password: '',
          confirmPassword: ''
        };
      });
    }
  };

  //// Avatar
  const fileHandleChange = (event) => {
    const file = event.target.files[0];

    setFile(file);
  };

  const uploadAvater = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('avatar', file);

    setUpdatePending({ avater: true });
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post('/api/users/me/avatar', formData, config);

      setUpdateError({ avater: null });
      dispatch(getUserDetails());
    } catch (error) {
      setUpdateError({
        avater:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
    setUpdatePending({ avater: false });
  };

  const deleteAvatar = async () => {
    setAvatarDeletePending(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete('/api/users/me/avatar', config);
      setAvatarDeleteError(null);
      dispatch(getUserDetails());
    } catch (error) {
      setAvatarDeleteError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
    setAvatarDeletePending(false);
  };

  return (
    <>
      {updateError.avater && <ErrorMessage>{updateError.avater}</ErrorMessage>}
      {avatarDeleteError && <ErrorMessage>{avatarDeleteError}</ErrorMessage>}
      {updateError.name && <ErrorMessage>{updateError.name}</ErrorMessage>}
      {updateError.email && <ErrorMessage>{updateError.email}</ErrorMessage>}
      {updateError.gender && <ErrorMessage>{updateError.gender}</ErrorMessage>}
      {updateError.password && (
        <ErrorMessage>{updateError.password}</ErrorMessage>
      )}

      <div className={classes['edit-form']}>
        <div className={classes['form-group']}>
          <label htmlFor="avater">Profile image </label>
          <form onSubmit={uploadAvater}>
            <input
              onChange={fileHandleChange}
              name="avater"
              id="avater"
              type="file"
            />
            <button>{updatePending.avater ? <LineLoader /> : 'Upload'}</button>
          </form>
          <button onClick={deleteAvatar}>
            {avatarDeletePending ? <LineLoader /> : 'delete'}
          </button>
        </div>
        <div className={classes['form-group']}>
          <label htmlFor="name">Name &#58; </label>
          <span>{userInfo.name}</span>
          <form onSubmit={nameChangeHandler}>
            <input
              onChange={handleChange}
              name="name"
              id="name"
              type="text"
              placeholder="Enter name"
              value={enteredUserInfo.name}
            />
            <button>{updatePending.name ? <LineLoader /> : 'update'}</button>
          </form>
        </div>
        <div className={classes['form-group']}>
          <label htmlFor="email">Email &#58; </label>
          <span>{userInfo.email}</span>
          <form onSubmit={emailChangeHandler}>
            <input
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
              placeholder="Enter email"
              value={enteredUserInfo.email}
            />
            <button>{updatePending.email ? <LineLoader /> : 'update'}</button>
          </form>
        </div>
        <div className={classes['form-group']}>
          <label htmlFor="gender">Gender &#58; </label>
          <span>{userInfo.gender}</span>
          <form onSubmit={genderChangeHandler}>
            <select
              name="gender"
              id="gender"
              value={enteredUserInfo.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Custom">Custom</option>
            </select>
            <button>{updatePending.gender ? <LineLoader /> : 'update'}</button>
          </form>
        </div>

        <div className={classes['form-group']}>
          <label htmlFor="password">Password</label>
          <form onSubmit={passwordChangeHandler}>
            <input
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              placeholder="Enter new password"
              value={enteredUserInfo.password}
            />
            <input
              onChange={handleChange}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Enter new confirmed password"
              value={enteredUserInfo.confirmPassword}
            />

            <button>
              {updatePending.password ? <LineLoader /> : 'update'}
            </button>
          </form>
          {message && <div className={classes['err-message']}>{message}</div>}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
