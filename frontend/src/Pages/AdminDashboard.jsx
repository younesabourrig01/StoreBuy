import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo, updatePassword, logout, deleteAccount } from '../store/userSlice';
import { fetchProducts, addProduct, updateProduct } from '../store/productSlice';
import { fetchAllOrders } from '../store/orderSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Icons as SVG components
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BoxIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const ListIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const LogoutIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const PlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;

const AdminDashboard = () => {
  const { currentUser } = useSelector(state => state.user);
  const { items: products, status: productStatus } = useSelector(state => state.products);
  const { allOrders: orders, adminStatus: orderStatus } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Forms states
  const [infoForm, setInfoForm] = useState({ ...currentUser });
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });
  const [infoFile, setInfoFile] = useState(null);
  const [productFile, setProductFile] = useState(null);

  useEffect(() => {
    if (productStatus === 'idle') dispatch(fetchProducts());
    if (orderStatus === 'idle') dispatch(fetchAllOrders());
  }, [productStatus, orderStatus, dispatch]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      if (type === 'info') setInfoFile(file);
      else setProductFile(file);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    navigate('/login');
  };

  const onUpdateInfo = (e) => {
    e.preventDefault();
    // In a real app, you'd upload the file first
    const updatedData = { ...infoForm };
    if (infoFile) {
      updatedData.image = URL.createObjectURL(infoFile);
    }
    dispatch(updateUserInfo(updatedData));
    toast.success('Profile updated successfully!');
    setInfoFile(null);
  };

  const onUpdatePass = (e) => {
    e.preventDefault();
    if (!passForm.current) return toast.error('Current password is required');
    if (passForm.new !== passForm.confirm) return toast.error('New passwords do not match');
    dispatch(updatePassword(passForm));
    toast.success('Password updated successfully!');
    setPassForm({ current: '', new: '', confirm: '' });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const finalProduct = { ...productForm };
    if (productFile) {
      finalProduct.image = URL.createObjectURL(productFile);
    }

    if (editingProduct) {
      dispatch(updateProduct({ ...finalProduct, id: editingProduct.id }));
      toast.success('Product updated!');
    } else {
      dispatch(addProduct(finalProduct));
      toast.success('Product added!');
    }
    setShowProductModal(false);
    setEditingProduct(null);
    setProductFile(null);
    setProductForm({ title: '', price: '', description: '', category: '', image: '', rating: { rate: 0, count: 0 } });
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductModal(true);
  };

  return (
    <div style={dashboardContainer} className="admin-dashboard-container">
      {/* Sidebar / Mobile Nav */}
      <div style={sidebarStyle} className="admin-sidebar">
        <div style={sidebarLogo} className="hide-mobile">
          <h2 style={{ color: 'var(--dark-green)', fontWeight: '900', letterSpacing: '-0.5px' }}>StoreBuy Admin</h2>
        </div>
        <nav style={navStyle} className="admin-nav">
          <button 
            onClick={() => setActiveTab('profile')} 
            style={activeTab === 'profile' ? activeTabBtn : navBtn}
          >
            <UserIcon /> <span className="nav-text">Profile</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            style={activeTab === 'products' ? activeTabBtn : navBtn}
          >
            <BoxIcon /> <span className="nav-text">Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            style={activeTab === 'orders' ? activeTabBtn : navBtn}
          >
            <ListIcon /> <span className="nav-text">Orders</span>
          </button>
          <div style={logoutWrapper} className="logout-section">
            <button onClick={handleLogout} style={logoutBtn}>
              <LogoutIcon /> <span className="nav-text">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={mainContentStyle} className="admin-main">
        <header style={headerStyle} className="admin-header">
          <div>
            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }} className="hide-mobile">Welcome back,</p>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div style={userBadge} className="hide-mobile">
            <img src={currentUser.image} alt="Admin" style={avatarStyle} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{currentUser.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--dark-green)', fontWeight: '600' }}>Admin</span>
            </div>
          </div>
        </header>

        <div style={contentArea}>
          {activeTab === 'profile' && (
            <div style={contentStack}>
              <section style={cardStyle}>
                <h2 style={cardTitle}>Account Details</h2>
                <form onSubmit={onUpdateInfo} style={formGridResponsive}>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" value={infoForm.name} onChange={e => setInfoForm({...infoForm, name: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" value={infoForm.email} onChange={e => setInfoForm({...infoForm, email: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" value={infoForm.phone_number || ''} onChange={e => setInfoForm({...infoForm, phone_number: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Region</label>
                    <input type="text" value={infoForm.region || ''} onChange={e => setInfoForm({...infoForm, region: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={{ ...inputGroup, gridColumn: 'span 1' }} className="full-width-mobile">
                    <label style={labelStyle}>Home Address</label>
                    <input type="text" value={infoForm.adress || ''} onChange={e => setInfoForm({...infoForm, adress: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={{ ...inputGroup, gridColumn: 'span 1' }} className="full-width-mobile">
                    <label style={labelStyle}>Profile Image (Max 2MB)</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="file" 
                        id="admin-image-upload"
                        accept="image/*" 
                        onChange={e => handleFileChange(e, 'info')} 
                        style={{ display: 'none' }} 
                      />
                      <label 
                        htmlFor="admin-image-upload"
                        style={fileInputAreaStyle}
                      >
                        <div style={fileIconWrapper}>
                          <PlusIcon />
                        </div>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                          {infoFile ? infoFile.name : 'Update Profile Photo'}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div style={{ gridColumn: 'span 1', marginTop: '1rem' }} className="full-width-mobile">
                    <button type="submit" style={primaryBtn}>Save Changes</button>
                  </div>
                </form>
              </section>

              <section style={cardStyle}>
                <h2 style={cardTitle}>Security</h2>
                <form onSubmit={onUpdatePass} style={formGridResponsive}>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Current Password</label>
                    <input type="password" required value={passForm.current} onChange={e => setPassForm({...passForm, current: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={inputGroup}>
                    <label style={labelStyle}>New Password</label>
                    <input type="password" value={passForm.new} onChange={e => setPassForm({...passForm, new: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={inputGroup}>
                    <label style={labelStyle}>Confirm New Password</label>
                    <input type="password" value={passForm.confirm} onChange={e => setPassForm({...passForm, confirm: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={{ gridColumn: 'span 1', marginTop: '1rem' }} className="full-width-mobile">
                    <button type="submit" style={{ ...primaryBtn, backgroundColor: '#333' }}>Update Security</button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {activeTab === 'products' && (
            <section style={cardStyle}>
              <div style={sectionHeaderResponsive}>
                <div>
                  <h2 style={{ ...cardTitle, marginBottom: '0.5rem' }}>Inventory</h2>
                  <p style={{ color: '#666', fontSize: '0.8rem' }} className="hide-mobile">Manage store catalog</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({ title: '', price: '', description: '', category: '', image: '', rating: { rate: 0, count: 0 } });
                    setShowProductModal(true);
                  }} 
                  style={addBtn}
                >
                  <PlusIcon /> <span className="hide-mobile">Add Product</span>
                </button>
              </div>
              <div style={tableWrapper}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="hide-mobile">Category</th>
                      <th>Price</th>
                      <th className="hide-mobile">Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <img src={product.image} style={tableImg} alt="" />
                            <span style={{ fontWeight: '600', fontSize: '0.85rem', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {product.title}
                            </span>
                          </div>
                        </td>
                        <td className="hide-mobile"><span style={categoryBadge}>{product.category}</span></td>
                        <td><span style={{ fontWeight: '700', fontSize: '0.85rem' }}>${product.price}</span></td>
                        <td className="hide-mobile"><span style={activeStatus}>In Stock</span></td>
                        <td>
                          <button onClick={() => openEditModal(product)} style={editBtn}>
                            <EditIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'orders' && (
            <section style={cardStyle}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ ...cardTitle, marginBottom: '0.5rem' }}>Orders</h2>
              </div>
              <div style={tableWrapper}>
                <table style={tableStyle}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th className="hide-mobile">Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td style={{ fontWeight: '700', fontSize: '0.85rem' }}>#{order.id.slice(-3)}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{order.userName}</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '0.8rem' }} className="hide-mobile">{order.date}</td>
                        <td><span style={{ fontWeight: '800', fontSize: '0.85rem' }}>${order.total.toFixed(2)}</span></td>
                        <td>
                          <span style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '50px',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            backgroundColor: order.status === 'Delivered' ? '#e6fffa' : '#fffaf0',
                            color: order.status === 'Delivered' ? '#2c7a7b' : '#b7791f'
                          }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div style={modalOverlay}>
          <div style={modalContent} className="admin-modal">
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                {editingProduct ? 'Update Product' : 'New Product'}
              </h2>
            </div>
            <form onSubmit={handleProductSubmit} style={formStyle}>
              <div style={inputGroup}>
                <label style={labelStyle}>Title</label>
                <input type="text" required value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} style={inputStyle} />
              </div>
              <div style={formGridResponsive}>
                <div style={inputGroup}>
                  <label style={labelStyle}>Price</label>
                  <input type="number" required step="0.01" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} style={inputStyle} />
                </div>
                <div style={inputGroup}>
                  <label style={labelStyle}>Category</label>
                  <input type="text" required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Product Image (Max 2MB)</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="file" 
                    id="product-image-upload"
                    accept="image/*" 
                    onChange={e => handleFileChange(e, 'product')} 
                    style={{ display: 'none' }} 
                  />
                  <label 
                    htmlFor="product-image-upload"
                    style={fileInputAreaStyle}
                  >
                    <div style={fileIconWrapper}>
                      <PlusIcon />
                    </div>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {productFile ? productFile.name : 'Upload Product Image'}
                    </span>
                  </label>
                </div>
                {!productFile && editingProduct && <p style={{ fontSize: '0.7rem', color: '#666' }}>Current image will be kept unless changed.</p>}
              </div>
              <div style={inputGroup}>
                <label style={labelStyle}>Description</label>
                <textarea rows="3" required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} style={{...inputStyle, resize: 'none'}} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowProductModal(false)} style={secondaryBtn}>Discard</button>
                <button type="submit" style={primaryBtn}>Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-dashboard-container {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100% !important;
            height: auto !important;
            position: sticky !important;
            top: 60px !important;
            left: 0 !important;
            z-index: 100 !important;
            padding: 0.75rem 1rem !important;
            border-right: none !important;
            border-bottom: 1px solid #edf2ef !important;
            background-color: white !important;
            flex-direction: row !important;
          }
          .admin-nav {
            flex-direction: row !important;
            justify-content: space-around !important;
            gap: 0.5rem !important;
            width: 100% !important;
          }
          .admin-nav button {
            flex: 1 !important;
            flex-direction: column !important;
            align-items: center !important;
            padding: 0.6rem 0.4rem !important;
            font-size: 0.75rem !important;
            gap: 0.3rem !important;
            border-radius: 12px !important;
          }
          .nav-text {
            display: block !important;
            font-size: 0.65rem !important;
            font-weight: 700 !important;
          }
          .logout-section {
            display: none !important;
          }
          .admin-main {
            padding: 1rem !important;
            margin-bottom: 0 !important;
          }
          .admin-header {
            margin-bottom: 1.5rem !important;
            padding-top: 1rem !important;
          }
          .admin-modal {
            padding: 1.5rem !important;
            width: 95% !important;
          }
          .full-width-mobile {
            grid-column: span 1 !important;
          }
          .card-style {
            padding: 1.25rem !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

// Styles (mostly same but added some flex/grid helpers)
const dashboardContainer = { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fbf9', color: '#1a1a1a', fontFamily: 'Inter, sans-serif' };
const sidebarStyle = { width: '280px', backgroundColor: 'white', borderRight: '1px solid #edf2ef', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', transition: 'all 0.3s' };
const sidebarLogo = { marginBottom: '3.5rem', paddingLeft: '0.5rem' };
const navStyle = { display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 };
const navBtn = { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem 1.2rem', textAlign: 'left', background: 'none', border: 'none', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '600', color: '#718096', fontSize: '0.95rem' };
const activeTabBtn = { ...navBtn, backgroundColor: '#f0fdf4', color: 'var(--dark-green)' };
const logoutBtn = { ...navBtn, color: '#e53e3e', width: '100%' };
const logoutWrapper = { marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '1.5rem' };

const mainContentStyle = { flex: 1, padding: '3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3.5rem' };
const userBadge = { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.2rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f0f4f2' };
const avatarStyle = { width: '42px', height: '42px', borderRadius: '12px', objectFit: 'cover' };

const contentArea = { width: '100%' };
const contentStack = { display: 'flex', flexDirection: 'column', gap: '2rem' };
const cardStyle = { backgroundColor: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', border: '1px solid #f0f4f2' };
const cardTitle = { fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', color: '#2d3748' };

const formGridResponsive = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' };
const sectionHeaderResponsive = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1rem' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '1.2rem' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '0.4rem' };
const labelStyle = { fontSize: '0.8rem', fontWeight: '700', color: '#4a5568' };
const inputStyle = { padding: '0.8rem 1rem', borderRadius: '12px', border: '1.5px solid #edf2f0', backgroundColor: '#f9fbfb', outline: 'none', fontSize: '0.9rem' };

const primaryBtn = { padding: '0.8rem 1.5rem', backgroundColor: 'var(--dark-green)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' };
const secondaryBtn = { padding: '0.8rem 1.5rem', backgroundColor: '#f7fafc', color: '#718096', border: '1.5px solid #edf2f7', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' };

const addBtn = { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.2rem', backgroundColor: 'var(--dark-green)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' };
const fileInputAreaStyle = { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', borderRadius: '12px', border: '2.5px dashed rgba(46, 125, 50, 0.15)', backgroundColor: '#f9fdfa', cursor: 'pointer', fontSize: '0.9rem', color: '#718096', transition: 'all 0.3s ease' };
const fileIconWrapper = { backgroundColor: 'var(--primary-green)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const tableWrapper = { overflowX: 'auto', width: '100%' };
const tableStyle = { width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem', minWidth: '500px' };
const tableImg = { width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#f8fbf9' };
const categoryBadge = { padding: '0.3rem 0.6rem', backgroundColor: '#edf2f7', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', color: '#4a5568' };
const activeStatus = { fontSize: '0.7rem', fontWeight: '700', color: '#38a169' };
const editBtn = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', backgroundColor: '#f0f9ff', color: '#3182ce', border: 'none', borderRadius: '8px', cursor: 'pointer' };

const modalOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 };
const modalContent = { backgroundColor: 'white', padding: '2.5rem', borderRadius: '28px', width: '90%', maxWidth: '600px' };

export default AdminDashboard;
