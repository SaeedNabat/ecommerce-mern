import axios from "axios";

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,

} from '../constants/orderConstants'

export const createOrder = (order)=>async(dispatch,getState)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST})
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.get('/api/order/new',order,config)
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message
        })
       
    }
}// get currently logged in user orders
export const myOrders = ()=>async (dispatch)=>{
    try{
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/orders/me');
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.orders
        })
    }catch(err){
        dispatch({
            type: MY_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getOrderDetails = ()=>async (dispatch)=>{
    try{
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/orders/${id}`);
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order
        })
    }catch(err){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,
    })
}