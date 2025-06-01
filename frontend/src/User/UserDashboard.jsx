import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, removeSuccess } from '../features/user/userSlice';
function UserDashboard({user}) {
    const {cartItems}=useSelector(state=>state.cart)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [menuVisible,setMenuVisible]=useState(false);
    function toggleMenu(){
        setMenuVisible(!menuVisible)
    }
    const options=[
        {name:'Orders',funcName:orders},
        {name:'Account',funcName:profile},
        {name:`Cart(${cartItems.length})`,funcName:myCart,isCart:true},
        {name:'Logout',funcName:logoutUser},
    ]
    if(user.role==='admin'){
        options.unshift({
            name:'Admin Dashboard',funcName:dashboard
        })
    }
    function orders(){
        navigate("/orders/user")
    }
    function profile(){
        navigate("/profile")
    }
    function myCart(){
        navigate("/cart")
    }
    function logoutUser(){
       dispatch(logout())
       .unwrap()
       .then(()=>{
        console.log('Logout Successful')
        dispatch(removeSuccess())
        navigate('/login')
       })
       .catch((error)=>{
        console.error(error.message || 'Logout Failed')
       })
        
    }
    function dashboard(){
        navigate("/admin/dashboard")

    }
  return (
    <>
    <div className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] ${menuVisible?'visible opacity-100':'invisible opacity-0'} transition`} onClick={toggleMenu}></div>
    <div>
        <div
          onClick={toggleMenu}
          style={{
            display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '5px 15px', position: 'fixed', top: '0px', right: '0px', zIndex: 1000, marginRight: '40px', marginBottom: '5px'
          }}
        >
            <img src={user.avatar.url?user.avatar.url:'./images/profile.png'} alt="Profile Picture" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px', objectFit: 'cover', border: '2px solid var(--border-color)' }}/>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-light)' }}>{user.name || 'User'}</span>
        </div>
       { menuVisible && (<div
         style={{ padding: '15px', borderRadius: '8px', position: 'fixed', top: '55px', right: '20px', width: '150px', zIndex: 1000, boxShadow: 'var(--shadow-sm)', backgroundColor: 'var(--bg-primary)' }}
       >
           { options.map((item)=>(
            <button
              key={item.name}
              className={`w-full p-3 mb-2 rounded bg-[var(--primary-main)] text-[var(--text-light)] text-[16px] transition ${item.isCart?(cartItems.length>0?'bg-[var(--primary-light)] text-[var(--text-dark)]':''):''}`}
              onClick={item.funcName}
            >
              {item.name}
            </button>
           ))}
        </div>)}
    </div>
    </>
  )
}

export default UserDashboard
