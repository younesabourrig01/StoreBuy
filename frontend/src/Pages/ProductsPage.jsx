import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import Card from '../Components/Card';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 600); // 600ms delay to let user finish typing

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredItems = items.filter((product) =>
    product.title.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '900', color: 'var(--dark-green)' }}>
          Our Collections
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore our wide range of premium products, carefully selected for quality and style.
        </p>
        <div style={{ width: '60px', height: '5px', backgroundColor: 'var(--accent-green)', margin: '2rem auto', borderRadius: '10px' }}></div>
      </div>

      {/* Search Bar Section */}
      <div style={{ 
        marginBottom: '4rem', 
        display: 'flex', 
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '700px',
        margin: '0 auto 5rem auto'
      }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search for products, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1.2rem 1.5rem 1.2rem 3.5rem',
              fontSize: '1.1rem',
              borderRadius: '15px',
              border: '2px solid rgba(46, 125, 50, 0.1)',
              backgroundColor: '#f9fdfa',
              color: 'var(--text-dark)',
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-green)';
              e.target.style.boxShadow = '0 8px 30px rgba(76, 175, 80, 0.15)';
              e.target.style.backgroundColor = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(46, 125, 50, 0.1)';
              e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
              e.target.style.backgroundColor = '#f9fdfa';
            }}
          />
          {/* Search Icon (Simple CSS version) */}
          <div style={{
            position: 'absolute',
            left: '1.2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: '0.5'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          {searchTerm !== debouncedTerm && (
            <div style={{
              position: 'absolute',
              right: '-80px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '0.85rem',
              color: 'var(--accent-green)',
              fontWeight: '600',
              animation: 'pulse 1.5s infinite'
            }}>
              Searching...
            </div>
          )}
        </div>
      </div>

      {status === 'loading' && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loader"></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Loading our latest products...</p>
        </div>
      )}

      {status === 'failed' && (
        <div style={{ textAlign: 'center', color: '#d32f2f', padding: '3rem' }}>
          <h3>Oops! Something went wrong.</h3>
          <p>Please try refreshing the page.</p>
        </div>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3rem',
        animation: 'fadeInUp 0.8s ease-out'
      }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <Card key={product.id} product={product} />
          ))
        ) : status === 'succeeded' && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)' }}>No products found matching "{debouncedTerm}"</h3>
            <button 
              onClick={() => setSearchTerm('')}
              style={{
                marginTop: '1rem',
                color: 'var(--dark-green)',
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .loader {
            width: 40px;
            height: 40px;
            border: 4px solid var(--primary-green);
            border-top: 4px solid var(--accent-green);
            border-radius: 50%;
            margin: 0 auto;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ProductsPage;
