import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, markNotificationRead } from '../store/notificationSlice';

const BellIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const NotificationPage = () => {
  const { items, status, error } = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [status, dispatch]);

  const unreadCount = items.filter(n => !n.isRead).length;

  const handleMarkRead = (note) => {
    if (!note.isRead) {
      dispatch(markNotificationRead(note._id));
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (status === 'loading') {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}></div>
        <p style={{ color: 'var(--text-light)', marginTop: '1rem' }}>Loading notifications...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Notifications</h1>
          {unreadCount > 0 && (
            <p style={subtitleStyle}>{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
          )}
        </div>
        {unreadCount > 0 && (
          <span style={badgeStyle}>{unreadCount} New</span>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div style={errorBoxStyle}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && !error ? (
        <div style={emptyStateStyle}>
          <div style={{ color: 'var(--accent-green)', marginBottom: '1.5rem' }}>
            <BellIcon />
          </div>
          <h2 style={{ color: 'var(--dark-green)', marginBottom: '0.5rem' }}>All caught up!</h2>
          <p style={{ color: 'var(--text-light)' }}>You have no notifications right now. Place an order to get started!</p>
        </div>
      ) : (
        <div style={listStyle}>
          {items.map(note => (
            <div
              key={note._id}
              onClick={() => handleMarkRead(note)}
              style={{
                ...cardStyle,
                backgroundColor: note.isRead ? 'white' : '#f0fff4',
                borderColor: note.isRead ? '#eee' : 'rgba(46, 125, 50, 0.2)',
                cursor: note.isRead ? 'default' : 'pointer',
              }}
            >
              {/* Unread dot */}
              {!note.isRead && <span style={unreadDotStyle}></span>}

              {/* Icon */}
              <div style={{
                ...iconWrapStyle,
                backgroundColor: note.isRead ? '#f5f5f5' : 'var(--primary-green)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={note.isRead ? '#999' : 'var(--dark-green)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...messageStyle, fontWeight: note.isRead ? '500' : '700' }}>
                  {note.message}
                </p>
                <span style={dateStyle}>{formatDate(note.createdAt)}</span>
              </div>

              {/* Status */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                {note.isRead ? (
                  <span style={readBadgeStyle}>Read</span>
                ) : (
                  <span style={unreadBadgeStyle}>Tap to read</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: '780px',
  margin: '0 auto',
  padding: '4rem 2rem',
};

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8rem 2rem',
};

const spinnerStyle = {
  width: '48px',
  height: '48px',
  border: '4px solid #eee',
  borderTop: '4px solid var(--accent-green)',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '2.5rem',
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '900',
  color: 'var(--dark-green)',
  margin: 0,
};

const subtitleStyle = {
  color: 'var(--text-light)',
  marginTop: '0.3rem',
  fontSize: '1rem',
};

const badgeStyle = {
  backgroundColor: 'var(--accent-green)',
  color: 'white',
  padding: '0.4rem 1rem',
  borderRadius: '50px',
  fontWeight: '800',
  fontSize: '0.85rem',
};

const errorBoxStyle = {
  backgroundColor: '#fff5f5',
  border: '1px solid #feb2b2',
  borderRadius: '16px',
  padding: '1.5rem',
  color: '#c53030',
  marginBottom: '2rem',
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '6rem 2rem',
  backgroundColor: '#f9fdfa',
  borderRadius: '32px',
  border: '1px dashed var(--primary-green)',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const cardStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.2rem',
  padding: '1.5rem',
  borderRadius: '20px',
  border: '1.5px solid',
  transition: 'all 0.2s ease',
  position: 'relative',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
};

const unreadDotStyle = {
  position: 'absolute',
  top: '1.2rem',
  right: '1.2rem',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'var(--accent-green)',
  boxShadow: '0 0 0 3px rgba(46, 125, 50, 0.15)',
};

const iconWrapStyle = {
  width: '44px',
  height: '44px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const messageStyle = {
  color: 'var(--dark-green)',
  fontSize: '1rem',
  lineHeight: '1.5',
  margin: '0 0 0.3rem 0',
};

const dateStyle = {
  fontSize: '0.8rem',
  color: '#aaa',
};

const readBadgeStyle = {
  fontSize: '0.75rem',
  color: '#aaa',
  fontWeight: '600',
};

const unreadBadgeStyle = {
  fontSize: '0.75rem',
  color: 'var(--accent-green)',
  fontWeight: '700',
  backgroundColor: 'rgba(46, 125, 50, 0.08)',
  padding: '0.25rem 0.6rem',
  borderRadius: '50px',
};

export default NotificationPage;
