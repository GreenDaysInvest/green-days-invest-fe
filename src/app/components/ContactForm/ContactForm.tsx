"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '../Modal/Modal';
import EmailService from '@/app/services/emailService';
import { motion } from 'framer-motion';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await EmailService.sendContactForm(formData);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-center text-secondary mb-6">{t('title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('nameLabel')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="text-secondary w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-main"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="text-secondary w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-main"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {t('messageLabel')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="text-secondary w-full px-3 py-2 border border-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-main"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded-md ${
                isSubmitting ? 'bg-gray-400' : 'bg-secondary hover:bg-main'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </motion.button>
          </div>
          {submitStatus === 'success' && (
            <p className="text-secondary text-center mt-2">{t('successMessage')}</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center mt-2">{t('errorMessage')}</p>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default ContactForm;
