import {useEffect,useState} from 'react';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword,clearErrors} from '../../redux/userActions'

const NewPassword = () => {
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const {error,success} = useSelector(state=>state.forgotPassword);
    const {token} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(success){
            toast.success('password updated successfully');
            navigate('/login')
            
        }
    },[dispatch,success,error])
    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('password',password);
        formData.set('confirmPassword',confirmPassword);

        dispatch(resetPassword(token,formData))

    }
  return (
    <>
        <MetaData title={'New Password Reset'} />
        <div className="container-container-fluid">
		<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e=>setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default NewPassword