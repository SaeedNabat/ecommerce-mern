import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productsReducer,productDetailsReducer} from '././productReducers'
import {authReducer,userReducer,forgotPasswordReducer} from './userReducers'
import { cartReducer } from './cartReducers';
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer

})

let initalState = {
    cart:{
        cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo:localStorage.getItem('shippingInfo')?
        JSON.parse(localStorage.getItem('shippingInfo')):{}
    }
}

const middleware = [thunk];
const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;