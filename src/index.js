import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './reducers';

render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root'));
registerServiceWorker();
