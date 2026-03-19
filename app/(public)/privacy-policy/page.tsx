"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail, Globe, FileText, Smartphone } from 'lucide-react';

const SECTIONS = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "2. Information We Collect",
    content: (
      <>
        <div className="mb-6">
          <h3 className="font-bold text-[#270072] mb-2">a. Personal Information</h3>
          <p className="mb-2 text-gray-700">We may collect the following personal data:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business/company details</li>
            <li>Any information you provide through forms or communication</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[#270072] mb-2">b. Non-Personal Information</h3>
          <p className="mb-2 text-gray-700">We may automatically collect:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited and time spent on the site</li>
            <li>Cookies and tracking data</li>
          </ul>
        </div>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="mb-4 text-gray-700">We use your information to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Provide and manage our services</li>
          <li>Respond to inquiries and customer support requests</li>
          <li>Improve website performance and user experience</li>
          <li>Send updates, marketing, or promotional content (only if you opt-in)</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
      </>
    )
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "4. Cookies and Tracking Technologies",
    content: (
      <>
        <p className="mb-4 text-gray-700">We use cookies and similar technologies to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Enhance your browsing experience</li>
          <li>Analyze website traffic</li>
          <li>Understand user behavior</li>
        </ul>
        <p className="mt-4 text-gray-700">You can control or disable cookies through your browser settings.</p>
      </>
    )
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "5. Sharing Your Information",
    content: (
      <>
        <p className="mb-4 text-gray-700">We do not sell or rent your personal data. We may share your information with:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Trusted service providers (hosting, analytics, marketing tools)</li>
          <li>Legal authorities if required by law</li>
          <li>Business partners (only when necessary for service delivery)</li>
        </ul>
      </>
    )
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "6. Data Security",
    content: (
      <>
        <p className="text-gray-700">
          We implement appropriate technical and organizational measures to protect your personal data. However, no online system is 100% secure,
          and we cannot guarantee absolute security.
        </p>
      </>
    )
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "7. Data Retention",
    content: (
      <>
        <p className="mb-4 text-gray-700">We retain your information only for as long as necessary to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Fulfill the purposes outlined in this policy</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes</li>
        </ul>
      </>
    )
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "8. Your Rights",
    content: (
      <>
        <p className="mb-4 text-gray-700">Depending on your location, you may have the right to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Access your personal data</li>
          <li>Correct or update your data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for marketing communications</li>
        </ul>
        <p className="mt-4 text-gray-700">To exercise your rights, contact us at: <a href="mailto:info@halodirect.io" className="text-[#270072] underline">info@halodirect.io</a></p>
      </>
    )
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "9. Third-Party Links",
    content: (
      <>
        <p className="text-gray-700">
          Our website may contain links to third-party websites. We are not responsible for their privacy practices.
          Please review their policies before providing any information.
        </p>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "10. Changes to This Privacy Policy",
    content: (
      <>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
        </p>
      </>
    )
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "11. Contact Us",
    content: (
      <>
        <p className="mb-4 text-gray-700">
          If you have any questions about this Privacy Policy, you can contact us at:
        </p>
        <div className="bg-[#F7F4F1] p-6 rounded-lg mt-4">
          <p className="text-gray-700 mb-2">
            <strong>Website:</strong> <a href="https://halodirect.io" className="text-[#270072] underline" target="_blank" rel="noopener noreferrer">https://halodirect.io</a>
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> <a href="mailto:info@halodirect.io" className="text-[#270072] underline">info@halodirect.io</a>
          </p>
        </div>
      </>
    )
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-[#2d1a47] font-sans">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#270072] to-[#706FE4] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-purple-100"
          >
            Halo Direct (halodirect.io)
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-md text-purple-200 mt-2"
          >
            Effective Date: 19-March-2026
          </motion.p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F7F4F1] p-8 rounded-xl mb-12"
          >
            <h2 className="text-2xl font-bold text-[#270072] mb-4">1. Introduction</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Halo Direct ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
              our website halodirect.io or use our services.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-12">
            {SECTIONS.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="border-b border-gray-200 pb-8 last:border-0"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#706FE4] rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#270072] pt-2">{section.title}</h2>
                </div>
                <div className="text-gray-700 leading-relaxed pl-16">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
