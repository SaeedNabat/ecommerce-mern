import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productsReducer,productDetailsReducer} from '././productReducers'
import {authReducer,userReducer} from './userReducers'
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user:userReducer

})

let initalState = {}

const middleware = [thunk];
const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;