import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'

const ProtectedRoute = ({component:Component,...rest})=>{
    const { isAuthenticated, loading, user} = useSelector(state => state.auth);
    return (
        <>
        {loading === false && (
            <Route {...rest} render={props => {
                if(isAuthenticated === false){
                    return <Redirect to={'/login'} />
                }
                return <Component {...props} />
                
            }}
            />
        )}
        </>
    )
}
export default ProtectedRoute;