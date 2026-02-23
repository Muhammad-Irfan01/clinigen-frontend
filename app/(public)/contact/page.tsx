"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const REGIONS = [
  {
    name: "Australia and New Zealand",
    phone: "+61 1800 181 060",
    fax: "+61 2 8401 9788",
    email: "anz@clinigen.com",
    address: "Level 5, 100 Miller Street, North Sydney NSW 2060",
  },
  {
    name: "Benelux",
    phone: "+32 (0) 2 200 86 79",
    fax: "+32 (0) 2 200 86 80",
    email: "benelux@clinigen.com",
    address: "Avenue Louise 65, 1050 Brussels, Belgium",
  },
  {
    name: "Eastern Europe",
    phone: "+44 1932 824 123",
    fax: "+44 1932 824 323",
    email: "eeurope@clinigen.com",
    address: "Clayton Road, Weybridge, Surrey KT13 0TY, UK",
  },
  {
    name: "France",
    phone: "+33 (0) 1 5732 3223",
    fax: "+33 (0) 1 5732 3935",
    email: "france@clinigen.com",
    address: "15 Rue de la Ville l'Évêque, 75008 Paris, France",
  },
  {
    name: "Germany",
    phone: "+49 (0) 89 1234 5678",
    fax: "+49 (0) 89 1234 5679",
    email: "germany@clinigen.com",
    address: "Maximilianstraße 35, 80539 München, Germany",
  },
  {
    name: "North America",
    phone: "+1 800 555 0123",
    fax: "+1 800 555 0124",
    email: "namerica@clinigen.com",
    address: "100 Park Avenue, New York, NY 10017, USA",
  },
];

const CONTACT_FORM = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function ContactUs() {
  const [formData, setFormData] = useState(CONTACT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData(CONTACT_FORM);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-[#2d1a47] font-sans">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#270072] to-[#706FE4] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-purple-100 max-w-3xl"
          >
            We exist to make sure a healthcare professional with a patient in need, anywhere in the world,
            can always get the right medicine for their individual patient – quickly, easily and safely.
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#F7F4F1] p-8 rounded-xl">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#706FE4] focus:border-transparent outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#706FE4] focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#706FE4] focus:border-transparent outline-none transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#706FE4] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Your questions or comments..."
                />
              </div>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#706FE4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#5a5bd4] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#706FE4] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-gray-600">Call our global headquarters</p>
                  <a href="tel:+442071234567" className="text-[#706FE4] font-bold hover:underline">
                    +44 20 7123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#706FE4] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">General inquiries</p>
                  <a href="mailto:info@clinigen.com" className="text-[#706FE4] font-bold hover:underline">
                    info@clinigen.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#706FE4] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Headquarters</h3>
                  <p className="text-gray-600">
                    Clayton Road<br />
                    Weybridge, Surrey<br />
                    KT13 0TY, United Kingdom
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-10">
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/clinigen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#F7F4F1] rounded-full flex items-center justify-center hover:bg-[#706FE4] hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/clinigen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#F7F4F1] rounded-full flex items-center justify-center hover:bg-[#706FE4] hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/clinigen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#F7F4F1] rounded-full flex items-center justify-center hover:bg-[#706FE4] hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Regional Offices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Global Locations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((region, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-[#706FE4]"
              >
                <h3 className="text-xl font-bold text-[#270072] mb-4">{region.name}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#706FE4]" />
                    <a href={`tel:${region.phone}`} className="text-[#706FE4] font-medium hover:underline">
                      {region.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#706FE4]" />
                    <a href={`mailto:${region.email}`} className="text-[#706FE4] font-medium hover:underline">
                      {region.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <MapPin size={16} className="text-[#706FE4] mt-0.5" />
                    <p className="text-gray-600">{region.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
