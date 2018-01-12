import React from 'react';
import ReactDOM from 'react-dom';

import './css/style.css';
import './css/reset.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
