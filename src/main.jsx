import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);

// Reason for using this code: suppressing specific warning messages from Facebook SDK in development mode
// Reference: https://stackoverflow.com/questions/63990910/how-to-disable-warning-messages-from-react-facebook-login
if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("componentWillReceiveProps has been renamed")
    ) {
      return;
    }
    originalWarn(...args); // keep other warnings
  };
}