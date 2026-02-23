"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';

const SECTIONS = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "1. Information We Collect",
    content: (
      <>
        <p className="mb-4">We collect information that you provide directly to us, including:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Personal Information:</strong> Name, email address, phone number, professional credentials, and institution details</li>
          <li><strong>Healthcare Professional Information:</strong> Medical license number, specialty, and practice information</li>
          <li><strong>Order Information:</strong> Medicine requests, prescription details, and patient information (where legally permitted)</li>
          <li><strong>Communication Data:</strong> Correspondence with our support team and healthcare professionals</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns</li>
        </ul>
      </>
    )
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "2. How We Use Your Information",
    content: (
      <>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Process and fulfill medicine orders and access program requests</li>
          <li>Verify healthcare professional credentials and institutional affiliations</li>
          <li>Provide patient support services and pharmacovigilance monitoring</li>
          <li>Communicate important updates about orders, shortages, or safety information</li>
          <li>Improve our services and develop new features</li>
          <li>Comply with legal and regulatory obligations</li>
          <li>Prevent fraud and ensure the security of our platform</li>
        </ul>
      </>
    )
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "3. Information Sharing and Disclosure",
    content: (
      <>
        <p className="mb-4">We may share your information in the following circumstances:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>With Healthcare Partners:</strong> Pharmaceutical manufacturers, distributors, and healthcare providers involved in patient care</li>
          <li><strong>With Regulatory Authorities:</strong> As required by law, including pharmacovigilance reporting obligations</li>
          <li><strong>With Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., logistics, IT services)</li>
          <li><strong>Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
        <p className="mt-4 text-gray-700">We do not sell your personal information to third parties.</p>
      </>
    )
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "4. Data Security",
    content: (
      <>
        <p className="mb-4">We implement appropriate technical and organizational measures to protect your information:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and audits</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Employee training on data protection and confidentiality</li>
          <li>Secure data centers with physical security measures</li>
        </ul>
        <p className="mt-4 text-gray-700">However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
      </>
    )
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "5. Your Rights and Choices",
    content: (
      <>
        <p className="mb-4">Depending on your location, you may have the following rights:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
          <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
          <li><strong>Portability:</strong> Request transfer of your data to another organization</li>
          <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
        </ul>
        <p className="mt-4 text-gray-700">To exercise these rights, please contact our Data Protection Officer at privacy@clinigen.com</p>
      </>
    )
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "6. International Data Transfers",
    content: (
      <>
        <p className="mb-4">Clinigen operates globally, and your information may be transferred to and processed in countries other than your country of residence.</p>
        <p className="text-gray-700">
          We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses approved by relevant authorities,
          Binding Corporate Rules, or adequacy decisions by the European Commission.
        </p>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "7. Data Retention",
    content: (
      <>
        <p className="text-gray-700">
          We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required
          by law. For healthcare-related data, we may retain information for extended periods to comply with pharmacovigilance obligations and medical record
          requirements. Typical retention periods range from 3 to 10 years depending on the type of data and applicable regulations.
        </p>
      </>
    )
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "8. Cookies and Tracking Technologies",
    content: (
      <>
        <p className="mb-4">We use cookies and similar tracking technologies to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
          <li>Enable essential website functionality</li>
          <li>Analyze website usage and performance</li>
          <li>Personalize your experience</li>
          <li>Deliver relevant marketing communications</li>
        </ul>
        <p className="mt-4 text-gray-700">You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect website functionality.</p>
      </>
    )
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "9. Children's Privacy",
    content: (
      <>
        <p className="text-gray-700">
          Our services are intended for healthcare professionals and are not directed to individuals under the age of 18. We do not knowingly collect
          personal information from children. If you believe we have collected information from a child, please contact us immediately.
        </p>
      </>
    )
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "10. Changes to This Policy",
    content: (
      <>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
          We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to
          review this policy periodically.
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
          If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="bg-[#F7F4F1] p-6 rounded-lg mt-4">
          <p className="font-bold text-[#270072]">Data Protection Officer</p>
          <p className="text-gray-700 mt-2">
            <strong>Email:</strong> privacy@clinigen.com
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
              Clinigen Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully to
              understand our practices regarding your personal information.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              This policy applies to all information collected through our website, mobile applications, and other digital platforms,
              as well as information collected through our offline interactions with healthcare professionals, patients, and partners.
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

      {/* Additional Information */}
      <section className="py-16 px-6 bg-[#F7F4F1]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#270072] mb-6">Additional Information for Specific Regions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#270072] mb-3">European Economic Area (EEA)</h3>
              <p className="text-gray-700">
                If you are located in the EEA, Clinigen Ltd. is the data controller for your personal information. We process your data
                in accordance with the General Data Protection Regulation (GDPR) and applicable national data protection laws. You have
                the right to lodge a complaint with your local data protection authority.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#270072] mb-3">United States</h3>
              <p className="text-gray-700">
                For US residents, certain state privacy laws may provide additional rights. We comply with applicable state privacy laws
                including the California Consumer Privacy Act (CCPA) and Virginia Consumer Data Protection Act (VCDPA).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#270072] mb-3">United Kingdom</h3>
              <p className="text-gray-700">
                Following Brexit, the UK GDPR and Data Protection Act 2018 govern data protection in the UK. Your rights under UK data
                protection law are substantially the same as under the EU GDPR.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
