import { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Navbar.css'
import { StoreContxt } from '../../Context/StoreContext'
const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate()
  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContxt);
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""} >home</Link>
        <a  href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""} >menu</a>
        <a href='#app-download'  onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""} >mobile-app</a>
        <a href='#footer'  onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""} >contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-searhc-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
           <ul className="navbar-profile-dropdown">
            <li onClick={()=>navigate("/myorders")} ><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
            <hr/>
            <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>
          </div>
          }
      </div>
    </div>
  )
}

 Navbar.propTypes = {
  setShowLogin:PropTypes.func.isRequired
 }
export default Navbar
