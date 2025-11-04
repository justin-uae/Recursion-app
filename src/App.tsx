import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { BrandedFallback } from './components/LoadingFallback';
import { initializeAuth } from './slices/authSlice';

const ExcursionsDubaiHero = lazy(() => import('./components/ExcursionsDubaiHero'));
const Footer = lazy(() => import('./components/Footer'));
const ItemDetailpage = lazy(() => import('./components/ItemDetailpage'));
const Navbar = lazy(() => import('./components/Navbar'));
const ContactUsPage = lazy(() => import('./components/ContactUs'));
const FallbackPage = lazy(() => import('./components/FallBackPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const BookingsPage = lazy(() => import('./pages/BookingsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AboutPage = lazy(() => import('./pages/AboutUs'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const ViewAllExcursion = lazy(() => import('./pages/ViewAllExcursion'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth() as any);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<BrandedFallback />}>
        <Navbar />
        <Routes>
          <Route path='/' element={<ExcursionsDubaiHero />} />
          <Route path='/contact' element={<ContactUsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/excursions' element={<ViewAllExcursion />} />
          <Route path='/excursion/:id' element={<ItemDetailpage />} />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />

          <Route path='/tours' element={<FallbackPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/transfers' element={<FallbackPage />} />
          <Route path='/services' element={<FallbackPage />} />
          <Route path='*' element={<FallbackPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;