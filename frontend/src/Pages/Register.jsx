import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordPopup from '../Components/PasswordPopup';

const Register = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [hasShownPopup, setHasShownPopup] = useState(false);
  
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
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePasswordFocus = () => {
    if (!hasShownPopup && !formData.password) {
      // Simulate fetching generated password from backend
      const mockPassword = 'SB-' + Math.random().toString(36).slice(-8).toUpperCase();
      setGeneratedPassword(mockPassword);
      setShowPopup(true);
      setHasShownPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Auto-fill the password field
    setFormData(prev => ({ ...prev, password: generatedPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registering user with data:', formData);
    
    try {
      alert('Registration successful! (Simulated)');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {showPopup && (
        <PasswordPopup 
          password={generatedPassword} 
          onClose={handleClosePopup} 
        />
      )}

      <div style={{
        maxWidth: '500px',
        margin: '4rem auto',
        padding: '2.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid var(--primary-green)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--dark-green)' }}>Create an Account</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="full name"
              value={formData.name}
              required 
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@example.com"
              value={formData.email}
              required 
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="********"
              value={formData.password}
              required 
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Phone Number</label>
            <input 
              type="tel" 
              name="phone_number" 
              placeholder="0612345678"
              value={formData.phone_number}
              required 
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Adress</label>
            <input 
              type="text" 
              name="adress" 
              placeholder="123 Street Name"
              value={formData.adress}
              required 
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Region</label>
            <input 
              type="text" 
              name="region" 
              placeholder="Casablanca-Settat"
              value={formData.region}
              required 
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Profile Image</label>
            <input 
              type="file" 
              name="image" 
              accept="image/*"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: 'var(--dark-green)',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              fontWeight: '700',
              marginTop: '1rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Sign Up
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-green)', fontWeight: '700' }}>Connect</Link>
        </p>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '0.95rem',
  outline: 'none',
  backgroundColor: '#fdfdfd',
  width: '100%',
  boxSizing: 'border-box'
};

export default Register;
