"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, Shield, Ban, Scale, Mail } from 'lucide-react';

const SECTIONS = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p className="text-gray-700">
          By accessing and using the Clinigen website and services (the "Platform"), you accept and agree to be bound
          by the terms and provision of this Terms of Use Agreement ("Agreement"). If you do not agree to abide by these
          terms, please do not use this Platform.
        </p>
        <p className="text-gray-700 mt-4">
          These Terms of Use apply to all users of the Platform, including healthcare professionals, patients,
          pharmaceutical partners, and other visitors. By registering an account, you confirm that you are a qualified
          healthcare professional or an authorized representative of a healthcare institution.
        </p>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "2. Eligibility and Registration",
    content: (
      <>
        <p className="mb-4 text-gray-700">To use certain features of the Platform, you must register for an account. By registering, you represent and warrant that:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>You are a qualified healthcare professional licensed to practice in your jurisdiction</li>
          <li>You are authorized to act on behalf of the healthcare institution you represent</li>
          <li>All information you provide is accurate, current, and complete</li>
          <li>You will maintain the security of your account credentials</li>
          <li>You will notify us immediately of any unauthorized use of your account</li>
          <li>You are at least 18 years of age</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Clinigen reserves the right to refuse registration, cancel accounts, or remove or reclassify content at any time
          for any reason or no reason, with or without notice.
        </p>
      </>
    )
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "3. Medicine Orders and Access Programs",
    content: (
      <>
        <p className="mb-4 text-gray-700">The Platform facilitates access to unlicensed, shortage, and specialty medicines. By placing orders, you acknowledge that:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Medicines supplied through the Platform are intended for named patients under your care</li>
          <li>You are responsible for ensuring prescriptions comply with applicable laws and regulations</li>
          <li>Unlicensed medicines are supplied in response to unsolicited orders from healthcare professionals</li>
          <li>Managed Access Programs are subject to specific eligibility criteria and terms</li>
          <li>Pricing and availability are subject to change without notice</li>
          <li>Import permits and regulatory approvals may be required in your country</li>
        </ul>
        <p className="text-gray-700 mt-4">
          All orders are subject to acceptance by Clinigen. We reserve the right to refuse or cancel any order for any reason,
          including but not limited to regulatory restrictions, supply limitations, or concerns about patient safety.
        </p>
      </>
    )
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "4. Prohibited Uses",
    content: (
      <>
        <p className="mb-4 text-gray-700">You may not use the Platform to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Attempt to gain unauthorized access to any portion of the Platform or its systems</li>
          <li>Use the Platform for any illegal purpose or in violation of any laws</li>
          <li>Impersonate any person or entity or misrepresent your affiliation</li>
          <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
          <li>Use the Platform to transmit spam, chain letters, or other unsolicited messages</li>
          <li>Attempt to circumvent any content filtering or security measures</li>
          <li>Use the Platform to distribute medicines for personal use or resale</li>
          <li>Solicit patients directly or engage in direct-to-consumer advertising</li>
        </ul>
      </>
    )
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "5. Intellectual Property Rights",
    content: (
      <>
        <p className="text-gray-700">
          The Platform and its entire contents, features, and functionality (including but not limited to all information,
          software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned
          by Clinigen, its licensors, or other providers of such material and are protected by copyright, trademark, patent,
          trade secret, and other intellectual property or proprietary rights laws.
        </p>
        <p className="text-gray-700 mt-4">
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish,
          download, store, or transmit any of the material on our Platform without our prior written consent.
        </p>
      </>
    )
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "6. Medical Disclaimer",
    content: (
      <>
        <p className="text-gray-700">
          The information provided on the Platform is for informational purposes only and is not intended as a substitute
          for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers
          with questions you may have regarding medical conditions.
        </p>
        <p className="text-gray-700 mt-4">
          Clinigen does not recommend or endorse any specific medicines, procedures, or opinions that may be discussed on
          the Platform. Reliance on any information provided by Clinigen, its employees, contracted writers, or medical
          professionals is solely at your own risk.
        </p>
      </>
    )
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "7. Limitation of Liability",
    content: (
      <>
        <p className="text-gray-700">
          TO THE FULLEST EXTENT PERMITTED BY LAW, CLINIGEN, ITS AFFILIATES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS,
          EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
          RESULTING FROM:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
          <li>Your access to or use of or inability to access or use the Platform</li>
          <li>Any conduct or content of any third party on the Platform</li>
          <li>Any content obtained from the Platform</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          <li>Delays or interruptions in the delivery of medicines due to circumstances beyond our control</li>
        </ul>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "8. Indemnification",
    content: (
      <>
        <p className="text-gray-700">
          You agree to defend, indemnify, and hold harmless Clinigen and its subsidiaries, agents, licensors, managers,
          and other affiliated companies, and their employees, contractors, agents, officers, and directors, from and
          against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including
          but not limited to attorney's fees) arising from:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
          <li>Your use of and access to the Platform</li>
          <li>Your violation of any term of these Terms of Use</li>
          <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
          <li>Any claim that your use of the Platform caused damage to a third party</li>
          <li>Your orders for medicines and subsequent use in patient treatment</li>
        </ul>
      </>
    )
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "9. Governing Law",
    content: (
      <>
        <p className="text-gray-700">
          These Terms of Use and any dispute or claim arising out of or in connection with them or their subject matter
          or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance
          with the laws of England and Wales, without regard to its conflict of law principles.
        </p>
        <p className="text-gray-700 mt-4">
          Any legal action or proceeding arising under these Terms of Use will be brought exclusively in the federal or
          state courts located in London, United Kingdom, and you hereby consent to the personal jurisdiction and venue
          therein.
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
          We reserve the right to modify these Terms of Use at any time at our sole discretion. When we do, we will revise
          the "Last Updated" date at the top of this page. Your continued use of the Platform after any such changes
          constitutes your acceptance of the new Terms of Use.
        </p>
        <p className="text-gray-700 mt-4">
          We may also notify you of material changes by email or through prominent notices on the Platform. If you do not
          agree with the modified terms, you should discontinue your use of the Platform.
        </p>
      </>
    )
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "11. Contact Information",
    content: (
      <>
        <p className="mb-4 text-gray-700">
          For questions or concerns about these Terms of Use, please contact us at:
        </p>
        <div className="bg-[#F7F4F1] p-6 rounded-lg mt-4">
          <p className="font-bold text-[#270072]">Clinigen Ltd. Legal Department</p>
          <p className="text-gray-700 mt-2">
            <strong>Email:</strong> legal@clinigen.com
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> +44 20 7123 4567
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong><br />
            Clinigen Ltd.<br />
            Clayton Road<br />
            Weybridge, Surrey KT13 0TY<br />
            United Kingdom
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
            Terms of Use
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-purple-100"
          >
            Last Updated: January 2025
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
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Clinigen. These Terms of Use govern your access to and use of our website, mobile applications,
              and related services (collectively, the "Platform"). By using the Platform, you agree to be bound by these
              Terms of Use and our Privacy Policy.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              The Platform is intended for use by healthcare professionals for the purpose of ordering medicines for their
              patients and participating in managed access programs. It is not intended for use by patients or the general public.
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

      {/* Important Notice */}
      <section className="py-16 px-6 bg-[#F7F4F1]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Notice for Healthcare Professionals</h3>
                <p className="text-yellow-700">
                  By using this Platform, you acknowledge that you are responsible for verifying that any medicine ordered
                  is appropriate for your patient and complies with all applicable laws and regulations in your jurisdiction.
                  Clinigen acts as a supplier and does not provide medical advice or make treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
