import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--primary-green)',
      padding: '2rem',
      textAlign: 'center',
      borderTop: '1px solid var(--accent-green)',
      marginTop: 'auto'
    }}>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} StoreBuy. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
