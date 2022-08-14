import {useEffect,useState} from 'react';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';

import {useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword,clearErrors} from '../../redux/userActions'
const ForgotPassword = ()=>{
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const {error,loading,message} = useSelector(state=>state.forgotPassword);

    const dispatch = useDispatch();
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(message){
            toast.success(message);
            
        }
    },[dispatch,message,error])
    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('email',email);

        dispatch(forgotPassword(formData))

    }
    return (
        <>
        <MetaData title={'Forgot Password'} />
         <div className="container-container-fluid">
		<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading?true:false}
                            >
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        
    </div>
        </>
    )
}
export default ForgotPassword;