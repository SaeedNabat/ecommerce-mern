import {useEffect,useState} from 'react';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { toast } from 'react-toastify';

import {useNavigate,Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {login,clearErrors} from '../../redux/userActions'
const Login = ()=>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {isAuthenticated,error,loading} = useSelector(state=>state.auth)

    const dispatch = useDispatch();
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
    },[dispatch,isAuthenticated,error])
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(login(email,password))

    }
    return (
        <>
            {loading ? <Loader/> : (
                <>
                    <MetaData title={'login'}/>
                    <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
</div>
                </>
            )}
        </>
    )
}
export default Login;