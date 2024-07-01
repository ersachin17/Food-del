import { useContext,useEffect,useState } from 'react'
import './PlaceOrder.css'
import {useNavigate} from 'react-router-dom'
import { StoreContxt } from '../../Context/StoreContext'
import axios from 'axios';
const PlaceOrder = () => {
  const naviagate = useNavigate();
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContxt);
   const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
   })

   const onchangehandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value
   setData(data=>({...data,[name]:value}));
   }
    
   const placeOrder = async(e)=>{
       e.preventDefault();
       let orderItems = [];
        food_list.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo  = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
       })
       let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,
       }
       let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
       if(response.data.success){
        const {session_url} = response.data;
        window.location.replace(session_url);
       }
       else{
        alert("Error")
       }
   }
 useEffect(()=>{
  if(!token){
   naviagate("/cart")
  }
  else if(getTotalCartAmount()===0){
     naviagate('/cart')
  }
 },[token])
  
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
         <p className="title">Delivery Information</p>
         <div className="multi-fields">
          <input onChange={onchangehandler} name='firstname' value={data.firstname} type="text" placeholder='First name' required  />
          <input onChange={onchangehandler} name='lastname' value={data.lastname} type="text" placeholder='Last name' />
         </div>
         <input onChange={onchangehandler} name='email' value={data.email} type="email"  placeholder='Email address' required  />
         <input onChange={onchangehandler} name='street' value={data.street} type="text"  placeholder='Street' />
         <div className="multi-fields">
          <input onChange={onchangehandler} name='city' value={data.city} type="text" placeholder='City' required  />
          <input onChange={onchangehandler} name='state' value={data.state} type="text" placeholder='State' />
         </div>
         <div className="multi-fields">
          <input onChange={onchangehandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' required  />
          <input onChange={onchangehandler} name='country' value={data.country} type="text" placeholder='Country' required  />
         </div>
         <input onChange={onchangehandler} name='phone' value={data.phone}  type="text" placeholder='Phone' required  />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
               <p>Subtotal</p>
               <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
                   <p>Delivery Fee</p>
                   <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
