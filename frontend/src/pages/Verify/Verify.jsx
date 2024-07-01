import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css'
import { useContext, useEffect } from 'react';
import { StoreContxt } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(StoreContxt)

  const verifyPayment = async()=>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
        navigate("/myorders");
    }
    else{
      navigate("/")
    }
  }

useEffect(()=>{
  verifyPayment();
},[]);
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
};

export default Verify;
