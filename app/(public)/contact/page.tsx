"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
  { name: "Facebook", icon: "f" },
  { name: "LinkedIn", icon: "in" },
  { name: "Twitter", icon: "tw" },
  { name: "YouTube", icon: "yt" },
  { name: "Instagram", icon: "ig" },
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
      <section className="bg-[#E8EAF8] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-[#E8E4F5] text-[#7A6FE4] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                CONTACT US
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1D0E62] mb-4">
                We're here to help
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Halo Direct supports healthcare professionals in finding and accessing hard-to-source medicines through a reliable global supply network.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 mb-8">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#7A6FE4] hover:text-white transition-colors shadow-sm"
                    aria-label={social.name}
                  >
                    <span className="text-xs font-bold">{social.icon}</span>
                  </a>
                ))}
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="w-10 h-10 bg-[#7A6FE4] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">123 456 7890</span>
                </div>
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="w-10 h-10 bg-[#7A6FE4] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">hi.avitex@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <div className="w-10 h-10 bg-[#7A6FE4] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">4140 Rd. Allentown, New Mexico 31134</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400"
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
                      className="w-full px-4 py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400"
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
                    className="w-full px-4 py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400"
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
                    className="w-full px-4 py-3.5 bg-[#F0F0F5] rounded-xl border-0 focus:ring-2 focus:ring-[#7A6FE4] outline-none text-gray-700 placeholder-gray-400 resize-none"
                    placeholder="Your Questions..."
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
                  className="w-full sm:w-auto bg-[#7A6FE4] hover:bg-[#6B5FD4] text-white font-medium px-8 py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1D0E62] mb-3">
              Our Locations
            </h2>
            <p className="text-gray-600">
              Tracing the Path of Our Legacy and Growth
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F9F8F7] rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-[#1D0E62] mb-4">
                  {location.city}
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-500 block mb-1">Address:</span>
                    <p className="text-gray-700 font-medium">{location.address}</p>
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
