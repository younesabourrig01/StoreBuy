import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layout/Layout';
import Home from './Pages/Home';
import ProductsPage from './Pages/ProductsPage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ProductDetails from './Pages/ProductDetails';
import CartPage from './Pages/CartPage';
import FavoritesPage from './Pages/FavoritesPage';
import ProfilePage from './Pages/ProfilePage';
import NotificationPage from './Pages/NotificationPage';
import AdminDashboard from './Pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
