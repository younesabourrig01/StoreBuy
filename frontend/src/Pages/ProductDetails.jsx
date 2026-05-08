import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
    alert(`${product.title} added to cart!`);
  };

  const handleAddToFavorite = () => {
    console.log('Added to favorites:', product);
    alert(`${product.title} added to favorites!`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h2 style={{ color: 'red' }}>Product not found</h2>
        <button onClick={() => navigate('/products')} style={backButtonStyle}>Back to Products</button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '4rem auto', 
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '4rem',
      alignItems: 'start'
    }}>
      {/* Product Image */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '2rem', 
        borderRadius: '16px',
        border: '1px solid var(--primary-green)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Product Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <button 
          onClick={() => navigate('/products')} 
          style={{ 
            background: 'none', 
            color: 'var(--accent-green)', 
            fontWeight: '700', 
            cursor: 'pointer',
            border: 'none',
            padding: 0,
            textAlign: 'left',
            marginBottom: '1rem'
          }}
        >
          &larr; Back to Products
        </button>

        <span style={{ 
          fontSize: '0.9rem', 
          color: 'var(--accent-green)', 
          textTransform: 'uppercase', 
          fontWeight: '700',
          letterSpacing: '1px'
        }}>
          {product.category}
        </span>
        
        <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', color: 'var(--dark-green)', fontWeight: '800' }}>
          {product.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark-green)' }}>
            ${product.price}
          </span>
          <div style={{ 
            backgroundColor: 'var(--primary-green)', 
            padding: '0.4rem 0.8rem', 
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: 'var(--dark-green)',
            fontWeight: '700'
          }}>
            IN STOCK
          </div>
        </div>

        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.7', 
          color: 'var(--text-light)',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '1.5rem'
        }}>
          {product.description}
        </p>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleAddToCart}
            style={{
              backgroundColor: 'var(--dark-green)',
              color: 'white',
              padding: '1.1rem 2rem',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '700',
              flex: 2,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(46, 125, 50, 0.2)'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-green)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--dark-green)'}
          >
            Add to Cart
          </button>
          
          <button 
            onClick={handleAddToFavorite}
            style={{
              backgroundColor: 'white',
              color: 'var(--dark-green)',
              padding: '1.1rem',
              borderRadius: '50px',
              fontSize: '1.5rem',
              fontWeight: '700',
              flex: 0.5,
              border: '2px solid var(--dark-green)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--primary-green)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
            title="Add to Favorite"
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
};

const backButtonStyle = {
  backgroundColor: 'var(--dark-green)',
  color: 'white',
  padding: '0.8rem 1.5rem',
  borderRadius: '8px',
  marginTop: '1rem',
  cursor: 'pointer',
  border: 'none'
};

export default ProductDetails;
