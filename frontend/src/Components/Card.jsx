import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease, boxShadow 0.3s ease',
      border: '1px solid var(--primary-green)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      cursor: 'pointer'
    }}
    onClick={() => navigate(`/product/${product.id}`)}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }}>
      <div style={{ 
        width: '100%', 
        height: '200px', 
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9'
      }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: '0.8rem', 
          color: 'var(--accent-green)', 
          textTransform: 'uppercase', 
          fontWeight: '700',
          letterSpacing: '0.5px'
        }}>
          {product.category}
        </span>
        <h3 style={{ 
          fontSize: '1.1rem', 
          margin: '0.5rem 0', 
          color: 'var(--text-dark)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4',
          height: '2.8rem'
        }}>
          {product.title}
        </h3>
        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--dark-green)' }}>
            ${product.price}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              navigate(`/product/${product.id}`);
            }}
            style={{
              backgroundColor: 'var(--primary-green)',
              color: 'var(--dark-green)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
