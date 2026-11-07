import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IdentityProvider } from './context/IdentityContext';
import './styles.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><IdentityProvider><App/></IdentityProvider></React.StrictMode>);
