import React from 'react';
import {Phone ,Mail, GitHub, LinkedIn, YouTube, Instagram} from '@mui/icons-material'

function Footer() {
  return (
   <footer style={{
     backgroundColor: 'var(--bg-primary)',
     color: 'var(--text-primary)',
     padding: '2rem 0',
     boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
     margin: '2rem 0 0 0'
   }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
      textAlign: window.innerWidth <= 768 ? 'center' : 'left'
    }}>
        {/* Section1 */}
        <div style={{
          flex: 1,
          minWidth: '250px',
          marginBottom: window.innerWidth <= 768 ? '2rem' : '0',
          width: window.innerWidth <= 768 ? '100%' : 'auto'
        }}>
            <h3 style={{
              fontSize: '1.4rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>Contact Us</h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '0.8rem'
            }}><Phone fontSize='small'/>Phone : +9865467888</p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '0.8rem'
            }}><Mail fontSize='small'/>Email : fashioncart@gmail.com</p>
        </div>

        {/* Section2 */}
        <div style={{
          flex: 1,
          minWidth: '250px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: window.innerWidth <= 768 ? '2rem' : '0',
          width: window.innerWidth <= 768 ? '100%' : 'auto'
        }}>
            <h3 style={{
              fontSize: '1.4rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>Follow me</h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'
            }}>
                <a href="" target="_blank" rel="noreferrer">
                    <GitHub 
                      style={{
                        fontSize: window.innerWidth <= 768 ? '1.8rem' : '2rem',
                        color: 'var(--text-light)',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--primary-main)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--text-light)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                </a>
                <a href="" target="_blank" rel="noreferrer">
                    <LinkedIn 
                      style={{
                        fontSize: window.innerWidth <= 768 ? '1.8rem' : '2rem',
                        color: 'var(--text-light)',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--primary-main)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--text-light)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                </a>
                <a href="" target="_blank" rel="noreferrer">
                    <YouTube 
                      style={{
                        fontSize: window.innerWidth <= 768 ? '1.8rem' : '2rem',
                        color: 'var(--text-light)',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--primary-main)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--text-light)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                </a>
                <a href="" target="_blank" rel="noreferrer">
                    <Instagram 
                      style={{
                        fontSize: window.innerWidth <= 768 ? '1.8rem' : '2rem',
                        color: 'var(--text-light)',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'var(--primary-main)';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'var(--text-light)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    />
                </a>
            </div>
        </div>
        {/* Section4 */}
        <div style={{
          flex: 1,
          minWidth: '250px',
          marginBottom: window.innerWidth <= 768 ? '2rem' : '0',
          width: window.innerWidth <= 768 ? '100%' : 'auto'
        }}>
            <h3 style={{
              fontSize: '1.4rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}>Quick Links</h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '0.8rem'
            }}><a href="/">Home</a></p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '0.8rem'
            }}><a href="/about">About Us</a></p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '0.8rem'
            }}><a href="/contact">Contact Us</a></p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              marginBottom: '0.8rem'
            }}><a href="/products">Products</a></p>
        </div>
    </div>
    <div style={{
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '1rem',
      color: 'var(--text-secondary)',
      paddingTop: '1.5rem',
      borderTop: '1px solid var(--border-color)'
    }}>
        <p style={{
          margin: '0',
          fontWeight: '400'
        }}>&copy; 2025 fashioncart  All rights reserved</p>
    </div>
   </footer>
  )
}

export default Footer
