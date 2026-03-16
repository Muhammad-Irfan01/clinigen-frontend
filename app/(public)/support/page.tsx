"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_SECTIONS = [
  {
    title: "How to order medicines online",
    questions: [
      {
        q: "Who can register for a Halo Direct account?",
        a: "Healthcare professionals, hospitals, pharmacies, and authorized medical organizations can register to request medicines through Halo Direct."
      },
      {
        q: "How do I create an account?",
        a: "You can register online by completing the Halo Direct sign-up form and submitting the required professional or institutional details for verification."
      },
      {
        q: "What information is required to set up an account?",
        a: "You may be asked to provide professional credentials, organization details, and verification documents depending on your region and regulatory requirements."
      },
      {
        q: "How do I request medicine through Halo Direct?",
        a: "Simply search for the medicine on the platform and submit a request through the secure ordering system."
      },
      {
        q: "How long does account verification take?",
        a: "Verification time may vary, but most accounts are reviewed and approved within a short period once all required details are provided."
      }
    ]
  },
  {
    title: "Understanding Unlicensed & Specialty Medicines",
    questions: [
      {
        q: "What is an unlicensed medicine?",
        a: "An unlicensed medicine is a product that may not be approved for marketing in a specific country but can be supplied under special regulations when a licensed alternative is unavailable."
      },
      {
        q: "What are access programs?",
        a: "Access programs allow healthcare professionals to obtain medicines that are not yet widely available or approved in certain regions for patients with specific medical needs."
      },
      {
        q: "Why can medicine availability vary between countries?",
        a: "Medicine availability depends on national regulations, approvals, and supply conditions within each country."
      },
      {
        q: "Why might some medicines not be available in my region?",
        a: "Certain medicines may be restricted due to regulatory policies, manufacturer distribution rules, or local approval requirements."
      },
      {
        q: "How can I learn about regulations for unlicensed medicines in my country?",
        a: "Healthcare professionals should follow guidance from their national regulatory authority and local healthcare regulations."
      }
    ]
  },
  {
    title: "Delivery and Payment Information",
    questions: [
      {
        q: "How are medicines shipped through Halo Direct?",
        a: "Halo Direct works with trusted logistics partners to ensure medicines are shipped securely and in compliance with healthcare regulations."
      },
      {
        q: "Are there delivery charges?",
        a: "Delivery costs may vary depending on the location, product type, and shipping requirements. Full details are provided during the ordering process."
      },
      {
        q: "How can I track my order?",
        a: "Once your request is processed, you will receive updates and tracking information so you can monitor the delivery status of your order."
      },
      {
        q: "Where can I see medicine pricing?",
        a: "Pricing information is available within the platform once you log in and search for the required medicine."
      }
    ]
  }
];

function AccordionItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={onClick}
          className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-md text-gray-700 pr-4">{question}</span>
          <ChevronDown
            className={`w-5 h-5 text-white rounded-full shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 bg-[#F97316]" : "bg-[#7A6FE4]"}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 text-md text-gray-600 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<{ section: number; question: number } | null>(null);

  const toggleAccordion = (sectionIndex: number, questionIndex: number) => {
    setOpenIndex(
      openIndex?.section === sectionIndex && openIndex?.question === questionIndex
        ? null
        : { section: sectionIndex, question: questionIndex }
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F7]">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#1D0E62] mb-4"
          >
            Support
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            We're here to help
          </motion.p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {FAQ_SECTIONS.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-xl font-bold text-[#1D0E62] mb-4">
                {section.title}
              </h2>
              <div className="rounded-xl overflow-hidden">
                {section.questions.map((item, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    question={item.q}
                    answer={item.a}
                    isOpen={
                      openIndex?.section === sectionIndex &&
                      openIndex?.question === questionIndex
                    }
                    onClick={() => toggleAccordion(sectionIndex, questionIndex)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Helpful Guides Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#1D0E62] leading-tight lg:w-100">
                Helpful guides available after login
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Once you sign in, you'll have access to onboarding guides and helpful resources that
                show you how to search, request, and manage medicine orders on Halo Direct.
              </p>
              <div className="flex gap-3">
                <button className="bg-[#D4A7F0] hover:bg-[#C495E8] text-white font-medium px-6 py-1 rounded-full transition-colors">
                  Sign Up
                </button>
                <button className="bg-[#7A6FE4] hover:bg-[#6B5FD4] text-white font-medium px-6 py-1 rounded-full transition-colors">
                  Login
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      <section className="py-8 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-[#A98DF2] to-[#C4A7F0] rounded-2xl px-2 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <h3 className="text-xl md:text-[26px] font-bold text-white text-center sm:text-left">
              Need Help Finding Hard-to-Source Medicines?
            </h3>
            <button
              onClick={() => window.location.href = "/contact"}
              className="bg-white hover:bg-gray-50 text-[#7A6FE4] font-semibold px-6 py-1 rounded-full transition-colors w-full sm:w-auto"
            >
              Request Access
            </button>
          </motion.div>
        </div>
      </section>
      </section>

      {/* CTA Banner */}
    </div>
  );
}
