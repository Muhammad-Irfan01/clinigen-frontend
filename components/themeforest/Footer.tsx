"use client";

import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    // { label: "Our Team", href: "/physicians" },
    // { label: "Careers", href: "/careers" },
    // { label: "News", href: "/news" },
  ],
  // services: [
  //   { label: "Managed Access Programs", href: "/services/map" },
  //   { label: "Commercialization", href: "/services/commercialization" },
  //   { label: "Pharmacovigilance", href: "/services/pharmacovigilance" },
  //   { label: "Market Access", href: "/services/market-access" },
  //   { label: "Distribution", href: "/services/distribution" },
  // ],
  support: [
    { label: "Help Center", href: "/support" },
    // { label: "Report Adverse Event", href: "/report-event" },
    { label: "Product Shortage", href: "/shortage" },
    // { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    // { label: "Terms of Use", href: "/terms-of-use" },
    // { label: "Terms of Sale", href: "/terms-of-sale" },
    // { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Privacy Statement (PV)", href: "/privacy-pharmacovigilance" },
  ],
};

// const socialLinks = [
//   {
//     label: "LinkedIn",
//     href: "https://www.linkedin.com/company/Halo Direct",
//     icon: <Icon.LinkedinLogo className="text-lg" />,
//   },
//   {
//     label: "Twitter",
//     href: "https://twitter.com/Halo Direct",
//     icon: <Icon.TwitterLogo className="text-lg" />,
//   },
//   {
//     label: "Facebook",
//     href: "https://www.facebook.com/Halo Direct",
//     icon: <Icon.FacebookLogo className="text-lg" />,
//   },
//   {
//     label: "Instagram",
//     href: "https://www.instagram.com/Halo Direct",
//     icon: <Icon.InstagramLogo className="text-lg" />,
//   },
// ];

interface FooterProps {
  theme?: "light" | "dark";
}

export default function Footer({ theme = "light" }: FooterProps) {
  const isLight = theme === "light";

  return (
    <footer className={`${isLight ? "bg-white" : "bg-[#270072]"}`}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={
                  isLight
                    ? "/images/Halo-Direct.png"
                    : "/images/Halo-Direct-Light.png"
                }
                alt="Halo Direct"
                width={148}
                height={40}
              />
            </Link>
            <p
              className={`text-sm leading-relaxed ${
                isLight ? "text-gray-600" : "text-purple-200"
              }`}
            >
              We are a global healthcare company dedicated to providing access to
              medicines for patients worldwide.
            </p>
            {/* <div className="mt-6">
              <p
                className={`text-sm font-medium ${
                  isLight ? "text-gray-700" : "text-white"
                }`}
              >
                Follow Us
              </p>
              <div className="flex items-center gap-3 mt-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isLight
                        ? "bg-[#F7F4F1] text-[#706FE4] hover:bg-[#706FE4] hover:text-white"
                        : "bg-white/10 text-white hover:bg-white hover:text-[#270072]"
                    }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div> */}
          </div>

          {/* Company Links */}
          <div>
            <h4
              className={`text-base font-bold mb-4 ${
                isLight ? "text-[#270072]" : "text-white"
              }`}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isLight
                        ? "text-gray-600 hover:text-[#706FE4]"
                        : "text-purple-200 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          {/* <div>
            <h4
              className={`text-base font-bold mb-4 ${
                isLight ? "text-[#270072]" : "text-white"
              }`}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isLight
                        ? "text-gray-600 hover:text-[#706FE4]"
                        : "text-purple-200 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Support Links */}
          <div>
            <h4
              className={`text-base font-bold mb-4 ${
                isLight ? "text-[#270072]" : "text-white"
              }`}
            >
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isLight
                        ? "text-gray-600 hover:text-[#706FE4]"
                        : "text-purple-200 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4
              className={`text-base font-bold mb-4 ${
                isLight ? "text-[#270072]" : "text-white"
              }`}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isLight
                        ? "text-gray-600 hover:text-[#706FE4]"
                        : "text-purple-200 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className={`border-t ${
          isLight ? "border-gray-200" : "border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className={`text-sm text-center md:text-left ${
                isLight ? "text-gray-600" : "text-purple-200"
              }`}
            >
              © {new Date().getFullYear()} HaloDirect Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/terms-of-use"
                className={`text-sm ${
                  isLight
                    ? "text-gray-600 hover:text-[#706FE4]"
                    : "text-purple-200 hover:text-white"
                }`}
              >
                Terms of Services
              </Link>
              <span className={isLight ? "text-gray-400" : "text-white/40"}>
                |
              </span>
              <Link
                href="/privacy-policy"
                className={`text-sm ${
                  isLight
                    ? "text-gray-600 hover:text-[#706FE4]"
                    : "text-purple-200 hover:text-white"
                }`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
