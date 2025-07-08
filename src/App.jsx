import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Suspense, lazy } from 'react';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Loader, PrivateRoute } from './frontend/components';

import {
  ErrorPage,
  LoginPage,
  SignupPage,
} from './frontend/pages';

const SharedLayout = lazy(() => import('./frontend/pages/SharedLayout'));
const Home = lazy(() => import('./frontend/pages/Home'));
const ProductListingPage = lazy(() =>
  import('./frontend/pages/ProductListingPage/ProductListingPage')
);
const CartPage = lazy(() => import('./frontend/pages/CartPage/CartPage'));
const WishListPage = lazy(() =>
  import('./frontend/pages/WishlistPage/WishListPage')
);
const SingleProductPage = lazy(() =>
  import('./frontend/pages/SingleProductPage/SingleProductPage')
);
const Address = lazy(() => import('./frontend/pages/Address/Address'));
const Profile = lazy(() => import('./frontend/pages/Profile/Profile'));
const CurrencySettings = lazy(() => import('./frontend/pages/CurrencySettings/CurrencySettings'));
const SharedProfileLayout = lazy(() =>
  import('./frontend/pages/SharedProfileLayout/SharedProfileLayout')
);
const Checkout = lazy(() => import('./frontend/pages/Checkout/Checkout'));
const AdminPanel = lazy(() => import('./frontend/pages/AdminPanel/AdminPanel'));

const Fallback = () => {
  return (
    <>
      <main className='full-page'></main>
      <Loader isLoading />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <ToastContainer
          position='bottom-left'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />

        <Routes>
          <Route path='*' element={<ErrorPage />} />

          <Route path='/login' element={<LoginPage />} />

          <Route path='/signup' element={<SignupPage />} />

          <Route
            path='/'
            element={
              <Suspense fallback={<Fallback />}>
                <SharedLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Fallback />}>
                  <Home />
                </Suspense>
              }
            />

            <Route
              path='products'
              element={
                <Suspense fallback={<Fallback />}>
                  <ProductListingPage />
                </Suspense>
              }
            />

            <Route
              path='products/:productId'
              element={
                <Suspense fallback={<Fallback />}>
                  <SingleProductPage />
                </Suspense>
              }
            />

            <Route
              path='cart'
              element={
                <Suspense fallback={<Fallback />}>
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path='wishlist'
              element={
                <Suspense fallback={<Fallback />}>
                  <PrivateRoute>
                    <WishListPage />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path='checkout'
              element={
                <Suspense fallback={<Fallback />}>
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path='profile'
              element={
                <Suspense fallback={<Fallback />}>
                  <PrivateRoute>
                    <SharedProfileLayout />
                  </PrivateRoute>
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<Fallback />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path='address'
                element={
                  <Suspense fallback={<Fallback />}>
                    <Address />
                  </Suspense>
                }
              />
              <Route
                path='currency'
                element={
                  <Suspense fallback={<Fallback />}>
                    <CurrencySettings />
                  </Suspense>
                }
              />
              <Route
                path='admin'
                element={
                  <Suspense fallback={<Fallback />}>
                    <AdminPanel />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;