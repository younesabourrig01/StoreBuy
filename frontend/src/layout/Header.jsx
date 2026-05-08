import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const favoriteItems = useSelector(state => state.favorites.items);
  const notificationItems = useSelector(state => state.notifications.items);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteCount = favoriteItems.length;
  const unreadNotifications = notificationItems.filter(n => !n.read).length;

  const { isAuthenticated, currentUser } = useSelector(state => state.user);

  return (
    <header style={headerStyle} className="main-header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="StoreBuy" style={logoStyle} />
        </Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <button 
        className="menu-toggle show-mobile" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={menuToggleStyle}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {isMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'open' : 'hide-mobile-flex'}`}>
        <ul style={ulStyle} className="nav-ul">
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link to="/products" style={linkStyle}>Products</Link>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }} className="icons-li">
            <div style={iconGroupStyle} className="icon-group">
              <Link to="/favorites" style={iconContainerStyle} onClick={() => setIsMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {favoriteCount > 0 && <span style={badgeStyle}>{favoriteCount}</span>}
              </Link>
              <div style={dividerStyle}></div>
              <Link to="/cart" style={iconContainerStyle} onClick={() => setIsMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartCount > 0 && <span style={badgeStyle}>{cartCount}</span>}
              </Link>
              {isAuthenticated && (
                <>
                  <div style={dividerStyle}></div>
                  <Link to="/notifications" style={iconContainerStyle} onClick={() => setIsMenuOpen(false)}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="user-section">
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} style={profileLinkStyle}>
              <img src={currentUser.image} alt="User" style={avatarStyle} />
              <span className="user-name" style={{ fontWeight: '700', color: 'var(--dark-green)', fontSize: '0.9rem' }}>{currentUser.name.split(' ')[0]}</span>
            </Link>
          </div>
        ) : (
          <button 
            onClick={() => { setIsMenuOpen(false); navigate('/register'); }}
            style={authBtnStyle}
            className="register-btn"
          >
            Register
          </button>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .main-header {
            padding: 0.5rem 1rem !important;
          }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            flex-direction: column;
            padding: 2rem;
            gap: 2rem;
            border-bottom: 1px solid #edf2ef;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            animation: slideDown 0.3s ease-out;
            z-index: 999;
          }
          .nav-links.open {
            display: flex !important;
          }
          .nav-ul {
            flex-direction: column !important;
            gap: 1.5rem !important;
            width: 100% !important;
            align-items: center !important;
          }
          .icon-group {
            width: 100% !important;
            justify-content: space-around !important;
            padding: 0.8rem !important;
          }
          .icons-li {
            width: 100% !important;
          }
          .user-section, .register-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .register-btn {
            padding: 1rem !important;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
        .hide-mobile-flex {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        @media (max-width: 768px) {
          .hide-mobile-flex {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

// Styles
const headerStyle = { backgroundColor: 'var(--white)', padding: '0.6rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f4f2', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'sticky', top: 0, zIndex: 1000 };
const logoStyle = { height: '48px', width: 'auto' };
const ulStyle = { display: 'flex', listStyle: 'none', gap: '2rem', alignItems: 'center', margin: 0, padding: 0 };
const linkStyle = { color: 'var(--text-dark)', fontWeight: '700', fontSize: '0.95rem', transition: 'all 0.2s' };
const iconGroupStyle = { display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.4rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(46, 125, 50, 0.1)', backgroundColor: '#f9fbfb' };
const dividerStyle = { width: '1px', height: '18px', backgroundColor: 'rgba(46, 125, 50, 0.1)' };
const iconContainerStyle = { display: 'flex', alignItems: 'center', position: 'relative', color: 'var(--text-dark)' };
const badgeStyle = { position: 'absolute', top: '-8px', right: '-10px', backgroundColor: 'var(--accent-green)', color: 'white', fontSize: '0.7rem', fontWeight: '800', padding: '2px 6px', borderRadius: '10px', border: '2px solid white' };
const authBtnStyle = { backgroundColor: 'var(--dark-green)', color: 'white', padding: '0.7rem 1.8rem', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', border: 'none', cursor: 'pointer', transition: 'all 0.3s' };
const profileLinkStyle = { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.4rem 1rem', borderRadius: '50px', backgroundColor: '#f0fdf4', border: '1px solid #dcfce7' };
const avatarStyle = { width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' };
const menuToggleStyle = { background: 'none', border: 'none', color: 'var(--dark-green)', cursor: 'pointer', padding: '0.5rem' };

export default Header;
