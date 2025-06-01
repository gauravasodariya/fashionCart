import React from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

function About() {
  return (
    <>
      <Navbar />
      <PageTitle title="About" />
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px',
          color: 'var(--text-primary)'
        }}
      >
        <h1
          style={{
            fontSize: '1.875rem',
            fontWeight: 600,
            marginBottom: '16px',
            color: 'var(--primary-dark)'
          }}
        >
          About FashionCart
        </h1>
        <p style={{ marginBottom: '16px' }}>
          We are committed to offering quality fashion products with a seamless shopping experience. Our mission is to bring style and comfort together, curated for you.
        </p>
        <p>
          Explore our collections, discover new trends, and enjoy a user-friendly platform designed for everyone, including freshers learning MERN.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default About;