import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_FAIL,
} from '../constants/userConstants'

// login 
export const login = (email, password) => async (dispatch)=>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        });
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/login',{email,password})
        dispatch({
            type: LOGIN_SUCCESS,
            payload:data.user
        })

    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
//register user
export const register = (userData) => async (dispatch)=>{
    try {
        dispatch({
            type:REGISTER_USER_REQUEST
        });
        const config = {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put('/api/v1/register',userData,config)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload:data.user
        })

    }catch(error){
        dispatch({
            type: REGISTER_USER_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
//update profile
export const updateProfile = (userData) => async (dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PROFILE_REQUEST,
        });
        const config = {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put('/api/v1/me/update',userData,config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload:data.success
        })

    }catch(error){
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
// update password
export const updatePassword = (passwords) => async (dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST,
        });
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put('/api/v1/password/update',passwords,config)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })

    }catch(error){
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload:error.response.data.errMessage
        })
    }
}

// forgot password
export const forgotPassword = (email) => async (dispatch)=>{
    try {
        dispatch({
            type:FORGOT_PASSWORD_REQUEST,
        });
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/password/forgot',email,config)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })

    }catch(error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
// reset password
export const resetPassword = (token,passwords) => async (dispatch)=>{
    try {
        dispatch({
            type:NEW_PASSWORD_REQUEST,
        });
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/password/reset/${token}`,passwords,config)
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload:data.success
        })

    }catch(error){
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
//load user
export const loadUser = (userData) => async (dispatch)=>{
    try {
        dispatch({
            type:LOAD_USER_REQUEST
        });
      
        const {data} = await axios.get('/api/v1/me')
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload:data.user
        })

    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload:error.response.data.errMessage
        })
    }
}
//logout user
export const logout = (userData) => async (dispatch)=>{
    try {
        await axios.get('/api/v1/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: LOGOUT_FAIL,
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