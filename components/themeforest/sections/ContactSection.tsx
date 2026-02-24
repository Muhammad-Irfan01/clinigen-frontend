"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react";
import { ArrowRight } from "lucide-react";

interface ContactSectionProps {
  classname?: string;
}

export default function ContactSection({ classname }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={`section-contact py-[60px] ${classname}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:flex items-center justify-between">
          <div className="content-main w-full xl:w-7/12 lg:w-1/2 text-white">
            <span className="text-sm font-bold text-white bg-[#1D0E62] px-4 py-2 rounded-full inline-block">
              Contact us
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mt-3">
              Free consultation - discover healthcare solutions for your business
            </h3>
            <p className="text-white/90 mt-6 text-lg">
              Unlock the full potential of your healthcare facility with our free consultation. 
              Our expert team will assess your needs, recommend tailored solutions, and chart a path to success. 
              Book your consultation now and take the first step towards empowering your business.
            </p>
            <div className="list-features mt-4 pb-6 border-b border-white/30">
              <div className="item flex items-center">
                <Icon.Check className="text-xl" weight="bold" />
                <span className="pl-3 text-white">Confirmation of appointment details</span>
              </div>
              <div className="item flex items-center mt-2">
                <Icon.Check className="text-xl" weight="bold" />
                <span className="pl-3 text-white">Research and preparation by our team</span>
              </div>
              <div className="item flex items-center mt-2">
                <Icon.Check className="text-xl" weight="bold" />
                <span className="pl-3 text-white">Consultation to discuss healthcare solutions</span>
              </div>
              <div className="item flex items-center mt-2">
                <Icon.Check className="text-xl" weight="bold" />
                <span className="pl-3 text-white">Needs assessment for tailored solutions</span>
              </div>
              <div className="item flex items-center mt-2">
                <Icon.Check className="text-xl" weight="bold" />
                <span className="pl-3 text-white">Presentation of proposed solutions</span>
              </div>
              <div className="item flex items-center mt-2">
                <Icon.Check className="text-xl" weight="bold" />
                <span className="pl-3 text-white">Project execution and ongoing support</span>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <Icon.Envelope className="text-xl" />
              <span className="pl-3 text-white">info@clinigen.com</span>
            </div>
            <div className="flex items-center mt-2">
              <Icon.PhoneCall className="text-xl" />
              <span className="pl-3 text-white">+44 (0) 20 1234 5678</span>
            </div>
            <div className="flex items-center mt-2">
              <Icon.MapPin className="text-xl" />
              <span className="pl-3 text-white">123 Healthcare Street, London, UK</span>
            </div>
            <Link 
              href="https://maps.google.com" 
              target="_blank" 
              className="inline-block underline mt-2 text-white hover:text-white/80"
            >
              Open map
            </Link>
          </div>
          <div className="w-full xl:w-1/3 lg:w-[40%] max-lg:mt-10">
            <div className="form-block rounded-2xl bg-white py-6 px-7 flex flex-col gap-5 shadow-lg">
              <div className="text-2xl font-bold text-[#1D0E62]">Schedule a free consultation</div>
              <form className="grid max-lg:grid-cols-2 gap-5 gap-y-2" onSubmit={handleSubmit}>
                <div className="name w-full max-sm:col-span-2">
                  <label className="inline-block text-sm text-gray-600 pb-2" htmlFor="name">Name</label>
                  <input 
                    className="w-full bg-white px-4 py-3 rounded border border-gray-300 focus:border-[#706FE4] focus:outline-none" 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="phone w-full max-sm:col-span-2">
                  <label className="inline-block text-sm text-gray-600 pb-2" htmlFor="phone">Phone</label>
                  <input 
                    className="w-full bg-white px-4 py-3 rounded border border-gray-300 focus:border-[#706FE4] focus:outline-none" 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="email w-full max-sm:col-span-2">
                  <label className="inline-block text-sm text-gray-600 pb-2" htmlFor="email">Email</label>
                  <input 
                    className="w-full bg-white px-4 py-3 rounded border border-gray-300 focus:border-[#706FE4] focus:outline-none" 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="organization w-full max-sm:col-span-2">
                  <label className="inline-block text-sm text-gray-600 pb-2" htmlFor="company">Company/ Organization</label>
                  <input 
                    className="w-full bg-white px-4 py-3 rounded border border-gray-300 focus:border-[#706FE4] focus:outline-none" 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="select w-full max-lg:col-span-2">
                  <label className="inline-block text-sm text-gray-600 pb-2" htmlFor="service">How can we help you?</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-white pl-4 pr-10 py-3 rounded border border-gray-300 focus:border-[#706FE4] focus:outline-none appearance-none" 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      <option value="Specialty Medicines">Specialty Medicines</option>
                      <option value="Regulatory Services">Regulatory Services</option>
                      <option value="Cold Chain Logistics">Cold Chain Logistics</option>
                      <option value="Quality Assurance">Quality Assurance</option>
                      <option value="Patient Programs">Patient Programs</option>
                      <option value="Market Access">Market Access</option>
                    </select>
                    <Icon.CaretDown className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500" />
                  </div>
                </div>
                <div className="message w-full max-lg:col-span-2">
                  <label className="inline-block text-sm text-gray-600 pb-2" htmlFor="message">Message</label>
                  <textarea 
                    className="w-full bg-white px-4 py-3 rounded border border-gray-300 focus:border-[#706FE4] focus:outline-none resize-none" 
                    rows={3} 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="block-button max-lg:col-span-2 mt-3">
                  <button 
                    type="submit" 
                    className="w-full bg-[#706FE4] hover:bg-[#5a5bd4] text-white font-bold py-3 px-6 rounded-full transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Submit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
