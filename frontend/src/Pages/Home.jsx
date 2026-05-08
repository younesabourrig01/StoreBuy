import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import Card from '../Components/Card';
import BrandHero from '../Components/BrandHero';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const suggestedProducts = items.slice(0, 3);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "575e3bd3-3353-4ef0-b698-e90a605d9304");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Success! Your message has been sent.");
        e.target.reset();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        padding: '2rem',
        backgroundColor: 'var(--primary-green)',
        borderBottom: '1px solid rgba(46, 125, 50, 0.1)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>

        <div className="hero-container" style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4rem',
          zIndex: 1,
          flexWrap: 'wrap-reverse'
        }}>
          {/* Text Content */}
          <div style={{
            flex: '1',
            minWidth: '300px',
            textAlign: 'left',
            animation: 'slideInLeft 1s ease-out'
          }}>
            <h1 style={{
              fontSize: '4.5rem',
              marginBottom: '1.5rem',
              fontWeight: '900',
              letterSpacing: '-2px',
              lineHeight: '1',
              color: 'var(--dark-green)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.05)'
            }}>
              Welcome to <span style={{ color: 'var(--accent-green)' }}>StoreBuy</span>
            </h1>
            <p style={{
              fontSize: '1.4rem',
              color: 'var(--text-light)',
              marginBottom: '3rem',
              maxWidth: '550px',
              lineHeight: '1.5'
            }}>
              Discover premium products curated just for you. Experience the next level of smart shopping with quality and reliability.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button 
                onClick={() => navigate('/products')}
                style={{
                  backgroundColor: 'var(--dark-green)',
                  color: 'white',
                  padding: '1.2rem 3.5rem',
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-green)';
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(46, 125, 50, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--dark-green)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(46, 125, 50, 0.2)';
                }}
              >
                Explore Collections
              </button>
            </div>
          </div>

          {/* Logo/Image Content */}
          <BrandHero width="550px" />
        </div>
      </section>

      {/* Suggested Products Section */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: '900', letterSpacing: '-1px' }}>
            Suggested For You
          </h2>
          <div style={{ width: '60px', height: '5px', backgroundColor: 'var(--accent-green)', margin: '0 auto', borderRadius: '10px' }}></div>
        </div>

        {status === 'loading' && <p style={{ textAlign: 'center' }}>Loading products...</p>}
        {status === 'failed' && <p style={{ textAlign: 'center', color: 'red' }}>Error loading products.</p>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          justifyContent: 'center'
        }}>
          {suggestedProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Connect With Us Section */}
      <section style={{ 
        padding: '8rem 2rem', 
        backgroundColor: '#f9fdfa', 
        borderTop: '1px solid rgba(46, 125, 50, 0.05)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '900', color: 'var(--dark-green)' }}>
            Connect With Us
          </h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '4rem', fontSize: '1.2rem' }}>
            Have questions or feedback? We'd love to hear from you.
          </p>
          
          <form onSubmit={handleContactSubmit} style={{ 
            backgroundColor: 'white', 
            padding: '3.5rem', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={contactLabelStyle}>Your Name</label>
                <input type="text" name="name" placeholder="John Doe" required style={contactInputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={contactLabelStyle}>Email Address</label>
                <input type="email" name="email" placeholder="john@example.com" required style={contactInputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={contactLabelStyle}>Message Subject</label>
              <input type="text" name="subject" placeholder="What is this about?" required style={contactInputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={contactLabelStyle}>Your Message</label>
              <textarea name="message" placeholder="Write your message here..." required style={{ ...contactInputStyle, minHeight: '150px', resize: 'vertical' }}></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
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
                boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <style>
        {`
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @media (max-width: 768px) {
            .hero-container {
              flex-direction: column-reverse !important;
              text-align: center !important;
              padding: 2rem 0;
            }
            .hero-container > div {
              text-align: center !important;
              min-width: 100% !important;
            }
            .hero-container h1 {
              font-size: 3rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const contactLabelStyle = {
  fontSize: '0.95rem',
  fontWeight: '700',
  color: 'var(--text-dark)'
};

const contactInputStyle = {
  padding: '1rem 1.2rem',
  borderRadius: '12px',
  border: '1px solid #eee',
  fontSize: '1rem',
  outline: 'none',
  backgroundColor: '#f9f9f9',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease'
};

export default Home;
