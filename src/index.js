import React from 'react';
import ReactDOM from 'react-dom/client'; // <== NEW: react-dom/client for React 18+
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

// NEW way to render with React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

