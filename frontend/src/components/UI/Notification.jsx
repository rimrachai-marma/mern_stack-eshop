import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Notification = (props) => {
  const notifyError = () => toast.error(`${props.message}`);
  const notifyPending = () => toast(`${props.message}`);
  const notifySuccess = () => toast(`${props.message}`);

  useEffect(() => {
    if (props.status === 'error') {
      notifyError();
    }
    if (props.status === 'pending') {
      notifyPending();
    }
    if (props.status === 'success') {
      notifySuccess();
    }
  }, [props.status]); // eslint-disable-line

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Notification;
