import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    
    // Future backend logic:
    // const res = await fetch('.../login', { method: 'POST', body: JSON.stringify(credentials) });
    
    alert('Login successful! (Simulated)');
    navigate('/');
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '6rem auto',
      padding: '2.5rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid var(--primary-green)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--dark-green)' }}>Welcome Back</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
          <input 
            type="email" 
            name="email" 
            placeholder="your@email.com"
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
            required 
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
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '0.5rem'
          }}
        >
          Sign In
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
        New to StoreBuy? <Link to="/register" style={{ color: 'var(--accent-green)', fontWeight: '700' }}>Create account</Link>
      </p>
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
