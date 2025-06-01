import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/user/userSlice';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { name, email, password, confirmPassword } = user;
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /**
   * Updates user state when form fields change
   * @param {Event} e - Input change event
   */
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission for user registration
   * @param {Event} e - Form submit event
   */
  const registerSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      return; // Don't submit if any field is empty
    }
    
    if (password !== confirmPassword) {
      return; // Don't submit if passwords don't match
    }
    
    // Dispatch registration action
    dispatch(register({ name, email, password, confirmPassword }));
  };

  

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px' : '40px', background: 'linear-gradient(135deg, #f7f9fc 0%, #eef3f8 100%)' }}>
      <Motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: isMobile ? '380px' : '480px', borderRadius: '16px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', background: '#fff', overflow: 'hidden' }}>
        <div style={{ padding: isMobile ? '18px' : '24px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--primary-dark)' }}>Create Account</h2>
          {error && (
            <div style={{ background: '#fdecea', color: '#611a15', border: '1px solid #f5c6cb', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
              {typeof error === 'string' ? error : (error.message || 'An error occurred')}
            </div>
          )}
          <form onSubmit={registerSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Username</label>
              <input type="text" name="name" placeholder="Your name" value={name} onChange={registerDataChange} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Email</label>
              <input type="email" name="email" placeholder="name@example.com" value={email} onChange={registerDataChange} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Password</label>
              <input type="password" name="password" placeholder="Create a password" value={password} onChange={registerDataChange} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', color: '#555' }}>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={registerDataChange} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
            </div>
            <Motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)} style={{ width: '100%', background: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)', color: '#fff', border: 'none', padding: isMobile ? '12px' : '14px', borderRadius: '999px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: isMobile ? '14px' : '16px', transition: 'background 0.3s', opacity: loading ? 0.9 : 1 }}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Motion.button>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <Link to="/login" style={{ color: 'var(--primary-main)', fontSize: '14px' }}>Already have an account?</Link>
            </div>
          </form>
        </div>
      </Motion.div>
    </Motion.div>
  );
}

export default Register;
