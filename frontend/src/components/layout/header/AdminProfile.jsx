import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './AdminProfile.module.scss';

import { ReactComponent as AdminIcon } from '../../../assets/icon-admin.svg';
import { ReactComponent as UsersIcon } from '../../../assets/users.svg';
import { ReactComponent as ProductsIcon } from '../../../assets/shopping-bag.svg';
import { ReactComponent as OrdersIcon } from '../../../assets/order-icon.svg';

const AdminProfile = () => {
  const [dropdown, setDropdown] = useState(false);

  function dropdownHandleMouseEnter() {
    setDropdown(true);
  }
  function dropdownHandleMouseLeave() {
    setDropdown(false);
  }
  const menuClasses = `${styles.menu} ${dropdown && styles.active}`;

  return (
    <div
      className={styles['admin-profile']}
      onMouseLeave={dropdownHandleMouseLeave}
      onMouseEnter={dropdownHandleMouseEnter}
    >
      <div className={styles.admin}>
        <AdminIcon className={styles['admin-icon']} />
      </div>
      <div className={menuClasses}>
        <ul>
          <li>
            <UsersIcon className={styles['menu-icons']} />
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <ProductsIcon className={styles['menu-icons']} />
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <OrdersIcon className={styles['menu-icons']} />
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;
