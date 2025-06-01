import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
// styles inlined locally; external Form.css removed
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
import Loader from '../components/Loader';

function ForgotPassword() {
  const { loading, error, success, message, resetUrl } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 480 : false;


  /**
   * Handle forgot password form submission
   * @param {Event} e - Form submit event
   */
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      console.error('Forgot password error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      console.log('Reset email sent successfully');
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(removeErrors()), 3000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => dispatch(removeSuccess()), 3000);
      return () => clearTimeout(t);
    }
  }, [success, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Forgot Password" />
          <Navbar />
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px' : '40px', background: 'linear-gradient(135deg, #f7f9fc 0%, #eef3f8 100%)' }}>
            <Motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: isMobile ? '380px' : '420px', borderRadius: '16px', boxShadow: '0 12px 24px rgba(0,0,0,0.08)', background: '#fff', overflow: 'hidden' }}>
              <form style={{ padding: isMobile ? '18px' : '24px' }} onSubmit={forgotPasswordSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '12px', color: 'var(--primary-dark)' }}>Reset Link</h2>
                {error && (
                  <div style={{ background: '#fdecea', color: '#611a15', border: '1px solid #f5c6cb', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                    {typeof error === 'string' ? error : (error.message || 'An error occurred')}
                  </div>
                )}
                {success && (
                  <div style={{ background: '#e6ffed', color: '#164b35', border: '1px solid #b7eb8f', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                    {message || 'Reset email sent'}
                    {resetUrl && (
                      <div style={{ marginTop: '8px' }}>
                        <a href={resetUrl} style={{ color: 'var(--primary-main)' }}>Open reset link</a>
                      </div>
                    )}
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <label style={{ fontSize: '14px', color: '#555' }}>Email</label>
                  <input type="email" name="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: isMobile ? '12px' : '14px', border: '1px solid #d6d9dc', borderRadius: '10px', fontSize: isMobile ? '14px' : '16px' }} />
                </div>
                <Motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)} style={{ width: '100%', background: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)', color: '#fff', border: 'none', padding: isMobile ? '12px' : '14px', borderRadius: '999px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: isMobile ? '14px' : '16px', transition: 'background 0.3s', opacity: loading ? 0.9 : 1 }}>
                  {loading ? 'Sending...' : 'Send Link'}
                </Motion.button>
              </form>
            </Motion.div>
          </Motion.div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ForgotPassword
