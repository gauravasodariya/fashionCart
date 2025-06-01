import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {
    const {cartItems}=useSelector(state=>state.cart)
    const subtotal=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const tax=subtotal*0.18
    const shippingCharges=subtotal>500?0:50
    const total=subtotal+tax+shippingCharges;
    const navigate=useNavigate();
    const checkoutHandler=()=>{
        navigate(`/login?redirect=/shipping`)
    }
  return (
    <>
     <Navbar/>
     <PageTitle title="Your Cart"/>
 {cartItems.length===0?(
    <div className="flex flex-col items-center justify-center h-[70vh]">
        <p className="text-[2rem] font-bold text-[var(--primary-dark)] mb-5">Your cart is empty</p>
        <Link to="/products" className="no-underline px-5 py-2 text-base font-bold text-[var(--text-primary)] bg-[var(--bg-secondary)] rounded transition hover:bg-[var(--primary-dark)]">View Products</Link>
    </div>
 ): (  <>
    <div className="max-w-[1440px] mx-auto my-8 px-4 py-12 grid grid-cols-[1fr_350px] gap-8 lg:grid-cols-[1fr_300px] md:grid-cols-1 md:my-4 md:gap-4 md:px-3">
        <div className="bg-white rounded-[12px] shadow p-6 min-h-[60vh] md:p-4">
            <div className="text-[1.5rem] text-[#1a1a1a] mb-6 pb-3 border-b-2 border-[#f0f0f0]">Your Cart</div>
            <div className="w-full">
                <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr] p-4 bg-[#f8f9fa] rounded-[8px] mb-4 font-semibold text-[#4a4a4a] md:hidden">
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Item Total</div>
                    <div>Actions</div>
                </div>

               {cartItems && cartItems.map(item=> <CartItem item={item} key={item.name}/>) }
            </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-[12px] p-6 h-fit sticky top-8 shadow md:rounded-[12px] md:p-5 md:mt-4">
            <h3 className="text-[1.25rem] text-[#1a1a1a] mb-6 pb-3 border-b-2 border-[#f0f0f0]">Price Summary</h3>
            <div className="flex justify-between mb-4 text-[#666] md:py-3">
                <p>Subtotal :</p>
                <p>{subtotal}/-</p>
            </div>
            <div className="flex justify-between mb-4 text-[#666] md:py-3">
                <p>Tax (18%):</p>
                <p>{tax}/-</p>
            </div>
            <div className="flex justify-between mb-4 text-[#666] md:py-3">
                <p>Shipping :</p>
                <p>{shippingCharges}/-</p>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t-2 border-[#f0f0f0] font-semibold text-[#1a1a1a] text-[1.1rem]">
                <p>Total :</p>
                <p>{total}/-</p>
            </div>
            <button className="w-full p-4 mt-6 bg-[var(--primary-dark)] text-white rounded-[8px] text-base font-semibold cursor-pointer transition hover:bg-[var(--bg-primary)] disabled:opacity-70 disabled:cursor-not-allowed" onClick={checkoutHandler}>Proceed to Checkout</button>
        </div>
    </div>
    </>)}
    <Footer/>
    </>
  )
}

export default Cart
