import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity, clearCart } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../store/orderSlice';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, status } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price using nested product info
  const totalPrice = items.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const handleUpdateQty = (productId, newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartQuantity({ productId, quantity: newQty }));
  };

  const handleCheckout = async () => {
    toast.promise(
      dispatch(createOrder()).unwrap(),
      {
        loading: 'Processing your order...',
        success: 'Order placed successfully!',
        error: (err) => err || 'Failed to place order'
      }
    ).then(() => {
      navigate('/profile');
    }).catch(() => {});
  };

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', padding: '10rem 0', fontSize: '1.5rem' }}>Loading your cart...</div>;
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={pageTitleStyle}>Shopping Bag</h1>
        {items.length > 0 && (
          <button onClick={() => dispatch(clearCart())} style={clearCartBtnStyle}>
            Clear Bag
          </button>
        )}
      </div>
      
      {items.length === 0 ? (
        <div style={emptyCartStyle}>
          <div style={{ marginBottom: '2rem' }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--dark-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h2 style={{ color: 'var(--dark-green)', marginBottom: '1rem' }}>Your bag is empty</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Sounds like a good time to start shopping!</p>
          <Link to="/products" style={shopLinkStyle}>Browse Products</Link>
        </div>
      ) : (
        <div style={contentLayoutStyle}>
          {/* Cart Items List */}
          <div style={itemsListStyle}>
            {items.map(item => {
              const product = item.product;
              if (!product) return null;
              
              const imageUrl = product.image?.startsWith('http') 
                ? product.image 
                : `http://localhost:4000/api/products/${encodeURIComponent(product.image.replace(/\\/g, '/'))}`;

              return (
                <div key={item._id || item.productId} style={cartItemStyle}>
                  <img src={imageUrl} alt={product.title} style={itemImageStyle} />
                  
                  <div style={itemInfoStyle}>
                    <h3 style={itemTitleStyle}>{product.title}</h3>
                    <p style={itemCategoryStyle}>{product.category}</p>
                    <p style={itemPriceStyle}>${product.price.toFixed(2)}</p>
                  </div>

                  <div style={qtyControlStyle}>
                    <button onClick={() => handleUpdateQty(item.productId, item.quantity - 1)} style={qtyBtnStyle}>-</button>
                    <span style={qtyValueStyle}>{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item.productId, item.quantity + 1)} style={qtyBtnStyle}>+</button>
                  </div>

                  <div style={itemTotalStyle}>
                    ${(product.price * item.quantity).toFixed(2)}
                  </div>

                  <button onClick={() => dispatch(removeFromCart(item.productId))} style={removeBtnStyle}>
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Order Summary Card */}
          <div style={summaryCardStyle}>
            <h2 style={summaryTitleStyle}>Order Summary</h2>
            <div style={summaryRowStyle}>
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={summaryRowStyle}>
              <span>Shipping</span>
              <span style={{ color: '#2ecc71', fontWeight: '700' }}>FREE</span>
            </div>
            <div style={{ ...summaryRowStyle, borderTop: '1px solid #eee', marginTop: '1.5rem', paddingTop: '1.5rem', fontWeight: '900', fontSize: '1.4rem' }}>
              <span>Total</span>
              <span style={{ color: 'var(--dark-green)' }}>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button onClick={handleCheckout} style={checkoutBtnStyle}>
              Proceed to Checkout
            </button>
            
            <Link to="/products" style={continueShopStyle}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1300px', margin: '0 auto', padding: '4rem 2rem' };
const pageTitleStyle = { fontSize: '3rem', fontWeight: '900', color: 'var(--dark-green)', margin: 0 };
const clearCartBtnStyle = { background: 'none', border: 'none', color: '#ff4d4f', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' };
const contentLayoutStyle = { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' };
const emptyCartStyle = { textAlign: 'center', padding: '8rem 2rem', backgroundColor: '#f9fdfa', borderRadius: '40px', border: '1px dashed var(--primary-green)' };
const itemsListStyle = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };

const cartItemStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  padding: '1.5rem', 
  backgroundColor: 'white', 
  borderRadius: '24px', 
  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
  gap: '2rem',
  position: 'relative'
};

const itemImageStyle = { width: '100px', height: '100px', objectFit: 'contain', backgroundColor: '#f9f9f9', borderRadius: '16px', padding: '10px' };
const itemInfoStyle = { flex: 1 };
const itemTitleStyle = { fontSize: '1.1rem', fontWeight: '800', color: 'var(--dark-green)', marginBottom: '0.3rem' };
const itemCategoryStyle = { fontSize: '0.85rem', color: '#999', marginBottom: '0.5rem', textTransform: 'uppercase' };
const itemPriceStyle = { fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-green)' };

const qtyControlStyle = { display: 'flex', alignItems: 'center', border: '2px solid #eee', borderRadius: '50px', padding: '5px' };
const qtyBtnStyle = { width: '35px', height: '35px', borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--dark-green)' };
const qtyValueStyle = { width: '40px', textAlign: 'center', fontWeight: '800', fontSize: '1.1rem' };

const itemTotalStyle = { fontSize: '1.3rem', fontWeight: '900', color: 'var(--dark-green)', minWidth: '100px', textAlign: 'right' };
const removeBtnStyle = { background: '#f5f5f5', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', color: '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' };

const summaryCardStyle = { backgroundColor: 'white', padding: '2.5rem', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', position: 'sticky', top: '100px' };
const summaryTitleStyle = { fontSize: '1.8rem', fontWeight: '900', color: 'var(--dark-green)', marginBottom: '2rem' };
const summaryRowStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', color: '#666' };
const checkoutBtnStyle = { width: '100%', backgroundColor: 'var(--dark-green)', color: 'white', border: 'none', borderRadius: '50px', padding: '1.4rem', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', marginTop: '2rem', boxShadow: '0 15px 30px rgba(46, 125, 50, 0.2)', transition: 'all 0.3s ease' };
const continueShopStyle = { display: 'block', textAlign: 'center', marginTop: '1.5rem', color: 'var(--accent-green)', fontWeight: '700', textDecoration: 'none' };
const shopLinkStyle = { backgroundColor: 'var(--dark-green)', color: 'white', padding: '1.2rem 3rem', borderRadius: '50px', fontWeight: '800', textDecoration: 'none', display: 'inline-block', boxShadow: '0 15px 30px rgba(46, 125, 50, 0.2)' };

export default CartPage;
