import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '../components/UI/Container';

import ErrorMessage from '../components/UI/ErrorMessage';
import Heading from '../components/UI/Heading';
import LineLoader from '../components/UI/LineLoader';
import { getAllUsers } from '../store/user-actions';

import styles from './UserEditPage.module.scss';

function UserEditPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const [fetchError, setFetchError] = useState(null);

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  const [enteredUserInfo, setEnteredUserInfo] = useState({
    name: '',
    email: ''
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const [updatePending, setUpdatePending] = useState({
    name: false,
    email: false,
    isAdmin: false
  });

  const [updateError, setUpdateError] = useState({
    name: null,
    email: null,
    isAdmin: null
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserdata = async (id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data: user } = await axios.get(`/api/users/${id}`, config);

        setUserInfo((prevValue) => {
          return {
            ...prevValue,
            name: user.name,
            email: user.email
          };
        });
        setIsAdmin(user.isAdmin);
      } catch (error) {
        setFetchError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };

    fetchUserdata(params.id);
  }, [params.id]); //eslint-disable-line

  // input change handlers
  const handleChange = (event) => {
    const { name, value } = event.target;

    setEnteredUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  // update handlers
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
        `/api/users/${params.id}`,
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

      setUpdateError({ name: null });
      dispatch(getAllUsers());
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
        `/api/users/${params.id}`,
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

      setUpdateError({ email: null });

      dispatch(getAllUsers());
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

  const adminChangeHandler = async (event) => {
    event.preventDefault();

    setUpdatePending({ isAdmin: true });

    const updateUser = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.patch(
        `/api/users/${params.id}`,
        { isAdmin: isAdmin },
        config
      );

      return data;
    };

    try {
      const user = await updateUser();

      setIsAdmin(user.isAdmin);

      setUpdateError({ isAdmin: null });

      dispatch(getAllUsers());
    } catch (error) {
      setUpdateError({
        email:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
    setUpdatePending({
      isAdmin: false
    });
  };

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <div className={styles['edit-form']}>
          <Heading>Edit user</Heading>

          {fetchError && <ErrorMessage>{fetchError}</ErrorMessage>}
          {updateError.name && <ErrorMessage>{updateError.name}</ErrorMessage>}
          {updateError.email && (
            <ErrorMessage>{updateError.email}</ErrorMessage>
          )}

          <ul>
            <li>
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
                <button>
                  {updatePending.name ? <LineLoader /> : 'update'}
                </button>
              </form>
            </li>
            <li>
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
                <button>
                  {updatePending.email ? <LineLoader /> : 'update'}
                </button>
              </form>
            </li>
            <li>
              <label htmlFor="isAdmin">Is Admin &#58; </label>
              <form onSubmit={adminChangeHandler}>
                <input
                  onChange={(event) => setIsAdmin(event.target.checked)}
                  name="isAdmin"
                  id="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                />
                <button>
                  {updatePending.isAdmin ? <LineLoader /> : 'update'}
                </button>
              </form>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default UserEditPage;
