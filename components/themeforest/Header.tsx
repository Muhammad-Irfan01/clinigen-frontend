"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";

// Navigation data
const navItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Products",
    to: "/products",
    subMenu: [
      { title: "All Products", to: "/products" },
      { title: "Specialty Medicines", to: "/products?category=specialty" },
      { title: "Shortage Medicines", to: "/shortage" },
    ],
  },
  {
    title: "Orders",
    to: "/order",
  },
  {
    title: "Company",
    to: "#!",
    subMenu: [
      { title: "About Us", to: "/about" },
      { title: "Contact", to: "/contact" },
      { title: "Privacy Policy", to: "/privacy-policy" },
      { title: "Terms of Use", to: "/terms-of-use" },
    ],
  },
  {
    title: "Support",
    to: "/support",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];

interface HeaderProps {
  theme?: "light" | "dark";
}

export default function Header({ theme = "light" }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const isLight = theme === "light";

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${
          isLight ? "" : "bg-[#270072] border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={
                  isLight
                    ? "/images/Halo-Direct.png"
                    : "/images/Halo-Direct-Light.png"
                }
                alt="Clinigen"
                width={148}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.subMenu && setOpenSubMenu(item.title)}
                  onMouseLeave={() => item.subMenu && setOpenSubMenu(null)}
                >
                  <Link
                    href={item.to}
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.to
                        ? "text-[#706FE4] underline underline-offset-8 decoration-2"
                        : isLight
                        ? "text-gray-700 hover:text-[#706FE4]"
                        : "text-white hover:text-purple-200"
                    }`}
                  >
                    {item.title}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subMenu && (
                    <AnimatePresence>
                      {openSubMenu === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                        >
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.to}
                              className={`block px-4 py-2 text-sm ${
                                pathname === subItem.to
                                  ? "bg-[#F7F4F1] text-[#706FE4]"
                                  : "text-gray-700 hover:bg-[#F7F4F1]"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* <Link
                href="/contact"
                className={`text-sm font-medium ${
                  isLight ? "text-gray-700 hover:text-[#706FE4]" : "text-white hover:text-purple-200"
                }`}
              >
                Contact
              </Link> */}

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {/* Bookmark */}
                  <button
                    onClick={() => router.push("/bookmark")}
                    className={`relative p-2 rounded-lg transition-colors ${
                      isLight ? "hover:bg-gray-100" : "hover:bg-white/10"
                    }`}
                    title="Bookmark"
                  >
                    <Icon.Bookmark className={`text-xl ${isLight ? "text-gray-700" : "text-white"}`} />
                  </button>

                  {/* Cart */}
                  <button
                    onClick={() => router.push("/basket")}
                    className={`relative p-2 rounded-lg transition-colors ${
                      isLight ? "hover:bg-gray-100" : "hover:bg-white/10"
                    }`}
                    title="Basket"
                  >
                    <Icon.ShoppingCart className={`text-xl ${isLight ? "text-gray-700" : "text-white"}`} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#706FE4] rounded-full"></span>
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        isLight ? "hover:bg-gray-100" : "hover:bg-white/10"
                      }`}
                    >
                      <div className="w-8 h-8 bg-[#706FE4] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </div>
                      <Icon.CaretDown className={`text-sm ${isLight ? "text-gray-700" : "text-white"}`} />
                    </button>

                    {/* User Dropdown */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        >
                          <div className="px-4 py-2 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                          </div>
                          <Link
                            href="/my-account"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F4F1]"
                          >
                            <Icon.User className="text-lg" />
                            My Account
                          </Link>
                          <Link
                            href="/preference"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F4F1]"
                          >
                            <Icon.Gear className="text-lg" />
                            Preferences
                          </Link>
                          {/* <Link
                            href="/basket"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F4F1]"
                          >
                            <Icon.ShoppingCart className="text-lg" />
                            My Basket
                          </Link>
                          <Link
                            href="/bookmark"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F4F1]"
                          >
                            <Icon.Bookmark className="text-lg" />
                            Bookmarks
                          </Link> */}
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                              router.push("/");
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-[#F7F4F1]"
                          >
                            <Icon.SignOut className="text-lg" />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/signin"
                    className="px-5 py-2.5 bg-[#706FE4] text-white text-sm font-bold rounded-lg hover:bg-[#5a5bd4] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 py-2.5 border border-[#706FE4] text-[#706FE4] text-sm font-bold rounded-lg hover:bg-[#F7F4F1] transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setShowMobileNav(true)}
              aria-label="Open menu"
            >
              <Icon.List className={`text-2xl ${isLight ? "text-gray-700" : "text-white"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {showMobileNav && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowMobileNav(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Image
                    src="/images/Halo-Direct.png"
                    alt="Clinigen"
                    width={120}
                    height={32}
                  />
                  <button
                    onClick={() => setShowMobileNav(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Close menu"
                  >
                    <Icon.X className="text-xl text-gray-700" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      <Link
                        href={item.to}
                        onClick={() => !item.subMenu && setShowMobileNav(false)}
                        className={`block py-3 px-4 rounded-lg text-base font-medium ${
                          pathname === item.to
                            ? "bg-[#F7F4F1] text-[#706FE4]"
                            : "text-gray-700 hover:bg-[#F7F4F1]"
                        }`}
                      >
                        {item.title}
                      </Link>

                      {item.subMenu && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.to}
                              onClick={() => setShowMobileNav(false)}
                              className={`block py-2 px-4 rounded-lg text-sm ${
                                pathname === subItem.to
                                  ? "bg-[#F7F4F1] text-[#706FE4]"
                                  : "text-gray-600 hover:bg-[#F7F4F1]"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Authenticated User Actions */}
                {isAuthenticated && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-3">Quick Actions</p>
                    <div className="space-y-2">
                      <Link
                        href="/basket"
                        onClick={() => setShowMobileNav(false)}
                        className="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-[#F7F4F1] rounded-lg"
                      >
                        <Icon.ShoppingCart className="text-lg" />
                        My Basket
                      </Link>
                      <Link
                        href="/bookmark"
                        onClick={() => setShowMobileNav(false)}
                        className="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-[#F7F4F1] rounded-lg"
                      >
                        <Icon.Bookmark className="text-lg" />
                        Bookmarks
                      </Link>
                      <Link
                        href="/my-account"
                        onClick={() => setShowMobileNav(false)}
                        className="flex items-center gap-3 py-2 px-4 text-gray-700 hover:bg-[#F7F4F1] rounded-lg"
                      >
                        <Icon.User className="text-lg" />
                        My Account
                      </Link>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileNav(false);
                      }}
                      className="block w-full py-3 px-4 bg-red-600 text-white text-center font-bold rounded-lg hover:bg-red-700"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        onClick={() => setShowMobileNav(false)}
                        className="block w-full py-3 px-4 bg-[#706FE4] text-white text-center font-bold rounded-lg hover:bg-[#5a5bd4]"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setShowMobileNav(false)}
                        className="block w-full py-3 px-4 border border-[#706FE4] text-[#706FE4] text-center font-bold rounded-lg hover:bg-[#F7F4F1]"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
