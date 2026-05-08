import React from 'react';
import heroSvg from '../assets/hero.svg';

const BrandHero = ({ width = '500px', showGlow = true }) => {
  return (
    <div style={{
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '300px',
      padding: '2rem'
    }}>
      <div style={{
        position: 'relative',
        animation: 'float 6s ease-in-out infinite'
      }}>
        {/* Glow effect behind logo */}
        {showGlow && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            backgroundColor: 'var(--accent-green)',
            filter: 'blur(80px)',
            opacity: '0.2',
            borderRadius: '50%',
            zIndex: -1
          }}></div>
        )}
        
        <img 
          src={heroSvg} 
          alt="StoreBuy Hero" 
          style={{ 
            width: width,
            maxWidth: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))',
            transition: 'transform 0.5s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        />

        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default BrandHero;
