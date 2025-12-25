"use client";

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error on change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3
    bg-[var(--bg-glass)] backdrop-blur-md
    border ${hasError ? 'border-red-500/50' : 'border-[var(--border-subtle)]'}
    rounded-xl
    text-[var(--text-primary)]
    placeholder:text-[var(--text-muted)]
    focus:outline-none focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]
    transition-all duration-300
    hover:border-[var(--border-medium)]
    disabled:opacity-50 disabled:cursor-not-allowed
    font-body text-sm
  `;

  return (
    <div className="glass-card rounded-xl p-8 hover:border-[var(--border-accent)] transition-all duration-500">
      <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-8">
        Send a Message
      </h3>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-8"
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-[var(--accent-gold-soft)] flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="h-8 w-8 text-[var(--accent-gold)]" />
            </motion.div>
            <motion.h4
              className="text-xl font-display font-semibold text-[var(--text-primary)] mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Thank You
            </motion.h4>
            <motion.p
              className="text-[var(--text-secondary)] mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your message has been sent. I'll get back to you soon.
            </motion.p>
            <motion.button
              onClick={() => setIsSubmitted(false)}
              className="text-[var(--accent-gold)] hover:text-[var(--accent-warm)] text-sm font-medium transition-colors duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <label htmlFor="name" className="block text-[var(--text-secondary)] text-sm mb-2 font-body">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClasses(!!errors.name)}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-2 text-red-400 text-xs">{errors.name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <label htmlFor="email" className="block text-[var(--text-secondary)] text-sm mb-2 font-body">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={inputClasses(!!errors.email)}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-2 text-red-400 text-xs">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <label htmlFor="message" className="block text-[var(--text-secondary)] text-sm mb-2 font-body">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your message..."
                className={`${inputClasses(!!errors.message)} resize-none`}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-2 text-red-400 text-xs">{errors.message}</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
