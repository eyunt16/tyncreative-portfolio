import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContact } from '../services/api';
import type { ContactPayload } from '../types';
import toast, { Toaster } from 'react-hot-toast';

const CONTACT_METHODS = [
  { icon: '📧', label: 'Email',    value: 'mytuyen.166@gmail.com' },
  { icon: '📍', label: 'Based In', value: 'Ho Chi Minh City, Viet Nam' },
  { icon: '⏱',  label: 'Response', value: 'Within 24 hours' },
];

export default function ContactSection() {
  const [form, setForm]     = useState<ContactPayload>({ name: '', email: '', message: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      toast.success('Message sent! I\'ll get back to you soon. ✨');
      setForm({ name: '', email: '', message: '', company: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--glass-border)',
            color: 'var(--color-white)',
            fontFamily: 'var(--font-sans)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-white)',
            lineHeight: 1.1,
          }}>
            Let's create something<br />
            <span className="text-gradient">great together</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          >
            <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
              Have a project in mind or just want to say hi? I'd love to hear from you. Drop me
              a message and I'll get back to you within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {CONTACT_METHODS.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'color-mix(in srgb, var(--color-cyan) 8%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--color-cyan) 18%, transparent)',
                    color: 'var(--color-cyan)', fontSize: '1.1rem', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-2)', marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-white)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ease: [0.05, 0.7, 0.1, 1] }}
                  style={{ textAlign: 'center', padding: '3rem 1rem' }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'color-mix(in srgb, var(--color-cyan) 10%, transparent)',
                    border: '2px solid color-mix(in srgb, var(--color-cyan) 40%, transparent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem', fontSize: '1.5rem', color: 'var(--color-cyan)',
                    boxShadow: 'var(--glow-cyan)',
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-white)' }}>
                    Message Received!
                  </h3>
                  <p style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
                    Thanks for reaching out. I'll review your message and get back to you shortly.
                  </p>
                  <motion.button
                    className="btn-ghost"
                    style={{ margin: '2rem auto 0', padding: '0.6rem 1.5rem', display: 'block' }}
                    onClick={() => setSent(false)}
                    whileHover={{ scale: 1.04 }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Name <span style={{ color: 'var(--color-cyan)' }}>*</span>
                      </label>
                      <input className="form-field" type="text" name="name" placeholder="Your name"
                        value={form.name} onChange={handleChange} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Email <span style={{ color: 'var(--color-cyan)' }}>*</span>
                      </label>
                      <input className="form-field" type="email" name="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Company (optional)
                    </label>
                    <input className="form-field" type="text" name="company" placeholder="Where you work"
                      value={form.company} onChange={handleChange} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Message <span style={{ color: 'var(--color-cyan)' }}>*</span>
                    </label>
                    <textarea className="form-field" name="message"
                      placeholder="Tell me about your project, goals, and timeline..."
                      value={form.message} onChange={handleChange} rows={5} required />
                  </div>

                  <motion.button
                    type="submit" className="btn-glow"
                    style={{ padding: '0.9rem', fontSize: '0.9375rem', width: '100%' }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? <span className="animate-soft-pulse">Sending…</span> : 'Send Message →'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
          #contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
