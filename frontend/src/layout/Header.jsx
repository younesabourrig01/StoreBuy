import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const favoriteItems = useSelector(state => state.favorites.items);
  const notificationItems = useSelector(state => state.notifications.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteCount = favoriteItems.length;
  const unreadNotifications = notificationItems.filter(n => !n.read).length;

  const { isAuthenticated, currentUser } = useSelector(state => state.user);

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
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', alignItems: 'center' }}>
          <li>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li>
            <Link to="/products" style={linkStyle}>Products</Link>
          </li>
          {/* Icons Group Wrapper */}
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
              padding: '0.4rem 1.2rem',
              borderRadius: '50px',
              border: '1px solid rgba(46, 125, 50, 0.15)',
              backgroundColor: '#f9fdfa',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              {/* Favorites Icon */}
              <Link to="/favorites" style={iconContainerStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {favoriteCount > 0 && <span style={badgeStyle}>{favoriteCount}</span>}
              </Link>

              {/* Divider */}
              <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(46, 125, 50, 0.1)' }}></div>

              {/* Cart Icon */}
              <Link to="/cart" style={iconContainerStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
              </Link>

              {/* Notification Icon (Visible if Auth) */}
              {isAuthenticated && (
                <>
                  <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(46, 125, 50, 0.1)' }}></div>
                  <Link to="/notifications" style={iconContainerStyle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    {unreadNotifications > 0 && <span style={badgeStyle}>{unreadNotifications}</span>}
                  </Link>
                </>
              )}
            </div>
          </li>
        </ul>
        
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/profile" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '50px',
              backgroundColor: 'rgba(46, 125, 50, 0.05)',
              border: '1px solid rgba(46, 125, 50, 0.1)'
            }}>
              <img src={currentUser.image} alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: '700', color: 'var(--dark-green)', fontSize: '0.9rem' }}>{currentUser.name.split(' ')[0]}</span>
            </Link>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/register')}
            style={authBtnStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-green)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--dark-green)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Register
          </button>
        )}
      </nav>
    </header>
  );
};

const authBtnStyle = {
  backgroundColor: 'var(--dark-green)',
  color: 'white',
  padding: '0.6rem 1.5rem',
  borderRadius: '50px',
  fontWeight: '600',
  fontSize: '0.9rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const linkStyle = {
  color: 'var(--text-dark)',
  fontWeight: '600',
  fontSize: '0.95rem',
  textDecoration: 'none',
  transition: 'color 0.2s'
};

const iconContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  color: 'var(--text-dark)',
  transition: 'color 0.2s'
};

const badgeStyle = {
  position: 'absolute',
  top: '-8px',
  right: '-10px',
  backgroundColor: 'var(--accent-green)',
  color: 'white',
  fontSize: '0.7rem',
  fontWeight: '800',
  padding: '2px 6px',
  borderRadius: '10px',
  border: '2px solid white'
};

export default Header;
