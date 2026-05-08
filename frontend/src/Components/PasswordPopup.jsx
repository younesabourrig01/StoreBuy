import React, { useState } from 'react';

const PasswordPopup = ({ password, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 800);
  };

  if (!password) return null;

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--dark-green)' }}>Suggested Password</h3>
          <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
          For your security, we've generated a strong password for you:
        </p>

        <div style={inputContainerStyle}>
          <input 
            type="text" 
            value={password} 
            readOnly 
            style={inputStyle}
          />
          <button 
            onClick={handleCopy} 
            style={{
              ...copyButtonStyle,
              backgroundColor: copied ? 'var(--accent-green)' : 'var(--dark-green)'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '1rem', fontStyle: 'italic' }}>
          Make sure to save this password in a safe place.
        </p>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  backdropFilter: 'blur(4px)'
};

const popupStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '16px',
  width: '90%',
  maxWidth: '400px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  animation: 'slideUp 0.3s ease-out',
  border: '1px solid var(--primary-green)'
};

const inputContainerStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginTop: '0.5rem'
};

const inputStyle = {
  flex: 1,
  padding: '0.8rem 1rem',
  borderRadius: '8px',
  border: '2px solid var(--primary-green)',
  fontSize: '1rem',
  fontWeight: '600',
  color: 'var(--dark-green)',
  backgroundColor: 'var(--primary-green)',
  outline: 'none'
};

const copyButtonStyle = {
  padding: '0 1.5rem',
  borderRadius: '8px',
  color: 'white',
  fontWeight: '700',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: 'var(--text-light)',
  padding: '0.5rem',
  lineHeight: '1'
};

export default PasswordPopup;
