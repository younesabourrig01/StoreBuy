import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import Card from '../Components/Card';
import heroSvg from '../assets/hero.svg';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const suggestedProducts = items.slice(0, 3);

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--primary-green)',
        borderBottom: '1px solid var(--accent-green)'
      }}>
        <div style={{
          maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 1s ease-out'
        }}>
          <img 
            src={heroSvg} 
            alt="StoreBuy Hero" 
            style={{ 
              width: '400px', // Larger size
              height: 'auto',
              marginBottom: '2rem'
            }} 
          />
          <h1 style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
            color: 'var(--dark-green)'
          }}>
            Welcome to StoreBuy
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-light)',
            marginBottom: '3rem',
            maxWidth: '650px'
          }}>
            Discover premium products curated just for you. Quality and reliability in every purchase.
          </p>
          <button 
            onClick={() => navigate('/products')}
            style={{
              backgroundColor: 'var(--dark-green)',
              color: 'white',
              padding: '1.2rem 3rem',
              fontSize: '1.1rem',
              borderRadius: '50px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-green)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dark-green)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Explore Collections
          </button>
        </div>
      </section>

      {/* Suggested Products Section */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>
            Suggested For You
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent-green)', margin: '0 auto' }}></div>
        </div>

        {status === 'loading' && <p style={{ textAlign: 'center' }}>Loading products...</p>}
        {status === 'failed' && <p style={{ textAlign: 'center', color: 'red' }}>Error loading products.</p>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          justifyContent: 'center'
        }}>
          {suggestedProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
