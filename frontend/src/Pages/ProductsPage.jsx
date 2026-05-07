import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import Card from '../Components/Card';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Products</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
          Browse our full collection of premium items.
        </p>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent-green)', margin: '1.5rem auto' }}></div>
      </div>

      {status === 'loading' && <p style={{ textAlign: 'center' }}>Loading products...</p>}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {items.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
