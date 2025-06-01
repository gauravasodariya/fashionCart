import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/user/userSlice';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  // Redirect user after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect]);

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px' : '40px', background: 'linear-gradient(135deg, #f7f9fc 0%, #eef3f8 100%)' }}>
      <Motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: isMobile ? '380px' : '440px', borderRadius: '16px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', background: '#fff', overflow: 'hidden' }}>
        <div style={{ padding: isMobile ? '18px' : '24px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--primary-dark)' }}>Welcome Back</h2>
          {error && (
            <div style={{ background: '#fdecea', color: '#611a15', border: '1px solid #f5c6cb', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
              {typeof error === 'string' ? error : (error.message || 'An error occurred')}
            </div>
          )}
          <form onSubmit={loginSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Email</label>
              <input type="email" placeholder="name@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Password</label>
              <input type="password" placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
            </div>
            <Motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)} style={{ width: '100%', background: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)', color: '#fff', border: 'none', padding: isMobile ? '12px' : '14px', borderRadius: '999px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: isMobile ? '14px' : '16px', transition: 'background 0.3s', opacity: loading ? 0.9 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Motion.button>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              <Link to="/password/forgot" style={{ color: 'var(--primary-main)', fontSize: '14px' }}>Forgot password?</Link>
              <Link to="/register" style={{ color: 'var(--primary-main)', fontSize: '14px' }}>Create account</Link>
            </div>
          </form>
        </div>
      </Motion.div>
    </Motion.div>
  );
}

export default Login;
