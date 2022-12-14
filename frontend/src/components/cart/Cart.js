import {Link, Navigate} from 'react-router-dom';
import Loader from '../layout/Loader';
import {toast} from 'react-toastify';
import MetaData from '../layout/MetaData';
import {useDispatch,useSelector} from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../redux/cartActions';
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state=>state.cart);
    const removeCartItemHandler = (id)=>{

    }
    const increaseQty = (id,quantity,stock)=>{
        const newQty = quantity + 1;

        if(newQty > stock){
            return ;
        }
        dispatch(addItemToCart(id,newQty))
    }
    const decreaseQty = (id,quantity)=>{
        const newQty = quantity-1;
        if(newQty <= 1){
            return;
        }
        dispatch(addItemToCart(id,newQty))
    }
    const checkoutHandler = ()=>{
        navigate('/login?redirect=shipping')
    }
  return (
    <>
        <MetaData title={'Your Cart'} />
        <div className="container container-fluid">
        {
            cartItems.length === 0 ? <h2 className='mt-5'> Your Cart is empty</h2> :(
                <>
        <h2 class="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
                {cartItems.map(item=>{
                    <>
                        <hr />
                        <div className="cart-item" key={item.product}>
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt="Laptop" height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={()=>decreaseQty(item.product,item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={()=>increaseQty(item.product,item.quantity,item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeCartItemHandler(item.product)}></i>
                        </div>

                    </div>
                </div>
                <hr />
                    </>
                })}
               
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item)=>(acc+number(item.quantity)),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">$
                    {cartItems.reduce((acc,item)=>(acc+item.quantity * item.price),0).toFixed(2)}
                    </span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                </div>
            </div>
        </div>
                </>

        )}
    </div>
    </>
      
    )
}

export default Cart