import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return;
    }
    try {
      setSubmitting(true);
      await axios.post('/api/v1/contact', form, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageTitle title="Contact" />
      <section style={{ padding: '2rem 1rem', color: 'var(--text-primary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 8px 15px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Contact us</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#f4f6f8', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', padding: '0.8rem 1rem', outline: 'none' }}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#f4f6f8', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', padding: '0.8rem 1rem', outline: 'none' }}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  style={{ width: '100%', background: '#f4f6f8', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', padding: '0.8rem 1rem', outline: 'none' }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                style={{ background: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)', color: 'var(--text-primary)', border: 'none', borderRadius: '999px', padding: '0.8rem 1rem', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.8 : 1 }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div style={{ background: '#eaf6fa', borderRadius: '12px', padding: '1rem', boxShadow: '0 8px 15px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1520975942428-9770462a58b2?q=80&w=1200&auto=format&fit=crop"
              alt="Contact illustration"
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
