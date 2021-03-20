import React from 'react'
import ReactDOM from 'react-dom'
import configStore from './store/configStore'
import { Provider } from 'react-redux'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configStore()
//console.log('initial state', store.getState());

store.subscribe(()=>{
    //console.log('subscribe',store.getState());
})

const jsx = (
    <Provider store={store}>
    <App />
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('root'))