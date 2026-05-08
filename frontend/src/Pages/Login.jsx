import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandHero from '../Components/BrandHero';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
    toast.success('Login successful! (Simulated)');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 150px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'var(--primary-green)',
      overflow: 'hidden'
    }}>
      <div className="auth-container" style={{
        maxWidth: '1100px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap'
      }}>
        {/* Hero Animation Side */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <BrandHero width="500px" />
        </div>

        {/* Form Side */}
        <div style={{
          flex: '1',
          maxWidth: '450px',
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(46, 125, 50, 0.1)',
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '1rem', 
            color: 'var(--dark-green)',
            fontSize: '2rem',
            fontWeight: '900'
          }}>
            Welcome Back
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-light)', 
            marginBottom: '2.5rem',
            fontSize: '1rem'
          }}>
            Please enter your details to sign in.
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-dark)' }}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="your@email.com"
                required 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-dark)' }}>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="********"
                required 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <button 
              type="submit"
              className="auth-btn"
              style={{
                backgroundColor: 'var(--dark-green)',
                color: 'white',
                padding: '1.2rem',
                borderRadius: '12px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                marginTop: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)'
              }}
            >
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
            New to StoreBuy? <Link to="/register" style={{ color: 'var(--accent-green)', fontWeight: '800', textDecoration: 'none' }}>Create an account</Link>
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .auth-btn:hover {
            background-color: var(--accent-green) !important;
            transform: translateY(-3px);
            boxShadow: 0 12px 20px rgba(46, 125, 50, 0.3) !important;
          }
          @media (max-width: 900px) {
            .auth-container {
              flex-direction: column !important;
              gap: 2rem !important;
            }
            .auth-container > div {
              min-width: 100% !important;
            }
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
  backgroundColor: '#fdfdfd'
};

export default Login;
