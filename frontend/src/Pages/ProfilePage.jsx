import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo, updatePassword, logout, deleteAccount } from '../store/userSlice';
import { fetchOrders } from '../store/orderSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser } = useSelector(state => state.user);
  const { items: orders, status: orderStatus } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [infoForm, setInfoForm] = useState({ ...currentUser });
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePass, setDeletePass] = useState('');

  useEffect(() => {
    if (orderStatus === 'idle') {
      dispatch(fetchOrders(currentUser.id));
    }
  }, [orderStatus, dispatch, currentUser.id]);

  const handleInfoChange = (e) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };
  
  const handlePassChange = (e) => {
    setPassForm({ ...passForm, [e.target.name]: e.target.value });
  };

  const onUpdateInfo = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(infoForm));
    toast.success('Profile updated successfully!');
  };

  const onUpdatePass = (e) => {
    e.preventDefault();
    if (passForm.new !== passForm.confirm) {
      return toast.error('New passwords do not match');
    }
    dispatch(updatePassword(passForm));
    toast.success('Password changed successfully!');
    setPassForm({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (!deletePass) return toast.error('Please enter your password');
    dispatch(deleteAccount());
    toast.success('Account deleted');
    navigate('/register');
  };
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      backgroundColor: 'var(--white)',
      minHeight: '100vh'
    }}>
      {/* ... (Header and Forms sections remain same) */}
      {/* (Adding the sections back correctly below) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4rem',
        padding: '2rem',
        backgroundColor: 'var(--primary-green)',
        borderRadius: '24px',
        border: '1px solid rgba(46, 125, 50, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '4px solid var(--accent-green)',
            overflow: 'hidden',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            <img src={currentUser.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark-green)' }}>{currentUser.name}</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>{currentUser.email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleLogout} style={secondaryBtnStyle}>Logout</button>
          <button onClick={() => setShowDeleteModal(true)} style={dangerBtnStyle}>Delete Account</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
        {/* General Info Form */}
        <section>
          <h2 style={sectionTitleStyle}>General Information</h2>
          <form onSubmit={onUpdateInfo} style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" name="name" value={infoForm.name} onChange={handleInfoChange} style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" name="email" value={infoForm.email} onChange={handleInfoChange} style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" name="phone_number" value={infoForm.phone_number} onChange={handleInfoChange} style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Region</label>
              <input type="text" name="region" value={infoForm.region} onChange={handleInfoChange} style={inputStyle} />
            </div>
            <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }}>
              <label style={labelStyle}>Home Address</label>
              <input type="text" name="adress" value={infoForm.adress} onChange={handleInfoChange} style={inputStyle} />
            </div>
            <button type="submit" style={primaryBtnStyle}>Save Changes</button>
          </form>
        </section>

        {/* Password Update Form */}
        <section>
          <h2 style={sectionTitleStyle}>Security Settings</h2>
          <form onSubmit={onUpdatePass} style={{ ...formGridStyle, gridTemplateColumns: '1fr' }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Current Password</label>
              <input type="password" name="current" value={passForm.current} onChange={handlePassChange} required style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>New Password</label>
              <input type="password" name="new" value={passForm.new} onChange={handlePassChange} required style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Confirm New Password</label>
              <input type="password" name="confirm" value={passForm.confirm} onChange={handlePassChange} required style={inputStyle} />
            </div>
            <button type="submit" style={{ ...primaryBtnStyle, width: '100%' }}>Update Password</button>
          </form>
        </section>
      </div>

      {/* Orders Section */}
      <section style={{ 
        paddingTop: '4rem', 
        borderTop: '1px solid #eee' 
      }}>
        <h2 style={sectionTitleStyle}>Order History</h2>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem' 
        }}>
          {orderStatus === 'loading' ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p style={{ color: 'var(--text-light)' }}>You haven't placed any orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{
                padding: '1.5rem 2rem',
                backgroundColor: '#f9fdfa',
                borderRadius: '16px',
                border: '1px solid rgba(46, 125, 50, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--dark-green)', marginBottom: '0.4rem' }}>Order #{order.id}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Placed on {order.date} • {order.items} items</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.4rem' }}>${order.total.toFixed(2)}</p>
                  <span style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    backgroundColor: order.status === 'Delivered' ? '#e6fffa' : '#fffaf0',
                    color: order.status === 'Delivered' ? '#2c7a7b' : '#b7791f'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ... (Modal remains same) */}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ color: '#c53030', marginBottom: '1rem', fontSize: '1.5rem' }}>Delete Account?</h3>
            <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
              This action is permanent. Please enter your password to confirm.
            </p>
            <input 
              type="password" 
              placeholder="Your Password" 
              value={deletePass}
              onChange={(e) => setDeletePass(e.target.value)}
              style={{ ...inputStyle, marginBottom: '2rem' }}
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDeleteModal(false)} style={secondaryBtnStyle}>Cancel</button>
              <button onClick={handleDeleteAccount} style={dangerBtnStyle}>Confirm Deletion</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const sectionTitleStyle = { fontSize: '1.8rem', fontWeight: '800', marginBottom: '2.5rem', color: 'var(--dark-green)' };
const formGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const labelStyle = { fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-dark)' };
const inputStyle = {
  padding: '1rem',
  borderRadius: '12px',
  border: '1px solid #eee',
  fontSize: '1rem',
  outline: 'none',
  backgroundColor: '#f9f9f9',
  transition: 'all 0.3s ease'
};
const primaryBtnStyle = {
  gridColumn: 'span 2',
  backgroundColor: 'var(--dark-green)',
  color: 'white',
  padding: '1.2rem',
  borderRadius: '12px',
  fontWeight: '800',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)'
};
const secondaryBtnStyle = {
  backgroundColor: 'white',
  color: 'var(--dark-green)',
  padding: '0.8rem 1.5rem',
  borderRadius: '10px',
  fontWeight: '700',
  border: '1px solid rgba(46, 125, 50, 0.2)',
  cursor: 'pointer'
};
const dangerBtnStyle = {
  backgroundColor: '#fff5f5',
  color: '#c53030',
  padding: '0.8rem 1.5rem',
  borderRadius: '10px',
  fontWeight: '700',
  border: '1px solid #feb2b2',
  cursor: 'pointer'
};
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
};
const modalContentStyle = {
  backgroundColor: 'white', padding: '3rem', borderRadius: '24px', maxWidth: '500px', width: '90%', textAlign: 'center'
};

export default ProfilePage;
