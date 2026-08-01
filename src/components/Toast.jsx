import { useEffect } from 'react';

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    toast: {
      position: 'fixed',
      top: '10%',
      right: '40%',
      padding: '12px 24px',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
      backgroundColor: 
        type === 'success' ? '#0000FF50' :
        type === 'error' ? '#e74c3c' :
        type === 'warning' ? '#f1c40f' : '#3498db'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
      marginLeft: '10px',
      opacity: 0.7
    }
  };

  return (
    <div style={styles.toast}>
      <span>{message}</span>
      <button style={styles.closeButton} onClick={onClose}>&times;</button>
    </div>
  );
}
