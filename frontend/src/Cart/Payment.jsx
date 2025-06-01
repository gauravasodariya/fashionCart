import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";

function Payment() {
    const orderItem=JSON.parse(sessionStorage.getItem('orderItem'))
    const {user}=useSelector(state=>state.user)
    const {shippingInfo}=useSelector(state=>state.cart)
    const navigate=useNavigate();
    const completePayment=async(amount)=>{
      try{
    const {data:keyData}=await axios.get('/api/v1/getKey');
    const {key}=keyData;
    
    const {data:orderData}=await axios.post('/api/v1/payment/process'  ,{amount});
    const {order}=orderData

    const options = {
      key, 
      amount,
      currency: 'INR',
      name: 'ShopEasy',
      description: 'Ecommerce Website Payment Transaction',
      order_id: order.id,
      handler:async function(response){
        const {data}=await axios.post('/api/v1/paymentVerification',{
          razorpay_payment_id:response.razorpay_payment_id,
          razorpay_order_id:response.razorpay_order_id,
          razorpay_signature:response.razorpay_signature
        })
        if(data.success){
          navigate(`/paymentSuccess?reference=${data.reference}`)
        }else{
          alert('Payment verification Failed')
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNumber
      },
      theme: {
        color: '#3399cc'
      },
    };

    if (typeof window !== 'undefined' && window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      const { data } = await axios.post('/api/v1/paymentVerification', {
        razorpay_payment_id: 'simulated',
        razorpay_order_id: order.id,
        razorpay_signature: 'simulated'
      });
      if (data.success) {
        navigate(`/paymentSuccess?reference=${data.reference}`);
      } else {
        alert('Payment verification Failed');
      }
    }
  }catch(error){
     console.error(error.message);
  }
    }
  return (
  <>
  <PageTitle title="Payment Processing"/>
  <Navbar/>
    <CheckoutPath activePath={2}/>
    <div className="h-[40vh] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        <Link to="/order/confirm" className='no-underline px-3 py-[0.7rem] text-base rounded border border-[#6c757d] text-[#6c757d] bg-[#f8f9fa] hover:bg-[#6c757d] hover:text-white transition'>Go Back</Link>
        <button className="px-4 py-[0.7rem] text-base rounded cursor-pointer transition text-white bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)]" onClick={()=>completePayment(orderItem.total)}>Pay ({orderItem.total})/-</button>
    </div>
  <Footer/>
  </>
  )
}

export default Payment
