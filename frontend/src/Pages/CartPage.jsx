import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--dark-green)' }}>Your Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>Your cart is empty.</p>
          <Link to="/products" style={{ 
            display: 'inline-block', 
            marginTop: '1.5rem', 
            color: 'var(--accent-green)', 
            fontWeight: '700',
            textDecoration: 'underline'
          }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              gap: '2rem'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--accent-green)', fontWeight: '700', fontSize: '1.1rem' }}>${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                  style={qtyBtnStyle}
                >-</button>
                <span style={{ fontWeight: '700' }}>{item.quantity}</span>
                <button 
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  style={qtyBtnStyle}
                >+</button>
              </div>
              <button 
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e53e3e',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Remove
              </button>
            </div>
          ))}
          
          <div style={{ 
            marginTop: '2rem', 
            padding: '2rem', 
            backgroundColor: 'var(--primary-green)', 
            borderRadius: '15px',
            textAlign: 'right'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Total: ${totalPrice.toFixed(2)}</h2>
            <button style={{
              backgroundColor: 'var(--dark-green)',
              color: 'white',
              padding: '1.2rem 3rem',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '1.1rem',
              boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)'
            }}>
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const qtyBtnStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontWeight: '700'
};

export default CartPage;
