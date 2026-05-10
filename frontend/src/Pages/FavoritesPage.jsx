import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Components/Card';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { items, status } = useSelector(state => state.favorites);

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>My Favorites</h1>
        <p style={subtitleStyle}>Products you've saved for later</p>
      </header>
      
      {status === 'loading' ? (
        <div style={messageContainerStyle}>Loading your favorites...</div>
      ) : items.length === 0 ? (
        <div style={messageContainerStyle}>
          <div style={emptyIconStyle}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h2 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>Your wishlist is empty</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem' }}>
            Start exploring our collection and save items you love!
          </p>
          <Link to="/products" style={shopLinkStyle}>Go to Shop</Link>
        </div>
      ) : (
        <div style={gridStyle}>
          {items.map((product) => (
            <Card key={product._id || product.id} product={product} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1300px', margin: '0 auto', padding: '4rem 2rem', minHeight: '80vh' };
const headerStyle = { textAlign: 'center', marginBottom: '5rem', animation: 'fadeInUp 0.6s ease-out' };
const titleStyle = { fontSize: '3.5rem', fontWeight: '900', color: 'var(--dark-green)', marginBottom: '0.5rem' };
const subtitleStyle = { fontSize: '1.1rem', color: 'var(--text-light)', fontWeight: '500' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem', animation: 'fadeInUp 0.8s ease-out' };
const messageContainerStyle = { textAlign: 'center', padding: '6rem 2rem', backgroundColor: '#f9fdfa', borderRadius: '30px', border: '1px dashed var(--primary-green)' };
const emptyIconStyle = { fontSize: '4rem', color: '#ff4d4f', marginBottom: '1.5rem', opacity: 0.3 };
const shopLinkStyle = { backgroundColor: 'var(--dark-green)', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: '800', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)', transition: 'all 0.3s ease' };

export default FavoritesPage;
