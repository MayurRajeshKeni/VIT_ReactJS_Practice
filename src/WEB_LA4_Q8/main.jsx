import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // This imports your dark-mode Earth theme

/**
 * main.jsx — Application Entry Point
 * Mounts the Atlas Country Explorer into the DOM.
 * Managed for: MAYUR R. KENI (24BCE0686)
 */

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Error: Root element not found. Ensure your index.html has a <div id='root'></div>");
}