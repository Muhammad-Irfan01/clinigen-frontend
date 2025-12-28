import Link from 'next/link';
import React from 'react'

interface footerItems {
  label: string,
  href: string,
}

const footerLinks: footerItems[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Terms of Sale", href: "/terms-of-sale" },
  {
    label: "Privacy statement for Pharmacovigilance Data",
    href: "/privacy-pharmacovigilance",
  },
];
const Footer = () => {
  return (
    <footer className="bg-[#F7F4F1] border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#270072]">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-[#270072] md:text-right">
            © Copyright 2025 Clingen Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
