import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import store from './store/index';
import { addToCart, updateCart,deleteFromCart } from './actions/cart-actions';

console.log('inital state:',store.getState());
let unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

store.dispatch(updateCart('Flour 1kg', 5, 110));
store.dispatch(deleteFromCart('Coffee 500gm'));

unsubscribe();
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

