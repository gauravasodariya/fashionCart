import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../features/user/userSlice';
import Loader from '../components/Loader';

function UpdatePassword() {
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Create form data for password update
    const myForm = new FormData();
    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);
    
    // Dispatch the update password action
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      console.error('Update password error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      navigate('/profile');
    }
  }, [success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Password Update" />
          <div style={styles.container}>
            <div style={styles.formContent}>
              <form style={styles.form} onSubmit={updatePasswordSubmit}>
                <h2 style={styles.title}>Update Password</h2>
                <div style={styles.inputGroup}>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
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
                  Update Password
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UpdatePassword
