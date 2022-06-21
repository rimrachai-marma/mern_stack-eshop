import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { getUserDetails } from '../store/user-actions';

import styles from './UserProfilePage.module.scss';
import { logoutAll } from '../store/auth-actions';
import { ReactComponent as UserIcon } from '../assets/user-circle.svg';
import Container from '../components/UI/Container';
import OrderItems from '../components/OrderItems';
import { getMyOrders } from '../store/order-action';
import Heading from '../components/UI/Heading';
import { authAction } from '../store/auth-slice';
import { ordersSlice } from '../store/order-slice';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    gender: ''
  });

  const token = useSelector((state) => state.auth.token);

  const { user } = useSelector((state) => state.userDetails);

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

  const { orders } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logoutAll(token));
  };

  const acountDeleteHandler = async () => {
    if (window.confirm('Are you sure? You wanna delete acount!')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete('/api/users/profile', config);

      dispatch(authAction.logout());
      dispatch(ordersSlice.actions.rest);
      localStorage.removeItem('cart');
      localStorage.removeItem('auth');
      window.location.href = '/auth';
    }
  };

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <div className={styles.profile}>
          <div className={styles.profile__details}>
            <ul>
              <li>
                <div className={styles.user}>
                  <div className={styles['profile-img']}>
                    {user?.avatar ? (
                      <img
                        className={styles.avater}
                        src={`/api/users/${user._id}/avatar`}
                        alt="user"
                      />
                    ) : (
                      <UserIcon className={styles['avater-icon']} />
                    )}
                  </div>
                  <div className={styles.name}>{userInfo.name}</div>
                </div>
              </li>
              <li>
                <label>Email</label>

                <p>{userInfo.email}</p>
              </li>
              <li>
                <label>gender</label>
                <p>{userInfo.gender}</p>
              </li>

              <button onClick={logoutHandler}>Logout all</button>
              <button onClick={acountDeleteHandler}>Delete Acount</button>
              <button onClick={() => navigate('edit')}>edit profile</button>
            </ul>

            <Outlet />
          </div>

          <div className={styles['order-list']}>
            <Heading>orders</Heading>
            <OrderItems orders={orders} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
