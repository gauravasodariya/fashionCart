import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

function PaymentSuccess() {
    const [searchParams]=useSearchParams()
    const reference=searchParams.get('reference');
    const {cartItems,shippingInfo}=useSelector(state=>state.cart);
    const { loading, success, error } = useSelector(state => state.order);
    const dispatch=useDispatch();

    useEffect(()=>{
      const createOrderData=async()=>{
        try{
          const orderItem=JSON.parse(sessionStorage.getItem('orderItem'))
          if(!orderItem) return;
          const orderData={
            shippingInfo:{
              address:shippingInfo.address,
              city:shippingInfo.city,
              state:shippingInfo.state,
              country:shippingInfo.country,
              pinCode:shippingInfo.pinCode,
              phoneNo:shippingInfo.phoneNumber
            },
            orderItems:cartItems.map((item)=>({
              name:item.name,
              price:item.price,
              quantity:item.quantity,
              image:item.image,
              product:item.product,
            })),
            paymentInfo:{
              id:reference,
              status:'succeeded'
            },
            itemPrice:orderItem.subtotal,
            taxPrice:orderItem.tax,
            shippingPrice:orderItem.shippingCharges,
            totalPrice:orderItem.total,

          }
          dispatch(createOrder(orderData))
          sessionStorage.removeItem('orderItem')
        }catch(error){
          console.error(error.message || 'Order Creation Error')
        }
      }
      createOrderData()
    },[]);
    useEffect(()=>{
      if(success){
        dispatch(clearCart())
        dispatch(removeSuccess())
      }
    },[dispatch,success])
    useEffect(()=>{
      if(error){
        dispatch(removeErrors())
      }
    },[dispatch,error])
  return (
    <>
{loading?(<Loader/>):(    <>
    <PageTitle title="Payment Status"/>
    <Navbar/>
  <div className="flex flex-col items-center justify-center h-screen text-center p-6">
    {error && (
      <div style={{ background: '#fdecea', color: '#611a15', border: '1px solid #f5c6cb', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
        {typeof error === 'string' ? error : (error.message || 'An error occurred')}
      </div>
    )}
    {success && (
      <div style={{ background: '#e6ffed', color: '#164b35', border: '1px solid #b7eb8f', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
        Order created successfully
      </div>
    )}
    <div className="flex flex-col items-center justify-center">
    <div className="w-[80px] h-[80px] rounded-full bg-[#28a745] flex items-center justify-center mb-4 relative">
        <div className="absolute" style={{ width: '20px', height: '40px', border: 'solid white', borderWidth: '0 6px 6px 0', transform: 'rotate(45deg)', bottom: '18px', left: '28px' }}></div>
    </div>
    <h1 className="text-2xl text-[#28a745] mb-2">Order Confirmed!</h1>
    <p className="text-base text-[#6c757d] my-8">Your payment was successful. Reference ID <strong>{reference}</strong></p>
    <Link className='px-4 py-[0.7rem] rounded bg-[var(--bg-secondary)] text-[var(--text-primary)] no-underline text-base mt-5 transition hover:bg-[var(--bg-primary)]' to="/orders/user">View Orders</Link>
    </div>
  </div>
  <Footer/>
  </>)}
  </>
  )
}

export default PaymentSuccess
