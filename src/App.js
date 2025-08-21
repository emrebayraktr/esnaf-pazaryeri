// src/App.js (tam route yapılandırması)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LocationProvider } from './contexts/LocationContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import StoreProfile from './pages/StoreProfile';
import AdminDashboard from './pages/AdminDashboard';
import StoreDashboard from './pages/StoreDashboard';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import StoreSettings from './pages/StoreSettings';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <LocationProvider>
            <Router>
              <div className="App">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/store/:id" element={<StoreProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/checkout" element={<Checkout />} />
                    
                    {/* Korumalı Rotalar */}
                    <Route 
                      path="/store/dashboard/*" 
                      element={
                        <ProtectedRoute requiredRole="store">
                          <StoreDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/store/products/*" 
                      element={
                        <ProtectedRoute requiredRole="store">
                          <ProductManagement />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/store/orders/*" 
                      element={
                        <ProtectedRoute requiredRole="store">
                          <OrderManagement />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/store/settings/*" 
                      element={
                        <ProtectedRoute requiredRole="store">
                          <StoreSettings />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </LocationProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;