import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { addToCart } from '../store/cartSlice';

const Card = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteItems = useSelector(state => state.favorites.items);
  const isFavorite = favoriteItems.some(item => (item._id || item.id) === (product._id || product.id));

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(product._id || product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };


  const handleNavigate = () => {
    navigate(`/product/${product._id || product.id}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        border: '1px solid #f0f0f0'
      }}
      className="product-card"
    >
      {/* Favorite Button */}
      <button 
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'white',
          border: 'none',
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          zIndex: 2,
          color: isFavorite ? '#ff4d4f' : '#ccc',
          transition: 'all 0.2s ease'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <div style={{
        height: '220px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: '1rem'
      }}>
        <img 
          src={product.image?.startsWith('http') ? product.image : `http://localhost:4000/api/products/${encodeURIComponent(product.image.replace(/\\/g, '/'))}`} 
          alt={product.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>

      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: '0.8rem', 
          color: 'var(--accent-green)', 
          fontWeight: '700', 
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '0.5rem'
        }}>
          {product.category || 'Collection'}
        </span>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '800', 
          color: 'var(--dark-green)',
          marginBottom: '0.8rem',
          lineHeight: '1.4'
        }}>
          {product.title}
        </h3>
        
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--dark-green)' }}>
            ${product.price?.toFixed(2)}
          </span>
          <button 
            onClick={handleAddToCart}
            style={{
              backgroundColor: 'var(--dark-green)',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1rem',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-5px);
          boxShadow: 0 15px 40px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Card;
