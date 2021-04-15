import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    /*
        Top-level of webpage.
        DO NOT TOUCH UNLESS YOU KNOW WHAT YOU'RE DOING!!!

        Overall app wrapped with a BrowserRouter to enable routing
            BrowserRouter keeps UI in sync with URL
     */

    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

reportWebVitals();
