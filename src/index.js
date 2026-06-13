import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress MetaMask/Extension errors in development overlay
window.addEventListener('unhandledrejection', event => {
  if (event.reason && typeof event.reason.message === 'string' && event.reason.message.includes('MetaMask')) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);