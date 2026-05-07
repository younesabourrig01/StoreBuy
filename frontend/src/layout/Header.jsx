import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={{
      backgroundColor: 'var(--white)',
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--primary-green)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="StoreBuy" style={{ height: '50px', width: 'auto' }} />
        </Link>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem' }}>
          <li>
            <Link to="/" style={{ color: 'var(--text-dark)', fontWeight: '600', fontSize: '0.95rem' }}>Home</Link>
          </li>
          <li>
            <Link to="/products" style={{ color: 'var(--text-dark)', fontWeight: '600', fontSize: '0.95rem' }}>Products</Link>
          </li>
        </ul>
        <button 
          onClick={() => navigate('/register')}
          style={{
            backgroundColor: 'var(--dark-green)',
            color: 'white',
            padding: '0.6rem 1.5rem',
            borderRadius: '50px',
            fontWeight: '600',
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-green)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--dark-green)'}
        >
          Register
        </button>
      </nav>
    </header>
  );
};

export default Header;
