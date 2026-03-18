"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom filled social media icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LOCATIONS = [
  {
    city: "Washington DC",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    phone: "(252) 555-0126",
  },
  {
    city: "New York",
    address: "2118 Cir. Syracuse, Connecticut 35624",
    phone: "(684) 555-0102",
  },
  {
    city: "London",
    address: "4517 Washington Ave, Kentucky 39495",
    phone: "(629) 555-0129",
  },
  {
    city: "Morocco",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    phone: "(480) 555-0103",
  },
];

const SOCIAL_LINKS = [
  { name: "Facebook", icon: FacebookIcon },
  { name: "LinkedIn", icon: LinkedInIcon },
  { name: "Twitter", icon: TwitterIcon },
  { name: "YouTube", icon: YouTubeIcon },
  { name: "Instagram", icon: InstagramIcon },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Contact Form */}
      <section className="bg-[#E8EAF8] py-12 px-4 sm:px-6 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-1"
            >
              <span className="inline-block bg-white text-[#7A6FE4] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                CONTACT US
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D0E62] mb-4 leading-tight">
                We're here to help
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Halo Direct supports healthcare professionals in finding and accessing hard-to-source medicines through a reliable global supply network.
              </p>

              {/* Social Icons */}
              <div className="flex gap-2 sm:gap-3 mb-8 flex-wrap">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href="#"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#1D0E62] text-[#1D0E62] hover:text-white transition-colors shadow-sm shrink-0"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Contact Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#7A6FE4] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base break-all">123 456 7890</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#7A6FE4] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base break-all">hi.avitex@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#7A6FE4] rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm sm:text-base break-all">4140 Rd. Allentown, New Mexico 31134</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-10 shadow-sm order-2 lg:order-2"
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400 resize-none text-sm sm:text-base"
                    placeholder="Your Questions..."
                  />
                </div>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className=" bg-[#7A6FE4] hover:bg-[#6B5FD4] text-white font-medium px-8 py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D0E62] mb-3">
              Our Locations
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Tracing the Path of Our Legacy and Growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {LOCATIONS.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F9F8F7] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#1D0E62] mb-4">
                  {location.city}
                </h3>
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500 block mb-1">Address:</span>
                    <p className="text-gray-700 font-medium break-all">{location.address}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Phone Number:</span>
                    <p className="text-gray-700 font-medium">{location.phone}</p>
                  </div>
                  <a
                    href="#"
                    className="inline-block text-[#7A6FE4] font-semibold text-xs hover:underline"
                  >
                    View On Map
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
