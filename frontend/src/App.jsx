import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { fetchCartData, sendCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';
import Review from './components/review/Review';
import EditProfile from './components/EditProfile';
import Protected from './components/protect route/Protected';
import ProtectedAsAdmin from './components/protect route/ProtectedAsAdmin';
import 'react-toastify/dist/ReactToastify.min.css';

const Filters = React.lazy(() => import('./components/filters/Filters'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'));
const ShippingPage = React.lazy(() => import('./pages/ShippingPage'));
const PlaceOrderPage = React.lazy(() => import('./pages/PlaceOrderPage'));
const OrderDetailesPage = React.lazy(() => import('./pages/OrderDetailesPage'));
const MyOrdersPage = React.lazy(() => import('./pages/MyOrdersPage'));
const UserListPage = React.lazy(() => import('./pages/UserListPage'));
const UserEditPage = React.lazy(() => import('./pages/UserEditPage'));
const ProductlistPage = React.lazy(() => import('./pages/ProductlistPage'));
const EditProductPage = React.lazy(() => import('./pages/EditProductPage'));
const OrderListPage = React.lazy(() => import('./pages/OrderListPage'));

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartNotification = useSelector((state) => state.cartUi.notification);
  const cart = useSelector((state) => state.cart);

  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  // fetch cart data
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartData(token));
    }
  }, [dispatch, token, isLoggedIn]);

  // send cart data
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    } else {
      if (cart.changed) {
        if (isLoggedIn) {
          dispatch(sendCartData(token, cart));
        }
      }
    }
  }, [cart, dispatch, token, isLoggedIn]);

  return (
    <Layout>
      {cartNotification && (
        <Notification
          status={cartNotification.status}
          title={cartNotification.title}
          message={cartNotification.message}
        />
      )}

      <Suspense
        fallback={
          <div style={{ height: '80vh' }}>
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="search" element={<Filters />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/product/:id" element={<ProductPage />}>
            <Route path="review" element={<Review />} />
          </Route>
          <Route
            path="/profile"
            element={
              <Protected>
                <UserProfilePage />
              </Protected>
            }
          >
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/shipping"
            element={
              <Protected>
                <ShippingPage />
              </Protected>
            }
          />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route
            path="/order/:id"
            element={
              <Protected>
                <OrderDetailesPage />
              </Protected>
            }
          />
          <Route
            path="/my-orders"
            element={
              <Protected>
                <MyOrdersPage />
              </Protected>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Protected>
                <ProtectedAsAdmin>
                  <UserListPage />
                </ProtectedAsAdmin>
              </Protected>
            }
          />
          <Route
            path="/admin/user/edit/:id"
            element={
              <Protected>
                <ProtectedAsAdmin>
                  <UserEditPage />
                </ProtectedAsAdmin>
              </Protected>
            }
          />
          <Route
            path="/admin/products"
            element={
              <Protected>
                <ProtectedAsAdmin>
                  <ProductlistPage />
                </ProtectedAsAdmin>
              </Protected>
            }
          />
          <Route
            path="/admin/product/:id/edit"
            element={
              <Protected>
                <ProtectedAsAdmin>
                  <EditProductPage />
                </ProtectedAsAdmin>
              </Protected>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <Protected>
                <ProtectedAsAdmin>
                  <OrderListPage />
                </ProtectedAsAdmin>
              </Protected>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
