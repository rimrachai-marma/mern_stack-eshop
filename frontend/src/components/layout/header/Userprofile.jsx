import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './UserProfile.module.scss';

import { ReactComponent as UserIcon } from '../../../assets/user-circle.svg';
import { ReactComponent as ExitIcon } from '../../../assets/exit.svg';
import { ReactComponent as OrderIcon } from '../../../assets/order-icon.svg';
import { logout } from '../../../store/auth-actions';
import { Link } from 'react-router-dom';
import { getUserDetails } from '../../../store/user-actions';

function Userprofile() {
  const [dropdown, setDropdown] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout(token));
  };

  function dropdownHandleMouseEnter() {
    setDropdown(true);
  }
  function dropdownHandleMouseLeave() {
    setDropdown(false);
  }
  const menuClasses = `${styles.menu} ${dropdown && styles.active}`;

  return (
    <div
      className={styles['user-profile']}
      onMouseLeave={dropdownHandleMouseLeave}
      onMouseEnter={dropdownHandleMouseEnter}
    >
      <div className={styles.profile}>
        {user?.avatar ? (
          <img
            className={styles.avater}
            src={`/api/users/${user._id}/avatar`}
            alt="user avatar"
          />
        ) : (
          <UserIcon className={styles['avater-icon']} />
        )}
      </div>
      <div className={menuClasses}>
        <h3>{user.name}</h3>
        <ul>
          <li>
            <UserIcon className={styles['menu-icons']} />
            <Link to="/profile">My profile</Link>
          </li>

          <li>
            <OrderIcon className={styles['menu-icons']} />
            <Link to="/my-orders">My Orders</Link>
          </li>
          <li>
            <ExitIcon className={styles['menu-icons']} />
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Userprofile;
