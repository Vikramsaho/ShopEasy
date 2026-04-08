// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
// import LoginPrompt from './components/LoginPrompt';
import Nav from './components/Nav';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Help from './components/Help';
import Footer from './components/Footer';
import Profile from './components/Profile';
import ProductForm from './components/ProductForm';
import Orders from './components/Orders';
import BuyNow from './pages/BuyNow';
import AdminOrders from './pages/AdminOrders';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Affiliates from './pages/Affiliates';
import Cookies from './pages/Cookies';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <WishlistProvider>
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<><Nav /><Home /><Footer /></>} />
                <Route path="/products" element={<><Nav/><Products /><Footer /></>} />
                <Route path="/cart" element={<><Nav/><Cart /><Footer /></>} />
                <Route path="/profile" element={<><Nav/><Profile /><Footer /></>} />
                <Route path="/orders" element={<><Nav/><Orders /><Footer /></>} />
                <Route path="/login" element={<><Nav/><Login /><Footer /></>} />
                <Route path="/signup" element={<><Nav/><Signup /><Footer /></>} />
                <Route path="/admin/productForm" element={<><Nav/><ProductForm /><Footer /></>} />
                <Route path="/help" element={<><Nav/><Help /><Footer /></>} />
                <Route path="/buy" element={<><BuyNow/></>} />
                <Route path="/admin/orders" element={<><AdminOrders /></>} />
                <Route path="/privacy" element={<><Privacy /></>} />
                <Route path='/terms' element={<><Terms/></>}/>
                <Route path='/wishlist' element={<><Nav /><Wishlist /><Footer /></>} />
                <Route path='/about' element={<><Nav /><About /><Footer /></>} />
                <Route path='/careers' element={<><Nav /><Careers /><Footer /></>} />
                <Route path='/press' element={<><Nav /><Press /><Footer /></>} />
                <Route path='/affiliates' element={<><Nav /><Affiliates /><Footer /></>} />
                <Route path='/cookies' element={<><Nav /><Cookies /><Footer /></>} />
              </Routes>
              {/* <LoginPrompt /> */}
            </div>
          </WishlistProvider>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;