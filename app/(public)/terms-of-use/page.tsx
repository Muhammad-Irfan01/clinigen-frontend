"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertCircle, Lock, CreditCard, Scale, Mail, Globe, Ban } from 'lucide-react';

const SECTIONS = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "1. Introduction",
    content: (
      <>
        <p className="text-gray-700">
          Welcome to Halo Direct. These Terms and Conditions ("Terms") govern your use of our website{" "}
          <a href="https://halodirect.io" className="text-[#270072] underline" target="_blank" rel="noopener noreferrer">
            https://halodirect.io
          </a>{" "}
          and our services. By accessing or using our website, you agree to comply with these Terms.
        </p>
        <p className="text-gray-700 mt-4">
          If you do not agree with any part of these Terms, you must not use our services.
        </p>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "2. Use of Website",
    content: (
      <>
        <p className="mb-4 text-gray-700">You agree to use this website only for lawful purposes. You must not:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Use the website in any way that may damage or disrupt services</li>
          <li>Attempt unauthorized access to any part of the website</li>
          <li>Use the website for fraudulent or harmful activities</li>
          <li>Copy, distribute, or misuse any content without permission</li>
        </ul>
      </>
    )
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "3. Services",
    content: (
      <>
        <p className="mb-4 text-gray-700">Halo Direct provides digital services including but not limited to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Marketing and branding services</li>
          <li>Web design and development</li>
          <li>Digital solutions and consultancy</li>
        </ul>
        <p className="text-gray-700 mt-4">
          We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
        </p>
      </>
    )
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "4. User Information",
    content: (
      <>
        <p className="text-gray-700">
          By using our services, you agree to provide accurate and complete information. You are responsible for
          maintaining the confidentiality of any information you share with us.
        </p>
        <p className="text-gray-700 mt-4">
          For details on how we handle your data, please review our{" "}
          <a href="/privacy-policy" className="text-[#270072] underline">Privacy Policy</a>.
        </p>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "5. Intellectual Property",
    content: (
      <>
        <p className="mb-4 text-gray-700">All content on this website, including:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Text</li>
          <li>Graphics</li>
          <li>Logos</li>
          <li>Design elements</li>
        </ul>
        <p className="text-gray-700 mt-4">
          is the property of Halo Direct unless otherwise stated and is protected by applicable intellectual property laws.
        </p>
        <p className="text-gray-700 mt-4">
          You may not use, reproduce, or distribute any content without written permission.
        </p>
      </>
    )
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "6. Payments and Refunds",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>All payments for services must be made as agreed in advance or per contract</li>
          <li>Fees are non-refundable unless otherwise agreed in writing</li>
          <li>We reserve the right to change pricing at any time</li>
        </ul>
      </>
    )
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "7. Limitation of Liability",
    content: (
      <>
        <p className="mb-4 text-gray-700">Halo Direct will not be liable for:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Any indirect, incidental, or consequential damages</li>
          <li>Loss of data, profits, or business</li>
          <li>Any issues arising from third-party services</li>
        </ul>
        <p className="text-gray-700 mt-4">Use of our website and services is at your own risk.</p>
      </>
    )
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "8. Third-Party Links",
    content: (
      <>
        <p className="text-gray-700">
          Our website may include links to third-party websites. We are not responsible for their content,
          policies, or practices.
        </p>
      </>
    )
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "9. Termination",
    content: (
      <>
        <p className="text-gray-700">
          We reserve the right to terminate or suspend access to our website or services at any time, without notice,
          if you violate these Terms.
        </p>
      </>
    )
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "10. Changes to Terms",
    content: (
      <>
        <p className="text-gray-700">
          We may update these Terms at any time. Continued use of the website after changes means you accept the
          updated Terms.
        </p>
      </>
    )
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "11. Governing Law",
    content: (
      <>
        <p className="text-gray-700">
          These Terms shall be governed and interpreted in accordance with the laws applicable in your jurisdiction.
        </p>
      </>
    )
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "12. Contact Us",
    content: (
      <>
        <p className="mb-4 text-gray-700">
          If you have any questions regarding these Terms, you can contact us:
        </p>
        <div className="bg-[#F7F4F1] p-6 rounded-lg mt-4">
          <p className="text-gray-700 mb-2">
            <strong>Website:</strong>{" "}
            <a href="https://halodirect.io" className="text-[#270072] underline" target="_blank" rel="noopener noreferrer">
              https://halodirect.io
            </a>
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong>{" "}
            <a href="mailto:info@halodirect.io" className="text-[#270072] underline">
              info@halodirect.io
            </a>
          </p>
        </div>
      </>
    )
  }
];

export default function TermsOfUse() {
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
            Terms and Conditions
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

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
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
