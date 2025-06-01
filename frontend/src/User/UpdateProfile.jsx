import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateProfile } from '../features/user/userSlice';
import Loader from '../components/Loader';

function UpdateProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { user, error, success, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const updateSubmit = (e) => {
        e.preventDefault();
        const payload = { name, email };
        dispatch(updateProfile(payload))
    }
      useEffect(()=>{
        if(error){
          console.error('Update profile error:', error);
        }
      },[error])

      useEffect(()=>{
        if(success){
          navigate("/profile")
        }
      },[success])
      useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
        }
      },[user])
      // Responsive resize effect for inline styles
      useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }, []);
  return (
    <>
   {loading?(<Loader/>):( <>
    <Navbar/>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '10px',
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          padding: isMobile ? '15px' : '20px',
          boxSizing: 'border-box',
          background: 'transparent',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            width: '400px',
            backgroundColor: 'rgb(246, 243, 243)',
            padding: '20px',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            margin: '0 auto',
          }}
        >
            <form onSubmit={updateSubmit} style={{ width: '100%' }}>
                <h2 style={{ textAlign: 'center', color: 'var(--primary-main)', marginBottom: '20px' }}>Update Profile</h2>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                    <input
                      type="text"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      name="name"
                      style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #ccc', borderRadius: '5px', fontSize: isMobile ? '14px' : '16px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      name="email"
                      style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #ccc', borderRadius: '5px', fontSize: isMobile ? '14px' : '16px' }}
                    />
                </div>
                <button
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  style={{
                    width: '100%',
                    background: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    padding: isMobile ? '10px' : '14px',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: isMobile ? '14px' : '16px',
                    transition: 'background 0.3s',
                    opacity: loading ? 0.85 : 1,
                  }}
                >
                  Update
                </button>
            </form>
        </div>
      </div>
    </div>

    <Footer/>
    </>)}
    </>
  )
}

export default UpdateProfile
