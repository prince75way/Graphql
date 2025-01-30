import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalErrorBoundary from './utils/GlobalErrorBoundary';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
    
<ThemeProvider theme={theme}>


    <BrowserRouter>
    <Provider store={store}>
      <ToastContainer/>
      <App />
    </Provider>
    </BrowserRouter>
</ThemeProvider>

    </GlobalErrorBoundary>
  </React.StrictMode>
);
