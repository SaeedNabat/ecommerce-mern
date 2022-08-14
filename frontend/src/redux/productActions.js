import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';
export const getProducts = (keyword='',currentPage = 1,price,category,rating=0)=> async (dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCTS_REQUEST
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`;
        }
        const {data} = await axios.get(link)
        console.log(data)
        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data

        })
    }catch(error){
        console.log(error.response.data.errMessage);
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
export const getProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/v1/product/${id}`)
        console.log(data)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product

        })
    }catch(error){
        console.log(error.response.data.errMessage);
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.errMessage
        })
    }
}

// clear errors
export const clearErrors = () => async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,
    })
}