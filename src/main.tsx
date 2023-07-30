import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';

const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2f8886',
    },
    secondary: {
      main: '#A5D7E8',
    },
    background: {
      default: '#1a2f4b',
      paper: '#28475c',
    },
    text: {
      primary: '#f2f2f2',
    },
    success: {
      main: '#597722',
    },
    error: {
      main: '#ff0236',
    },
    warning: {
      main: '#e2703a',
    },
    info: {
      main: '#1E5F74',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
