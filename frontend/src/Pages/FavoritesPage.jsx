import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/favoriteSlice';
import { addToCart } from '../store/cartSlice';
import Card from '../Components/Card';

const FavoritesPage = () => {
  const { items } = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--dark-green)', textAlign: 'center' }}>My Favorites</h1>
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>You haven't added any favorites yet.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          {items.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default FavoritesPage;
