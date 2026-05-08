import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordPopup from '../Components/PasswordPopup';
import BrandHero from '../Components/BrandHero';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    adress: '',
    region: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setError('');

    if (type === 'file') {
      const file = files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          setError('Please select a valid image file.');
          setFileName('');
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          setError('Image size must be less than 2MB.');
          setFileName('');
          return;
        }
        setFileName(file.name);
        setFormData({ ...formData, [name]: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePasswordFocus = () => {
    if (!hasShownPopup && !formData.password) {
      const mockPassword = 'SB-' + Math.random().toString(36).slice(-8).toUpperCase();
      setGeneratedPassword(mockPassword);
      setShowPopup(true);
      setHasShownPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData(prev => ({ ...prev, password: generatedPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    console.log('Registering user with data:', formData);
    toast.success('Registration successful! (Simulated)');
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundColor: 'var(--primary-green)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {showPopup && (
        <PasswordPopup 
          password={generatedPassword} 
          onClose={handleClosePopup} 
        />
      )}

      <div className="auth-container" style={{
        maxWidth: '1050px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        zIndex: 1
      }}>
        {/* Hero Side */}
        <div style={{ 
          flex: '1', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          minWidth: '280px'
        }}>
          <BrandHero width="380px" />
          <h2 style={{ 
            color: 'var(--dark-green)', 
            fontWeight: '900', 
            fontSize: '2rem', 
            marginTop: '-1.5rem',
            lineHeight: '1.1'
          }}>
            Join StoreBuy
          </h2>
          <p style={{ 
            color: 'var(--text-light)', 
            fontSize: '0.95rem', 
            maxWidth: '320px',
            marginTop: '0.5rem'
          }}>
            Premium products and exclusive deals.
          </p>
        </div>

        {/* Form Side */}
        <div style={{
          flex: '1',
          maxWidth: '500px',
          padding: '1.5rem 2.5rem',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          border: '1px solid rgba(46, 125, 50, 0.03)',
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '1.2rem', 
            color: 'var(--dark-green)', 
            fontSize: '1.6rem', 
            fontWeight: '900' 
          }}>
            Create Account
          </h2>

          {error && (
            <div style={{
              backgroundColor: '#fff5f5',
              color: '#e53e3e',
              padding: '0.6rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              textAlign: 'center',
              fontWeight: '600',
              border: '1px solid #fed7d7'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={formResponsiveGrid} className="register-form">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', gridColumn: 'span 2' }} className="full-width">
              <label style={labelStyle}>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" required onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }} className="full-width">
              <label style={labelStyle}>Email</label>
              <input type="email" name="email" placeholder="john@example.com" required onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }} className="full-width">
              <label style={labelStyle}>Password</label>
              <input type="password" name="password" value={formData.password} required onChange={handleChange} onFocus={handlePasswordFocus} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }} className="full-width">
              <label style={labelStyle}>Phone</label>
              <input type="tel" name="phone_number" placeholder="06XXXXXXXX" required onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }} className="full-width">
              <label style={labelStyle}>Region</label>
              <input type="text" name="region" placeholder="Region" required onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', gridColumn: 'span 2' }} className="full-width">
              <label style={labelStyle}>Address</label>
              <input type="text" name="adress" placeholder="Street Address" required onChange={handleChange} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', gridColumn: 'span 2' }} className="full-width">
              <label style={labelStyle}>Profile Image</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="file" 
                  id="profile-image"
                  name="image" 
                  accept="image/*" 
                  onChange={handleChange} 
                  style={{ display: 'none' }}
                />
                <label 
                  htmlFor="profile-image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '10px',
                    border: '2px dashed rgba(46, 125, 50, 0.2)',
                    backgroundColor: '#f9fdfa',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: 'var(--text-light)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                    e.currentTarget.style.backgroundColor = '#f9fdfa';
                  }}
                >
                  <div style={{
                    backgroundColor: 'var(--primary-green)',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--dark-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <span style={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    flex: 1 
                  }}>
                    {fileName || 'Choose image (Max 2MB)'}
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className="auth-btn" style={buttonStyle}>
              Create Account
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.85rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-green)', fontWeight: '800', textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .auth-btn:hover {
            background-color: var(--accent-green) !important;
            transform: translateY(-2px);
            boxShadow: 0 8px 15px rgba(46, 125, 50, 0.2) !important;
          }
          @media (max-width: 1000px) {
            .auth-container {
              flex-direction: column !important;
              padding: 1rem 0;
              gap: 1.5rem !important;
            }
            .auth-container > div {
              min-width: 100% !important;
              max-width: 100% !important;
            }
            .hero-brand {
              width: 280px !important;
            }
          }
          @media (max-width: 600px) {
            .register-form {
              grid-template-columns: 1fr !important;
            }
            .full-width {
              grid-column: span 1 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const labelStyle = { fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-dark)' };
const formResponsiveGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' };

const inputStyle = {
  padding: '0.65rem 0.9rem',
  borderRadius: '10px',
  border: '1px solid #eee',
  fontSize: '0.9rem',
  outline: 'none',
  backgroundColor: '#f9f9f9',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease'
};

const buttonStyle = {
  gridColumn: 'span 2',
  backgroundColor: 'var(--dark-green)',
  color: 'white',
  padding: '0.9rem',
  borderRadius: '12px',
  fontWeight: '800',
  marginTop: '0.8rem',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 6px 12px rgba(46, 125, 50, 0.15)'
};

export default Register;
