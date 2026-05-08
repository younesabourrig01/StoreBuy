import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, markAsRead } from '../store/notificationSlice';

const NotificationPage = () => {
  const { items, status } = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [status, dispatch]);

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--dark-green)' }}>Notifications</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-light)' }}>No notifications yet.</p>
        ) : (
          items.map(note => (
            <div 
              key={note.id} 
              onClick={() => dispatch(markAsRead(note.id))}
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                backgroundColor: note.read ? 'white' : '#f0fff4',
                border: '1px solid',
                borderColor: note.read ? '#eee' : 'rgba(46, 125, 50, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              {!note.read && <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)'
              }}></div>}
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--dark-green)' }}>{note.title}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{note.message}</p>
              <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{note.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
