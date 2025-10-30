
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExcursionsDubaiHero from './components/ExcursionsDubaiHero'
import Footer from './components/Footer';
import ItemDetailpage from './components/ItemDetailpage';
import Navbar from './components/Navbar';
import ContactUsPage from './components/ContactUs';
import FallbackPage from './components/FallBackPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ExcursionsDubaiHero />} />
          <Route path='/contact' element={<ContactUsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<FallbackPage />} />
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

          <Route path='/tours' element={<FallbackPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/transfers' element={<FallbackPage />} />
          <Route path='/services' element={<FallbackPage />} />
          <Route path='*' element={<FallbackPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  )
}

export default App
