import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, removeErrors, removeSuccess } from '../features/user/userSlice';

function ResetPassword() {
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 480 : false;

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: isMobile ? '20px' : '40px',
      background: '#f8fafc',
    },
    formContent: {
      width: '100%',
      maxWidth: isMobile ? '360px' : '420px',
      margin: '0 auto',
    },
    form: {
      background: '#fff',
      border: '1px solid var(--bg-secondary)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
      borderRadius: '12px',
      padding: isMobile ? '18px' : '24px',
    },
    title: {
      textAlign: 'center',
      marginBottom: isMobile ? '12px' : '16px',
      color: 'var(--bg-secondary)',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: isMobile ? '12px' : '16px',
    },
    input: {
      padding: isMobile ? '12px' : '14px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: isMobile ? '14px' : '16px',
      width: '100%',
    },
  };

  /**
   * Handle password reset form submission
   * @param {Event} e - Form submit event
   */
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    
    // Create data object for password reset
    const data = {
      password,
      confirmPassword,
    };
    
    // Dispatch reset password action with token and user data
    dispatch(resetPassword({ token, userData: data }));
  };

  useEffect(() => {
    // Log error to console for visibility; removed toast and cleanup
    if (error) {
      console.error('Reset password error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(removeErrors()), 3000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => dispatch(removeSuccess()), 2000);
      return () => clearTimeout(t);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success]);

  return (
    <>
      <PageTitle title="Reset Password" />
      <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={styles.container}>
        <Motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={styles.formContent}>
          <form style={styles.form} onSubmit={resetPasswordSubmit}>
            <h2 style={styles.title}>Reset Password</h2>
            {error && (
              <div style={{ background: '#fdecea', color: '#611a15', border: '1px solid #f5c6cb', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                {typeof error === 'string' ? error : (error.message || 'An error occurred')}
              </div>
            )}
            <div style={styles.inputGroup}>
              <input type="password" name="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <input type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} />
            </div>
            <Motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)} style={{ width: '100%', background: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)', color: 'var(--text-primary)', border: 'none', padding: isMobile ? '10px' : '14px', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: isMobile ? '14px' : '16px', transition: 'background 0.3s', opacity: loading ? 0.85 : 1 }}>
              Reset Password
            </Motion.button>
          </form>
        </Motion.div>
      </Motion.div>
    </>
  );
}

export default ResetPassword
