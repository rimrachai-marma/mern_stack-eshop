import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Userlist.module.scss';

import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as CheckIcon } from '../assets/check.svg';
import { ReactComponent as EditIcon } from '../assets/pencil-square.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import axios from 'axios';
import { getAllUsers } from '../store/user-actions';
import ErrorMessage from './UI/ErrorMessage';

const Userlist = ({ users }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure? You wanna delete!')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch(getAllUsers());
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    }
  };

  return (
    <div className={styles['table-wraper']}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>admin</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <CheckIcon className={styles['icon-check']} />
                ) : (
                  <CloseIcon className={styles['icon-close']} />
                )}
              </td>
              <td>
                <div className={styles['action-btn']}>
                  <button>
                    <Link to={`/admin/user/edit/${user._id}`}>
                      <EditIcon className={styles['icon-edit']} />
                    </Link>
                  </button>

                  <button onClick={() => deleteHandler(user._id)}>
                    <DeleteIcon className={styles['icon-delete']} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
