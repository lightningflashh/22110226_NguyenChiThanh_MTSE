import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import {store} from '~/redux/store';

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { injectStore } from '~/utils/authorizeAxios.js'
injectStore(store)

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);