import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateProfile, changePassword, logoutUser, deleteAccount } from '../store/authSlice';
import { fetchOrders } from '../store/orderSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user: currentUser, status: authStatus } = useSelector(state => state.auth);
  const { items: orders, status: orderStatus } = useSelector(state => state.orders);

  const [infoForm, setInfoForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    adress: '',
    region: ''
  });
  
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePass, setDeletePass] = useState('');
  const [profileFile, setProfileFile] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser) {
      setInfoForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone_number: currentUser.phone_number || '',
        adress: currentUser.adress || '',
        region: currentUser.region || ''
      });
      
      if (orderStatus === 'idle') {
        dispatch(fetchOrders(currentUser.id || currentUser._id));
      }
    }
  }, [currentUser, dispatch, orderStatus]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      setProfileFile(file);
    }
  };

  const handleInfoChange = (e) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };
  
  const handlePassChange = (e) => {
    setPassForm({ ...passForm, [e.target.name]: e.target.value });
  };

  const onUpdateInfo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(infoForm).forEach(key => data.append(key, infoForm[key]));
    if (profileFile) {
      data.append('image', profileFile);
    }

    const resultAction = await dispatch(updateProfile(data));
    if (updateProfile.fulfilled.match(resultAction)) {
      toast.success('Profile updated successfully!');
      setProfileFile(null);
    } else {
      toast.error(resultAction.payload || 'Failed to update profile');
    }
  };

  const onUpdatePass = async (e) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirm) {
      return toast.error('New passwords do not match');
    }
    
    const resultAction = await dispatch(changePassword({
      currentPassword: passForm.currentPassword,
      newPassword: passForm.newPassword
    }));

    if (changePassword.fulfilled.match(resultAction)) {
      toast.success('Password changed successfully!');
      setPassForm({ currentPassword: '', newPassword: '', confirm: '' });
    } else {
      toast.error(resultAction.payload || 'Failed to update password');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!deletePass) return toast.error('Please enter your password to confirm');
    
    const resultAction = await dispatch(deleteAccount(deletePass));
    if (deleteAccount.fulfilled.match(resultAction)) {
      toast.success('Your account has been deleted.');
      navigate('/register');
    } else {
      toast.error(resultAction.payload || 'Failed to delete account');
    }
  };

  const userAvatar = currentUser?.image 
    ? `http://localhost:4000/api/auth/uploads/${encodeURIComponent(currentUser.image.replace(/\\/g, '/'))}` 
    : 'https://via.placeholder.com/150';



  if (!currentUser && authStatus !== 'loading') {
    return <div style={{ textAlign: 'center', padding: '5rem' }}>Please log in to view your profile.</div>;
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 1rem',
      backgroundColor: 'var(--white)',
      minHeight: '100vh'
    }}>
      <div style={profileHeaderStyle} className="profile-header">
        <div style={profileInfoWrapperStyle} className="profile-info">
          <div style={avatarWrapperStyle}>
            <img src={userAvatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={profileNameStyle}>{currentUser?.name}</h1>
            <p style={profileEmailStyle}>{currentUser?.email}</p>
          </div>
        </div>
        <div style={headerActionsStyle} className="profile-actions">
          <button onClick={handleLogout} style={secondaryBtnStyle}>Logout</button>
          <button onClick={() => setShowDeleteModal(true)} style={dangerBtnStyle}>Delete Account</button>
        </div>
      </div>

      <div style={formsGridStyle}>
        {/* General Info Form */}
        <section>
          <h2 style={sectionTitleStyle}>General Information</h2>
          <form onSubmit={onUpdateInfo} style={formGridStyle} className="form-grid">
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
            <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }} className="full-width">
              <label style={labelStyle}>Home Address</label>
              <input type="text" name="adress" value={infoForm.adress} onChange={handleInfoChange} style={inputStyle} />
            </div>
            <div style={{ ...inputGroupStyle, gridColumn: 'span 2' }} className="full-width">
              <label style={labelStyle}>Profile Image</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="file" 
                  id="user-profile-upload"
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                />
                <label htmlFor="user-profile-upload" style={fileInputAreaStyle}>
                  <div style={fileIconWrapperStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--dark-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {profileFile ? profileFile.name : 'Update profile picture'}
                  </span>
                </label>
              </div>
            </div>
            <button type="submit" style={primaryBtnStyle} disabled={authStatus === 'loading'}>
              {authStatus === 'loading' ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </section>

        {/* Password Update Form */}
        <section>
          <h2 style={sectionTitleStyle}>Security Settings</h2>
          <form onSubmit={onUpdatePass} style={{ ...formGridStyle, gridTemplateColumns: '1fr' }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Current Password</label>
              <input type="password" name="currentPassword" value={passForm.currentPassword} onChange={handlePassChange} required style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>New Password</label>
              <input type="password" name="newPassword" value={passForm.newPassword} onChange={handlePassChange} required style={inputStyle} />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Confirm New Password</label>
              <input type="password" name="confirm" value={passForm.confirm} onChange={handlePassChange} required style={inputStyle} />
            </div>
            <button type="submit" style={{ ...primaryBtnStyle, gridColumn: 'span 1' }}>Update Password</button>
          </form>
        </section>
      </div>

      {/* Order History Section */}
      <section style={{ marginTop: '5rem' }}>
        <h2 style={sectionTitleStyle}>Order History</h2>
        {orderStatus === 'loading' ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#f9f9f9', borderRadius: '20px' }}>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Order ID</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Items</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={trStyle}>
                    <td style={tdStyle}>#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                    <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={tdStyle}>{order.items?.length || 0} items</td>
                    <td style={tdStyle}>${(order.totalPrice || 0).toFixed(2)}</td>
                    <td style={tdStyle}>
                      <span style={{
                        ...statusBadgeStyle,
                        backgroundColor: order.status === 'CONFIRMED' ? '#e6f4ea' : '#fef3c7',
                        color: order.status === 'CONFIRMED' ? '#1e4620' : '#92400e'
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

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
              style={modalInputStyle}
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setShowDeleteModal(false)} style={cancelBtnStyle}>Cancel</button>
              <button onClick={handleDeleteAccount} style={confirmDeleteBtnStyle}>Confirm Deletion</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .profile-header { flex-direction: column !important; text-align: center !important; }
          .profile-info { flex-direction: column !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .full-width { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  );
};

// Styles
const profileHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', padding: '2.5rem', backgroundColor: 'var(--primary-green)', borderRadius: '30px', border: '1px solid rgba(46, 125, 50, 0.1)', flexWrap: 'wrap', gap: '2rem' };
const profileInfoWrapperStyle = { display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' };
const avatarWrapperStyle = { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'white', border: '4px solid var(--accent-green)', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' };
const profileNameStyle = { fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark-green)', margin: 0 };
const profileEmailStyle = { color: 'var(--text-light)', fontSize: '1.1rem', margin: '0.5rem 0 0 0' };
const headerActionsStyle = { display: 'flex', gap: '1rem' };
const formsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem' };
const sectionTitleStyle = { fontSize: '1.8rem', fontWeight: '800', marginBottom: '2.5rem', color: 'var(--dark-green)' };
const formGridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const labelStyle = { fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-dark)' };
const inputStyle = { padding: '1rem', borderRadius: '12px', border: '1px solid #eee', fontSize: '1rem', outline: 'none', backgroundColor: '#f9f9f9', transition: 'all 0.3s ease' };
const primaryBtnStyle = { gridColumn: 'span 2', backgroundColor: 'var(--dark-green)', color: 'white', padding: '1.2rem', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease', boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)' };
const secondaryBtnStyle = { backgroundColor: 'white', color: 'var(--dark-green)', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '800', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' };
const dangerBtnStyle = { backgroundColor: '#fff5f5', color: '#c53030', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '800', border: '1px solid #feb2b2', cursor: 'pointer' };
const fileInputAreaStyle = { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', border: '2px dashed rgba(46, 125, 50, 0.2)', backgroundColor: '#f9fdfa', cursor: 'pointer', fontSize: '0.9rem', color: '#718096' };
const fileIconWrapperStyle = { backgroundColor: 'var(--primary-green)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center' };

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 };
const modalContentStyle = { backgroundColor: 'white', padding: '3rem', borderRadius: '24px', maxWidth: '500px', width: '90%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' };
const modalInputStyle = { padding: '1rem', borderRadius: '12px', border: '2px solid #eee', fontSize: '1.1rem', outline: 'none', backgroundColor: '#f9f9f9', width: '100%', marginBottom: '2rem', textAlign: 'center' };
const cancelBtnStyle = { backgroundColor: '#f5f5f5', color: '#555', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '800', border: 'none', cursor: 'pointer' };
const confirmDeleteBtnStyle = { backgroundColor: '#c53030', color: 'white', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '800', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(197, 48, 48, 0.3)' };

const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' };
const thStyle = { padding: '1.5rem 1rem', borderBottom: '2px solid #eee', color: 'var(--text-light)', fontWeight: '700', fontSize: '0.95rem' };
const trStyle = { borderBottom: '1px solid #f5f5f5', transition: 'background-color 0.2s' };
const tdStyle = { padding: '1.5rem 1rem', color: 'var(--dark-green)', fontWeight: '600', verticalAlign: 'middle' };
const statusBadgeStyle = { padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '800' };

export default ProfilePage;
