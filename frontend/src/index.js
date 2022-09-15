import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import 'style/bootstrap.min.css';
import 'style/main.scss';

import store from 'app/store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </Provider>
    </React.StrictMode>,
);
