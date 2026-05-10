import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { items: favoriteItems } = useSelector(state => state.favorites);
  const isFavorite = favoriteItems.some(item => (item._id || item.id) === (product?._id || product?.id));

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(fetchProductById(id));
        if (fetchProductById.fulfilled.match(resultAction)) {
          setProduct(resultAction.payload);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.title} added to cart!`);
  };


  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product._id || product.id));
      toast.success('Removed from favorites');
    } else {
      dispatch(addFavorite(product));
      toast.success('Added to favorites');
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div className="skeleton-container">
          <div className="skeleton-image"></div>
          <div className="skeleton-info">
            <div className="skeleton-line large"></div>
            <div className="skeleton-line med"></div>
            <div className="skeleton-line small"></div>
            <div className="skeleton-line block"></div>
          </div>
        </div>
        <style>{`
          .skeleton-container { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 4rem 0; }
          .skeleton-image { height: 500px; background: #eee; border-radius: 20px; animation: pulse 1.5s infinite; }
          .skeleton-line { height: 20px; background: #eee; border-radius: 10px; margin-bottom: 1rem; animation: pulse 1.5s infinite; }
          .skeleton-line.large { height: 40px; width: 80%; }
          .skeleton-line.med { height: 30px; width: 40%; }
          .skeleton-line.block { height: 150px; width: 100%; }
          @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        `}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ ...containerStyle, textAlign: 'center', padding: '10rem 0' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--dark-green)' }}>404</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Oops! This product seems to have vanished.</p>
        <button onClick={() => navigate('/products')} style={primaryBtnStyle}>Discover Other Products</button>
      </div>
    );
  }

  const imageUrl = product.image?.startsWith('http') 
    ? product.image 
    : `http://localhost:4000/api/products/${encodeURIComponent(product.image.replace(/\\/g, '/'))}`;

  return (
    <div style={containerStyle}>
      <nav style={breadcrumbStyle}>
        <span onClick={() => navigate('/')}>Home</span>
        <span className="sep">/</span>
        <span onClick={() => navigate('/products')}>Shop</span>
        <span className="sep">/</span>
        <span className="current">{product.category}</span>
      </nav>

      <div style={contentGridStyle}>
        <div style={imageSectionStyle}>
          <div style={mainImageWrapperStyle}>
            <img src={imageUrl} alt={product.title} style={mainImageStyle} />
          </div>
          <div style={thumbGridStyle}>
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                style={{...thumbStyle, border: activeImage === i ? '2px solid var(--accent-green)' : '1px solid #eee'}}
                onClick={() => setActiveImage(i)}
              >
                <img src={imageUrl} alt="" style={{width: '100%', height: '100%', objectFit: 'contain', opacity: activeImage === i ? 1 : 0.5}} />
              </div>
            ))}
          </div>
        </div>

        <div style={infoSectionStyle}>
          <div style={badgeStyle}>{product.category}</div>
          <h1 style={titleStyle}>{product.title}</h1>
          <div style={priceContainerStyle}>
            <span style={priceStyle}>${product.price?.toFixed(2)}</span>
            <span style={stockStatusStyle}><span style={dotStyle}></span> In Stock</span>
          </div>
          <p style={descriptionStyle}>{product.description}</p>
          <div style={actionDividerStyle}></div>

          <div style={actionRowStyle}>
            <div style={quantitySelectorStyle}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={qtyBtnStyle}>-</button>
              <span style={qtyValueStyle}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={qtyBtnStyle}>+</button>
            </div>
            
            <button onClick={handleAddToCart} style={addToCartBtnStyle}>
              Add to Bag — ${(product.price * quantity).toFixed(2)}
            </button>

            <button 
              onClick={handleToggleFavorite}
              style={{
                ...favBtnStyle,
                color: isFavorite ? '#ff4d4f' : '#ccc',
                borderColor: isFavorite ? '#ff4d4f' : '#eee'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = { maxWidth: '1300px', margin: '0 auto', padding: '2rem 2rem 8rem 2rem' };
const breadcrumbStyle = { fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: '600', marginBottom: '3rem', display: 'flex', alignItems: 'center' };
const contentGridStyle = { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'start' };
const imageSectionStyle = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const mainImageWrapperStyle = { backgroundColor: '#fff', borderRadius: '24px', padding: '3rem', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' };
const mainImageStyle = { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' };
const thumbGridStyle = { display: 'flex', gap: '1rem' };
const thumbStyle = { width: '80px', height: '80px', borderRadius: '12px', padding: '10px', backgroundColor: '#fff', cursor: 'pointer', transition: 'all 0.3s ease' };
const infoSectionStyle = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
const badgeStyle = { backgroundColor: 'var(--primary-green)', color: 'var(--dark-green)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '800', width: 'fit-content', textTransform: 'uppercase', letterSpacing: '1px' };
const titleStyle = { fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '900', color: 'var(--dark-green)', margin: '0.5rem 0' };
const priceContainerStyle = { display: 'flex', alignItems: 'baseline', gap: '1.5rem', margin: '1rem 0' };
const priceStyle = { fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark-green)' };
const stockStatusStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#2e7d32', fontWeight: '700' };
const dotStyle = { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50' };
const descriptionStyle = { fontSize: '1.15rem', lineHeight: '1.8', color: '#555', marginTop: '1rem' };
const actionDividerStyle = { height: '1px', backgroundColor: '#eee', margin: '1rem 0' };
const actionRowStyle = { display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' };
const quantitySelectorStyle = { display: 'flex', alignItems: 'center', border: '2px solid #eee', borderRadius: '50px', padding: '0.5rem' };
const qtyBtnStyle = { width: '40px', height: '40px', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--dark-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const qtyValueStyle = { width: '40px', textAlign: 'center', fontSize: '1.2rem', fontWeight: '700' };
const addToCartBtnStyle = { flexGrow: 1, backgroundColor: 'var(--dark-green)', color: 'white', border: 'none', borderRadius: '50px', padding: '1.4rem 2rem', fontSize: '1.1rem', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 30px rgba(46, 125, 50, 0.3)' };
const favBtnStyle = { width: '65px', height: '65px', borderRadius: '50%', border: '2px solid #eee', backgroundColor: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' };
const primaryBtnStyle = { backgroundColor: 'var(--dark-green)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' };

export default ProductDetails;
