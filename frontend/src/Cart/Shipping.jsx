import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useDispatch, useSelector } from "react-redux";

import { saveShippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
function Shipping() {
  const {shippingInfo}=useSelector(state=>state.cart)
  
  const dispatch=useDispatch()
  const [address,setAddress]=useState(shippingInfo.address|| "");
  const [pinCode,setPinCode]=useState(shippingInfo.pinCode||"");
  const [phoneNumber,setPhoneNumber]=useState(shippingInfo.phoneNumber||"");
  const [country,setCountry]=useState(shippingInfo.country||"");
  const [state,setState]=useState(shippingInfo.state||"");
  const [city,setCity]=useState(shippingInfo.city||"");
  const navigate=useNavigate()
  const shippingInfoSubmit=(e)=>{
    e.preventDefault();
    if(phoneNumber.length!==10){
      console.error('Invalid Phone number! It should be 10 digits');
      return;
    }
    dispatch(saveShippingInfo({address,pinCode,phoneNumber,country,state,city}))
    navigate('/order/confirm')
  }
  
  return (
    <>
      <PageTitle title="Shipping Info" />
      <Navbar />
      <CheckoutPath activePath={0}/>
      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form className="shipping-form" onSubmit={shippingInfoSubmit}>
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Enter your address"  value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>

            <div className="shipping-form-group">
              <label htmlFor="pinCode">PinCode</label>
              <input type="number" id="pinCode" name="pinCode" placeholder="Enter your pinCode" value={pinCode} onChange={(e)=>setPinCode(e.target.value)}/>
            </div>

            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <input 
                type="text" 
                id="country" 
                name="country" 
                placeholder="Enter your country"
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="state">State</label>
              <input 
                type="text" 
                id="state" 
                name="state" 
                placeholder="Enter your state"
                value={state} 
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="Enter your city"
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <button className="shipping-submit-btn">Continue</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Shipping;
