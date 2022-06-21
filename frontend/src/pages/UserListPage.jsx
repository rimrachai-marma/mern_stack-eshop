import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/UI/Container';
import ErrorMessage from '../components/UI/ErrorMessage';

import Heading from '../components/UI/Heading';
import Userlist from '../components/Userlist';
import { getAllUsers } from '../store/user-actions';

const UserListPage = () => {
  const dispatch = useDispatch();

  const { users, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <section style={{ padding: '2rem 0' }}>
      <Container>
        <Heading>Users</Heading>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <Userlist users={users} />
        )}
      </Container>
    </section>
  );
};

export default UserListPage;
