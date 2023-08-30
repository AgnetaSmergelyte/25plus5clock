import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import clockReducer from "./features/clock.js";

const store = configureStore({
    reducer: clockReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <App/>
        </Provider>
);