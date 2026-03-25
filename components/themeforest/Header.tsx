"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as Icon from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { useProductStore } from "@/store/product.store";

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
      // { title: "All Products", to: "/products" },
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
  const [showSearch, setShowSearch] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart, fetchCart, wishlist, fetchWishlist } = useProductStore();
  const [cartCount, setCartCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);

  const isLight = theme === "light";

  // Fetch cart only on authentication change (login/logout)
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishlist();
    } else {
      // Clear cart and bookmarks when logged out
      setCartCount(0);
      setBookmarkCount(0);
    }
  }, [isAuthenticated]);

  // Update cart count whenever cart object changes
  useEffect(() => {
    const newCount = cart?.count || 0;
    setCartCount(newCount);
  }, [cart?.count, cart?.items]);

  // Update bookmark count whenever wishlist object changes
  useEffect(() => {
    const newCount = wishlist?.count || 0;
    setBookmarkCount(newCount);
  }, [wishlist?.count, wishlist?.items]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    if (scrollRef.current >= headerHeight) {
      setIsHeaderFixed(true);
    } else {
      setIsHeaderFixed(false);
    }
  }, [scrollRef.current]);

  const handleScroll = () => {
    scrollRef.current = window.scrollY;
    // Force re-render for the scroll effect
    setIsHeaderFixed((prev) => {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      return scrollRef.current >= headerHeight;
    });
  };

  return (
    <>
      <div ref={headerRef} className={`header ${isHeaderFixed ? "fixed" : ""}`}>
        <header className="menu -style-1 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="menu__wrapper flex items-center justify-between h-[74px]">
              {/* Logo */}
              <h1 className="shrink-0">
                <Link href="/" className="menu__wrapper__logo block">
                  <Image
                    src={
                      isLight
                        ? "/images/Halo-Direct.png"
                        : "/images/Halo-Direct-Light.png"
                    }
                    alt="Halo Direct"
                    width={148}
                    height={40}
                    priority
                    className="h-10 w-auto"
                  />
                </Link>
              </h1>

              {/* Desktop Navigation */}
              <nav className="hidden lg:block">
                <ul className="navigator list-none p-0 m-0 text-0">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.to || (item.to !== "/" && pathname.includes(item.to));
                    
                    if (item.subMenu) {
                      return (
                        <li
                          key={item.title}
                          className={`inline-block mx-3 relative group ${isActive ? "active" : ""}`}
                          onMouseEnter={() => setOpenSubMenu(item.title)}
                          onMouseLeave={() => setOpenSubMenu(null)}
                        >
                          <Link
                            href={item.to}
                            className={`text-[14px] font-bold text-black hover:text-black relative block transition-all duration-300 ${
                              isActive ? "text-[#706FE4]" : ""
                            }`}
                          >
                            <span className="relative z-10">{item.title}</span>
                            <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#706FE4] transition-all duration-300 group-hover:w-full" />
                          </Link>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {openSubMenu === item.title && (
                              <motion.ul
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="dropdown-menu absolute top-[49px] left-[-40px] bg-white px-5 py-[18px] rounded-b-[16px] shadow-[-2px_2px_81px_-27px_rgba(0,0,0,0.3)] min-w-[200px] z-50"
                              >
                                {item.subMenu.map((subItem) => {
                                  const isSubActive = pathname === subItem.to;
                                  return (
                                    <li
                                      key={subItem.title}
                                      className={`list-none rounded-[8px] ${isSubActive ? "active" : ""}`}
                                    >
                                      <Link
                                        href={subItem.to}
                                        className={`relative inline-flex text-[16px] font-semibold text-black transition-all duration-300 px-5 py-[17px] ${
                                          isSubActive ? "text-black" : ""
                                        }`}
                                      >
                                        <span className="relative z-10">{subItem.title}</span>
                                        <span className="absolute bottom-[17px] left-[20px] h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-[calc(100%-40px)]" />
                                      </Link>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={item.title}
                        className={`inline-block mx-3 relative group ${isActive ? "active" : ""}`}
                      >
                        <Link
                          href={item.to}
                          className={`text-[14px] font-bold text-black hover:text-black relative block transition-all duration-300 ${
                            isActive ? "text-[#706FE4]" : ""
                          }`}
                        >
                          <span className="relative z-10">{item.title}</span>
                          <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-[#706FE4] transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Right Side Functions */}
              <div className="menu__wrapper__functions flex items-center gap-4">
                {/* Contact Link */}
                <div className="list__button flex items-center gap-4 pr-4 max-lg:hidden">
                  <Link
                    href="/contact"
                    className="button-main text-button-sm bg-[#706FE4] hover:bg-[#5a5bd4] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all"
                  >
                    Contact
                  </Link>
                </div>

                {/* Icons */}
                <div className="list__icons flex items-center">
                  {isAuthenticated && (
                    <button
                      className="menu-icon -bookmark flex-shrink-0 mr-6 relative hover:opacity-70 transition-opacity max-md:hidden"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/bookmarks");
                      }}
                      aria-label="Bookmarks"
                    >
                      <Icon.Bookmark className="text-2xl text-gray-700" />
                      {bookmarkCount > 0 && (
                        <span className="bookmark__quantity absolute top-[-4px] right-[-5px] h-4 w-4 bg-[#706FE4] text-white text-[10px] font-normal rounded-full flex items-center justify-center">
                          {bookmarkCount > 99 ? '99+' : bookmarkCount}
                        </span>
                      )}
                    </button>
                  )}

                  {/* Cart Icon - Only show when logged in */}
                  {isAuthenticated && (
                    <button
                      className="menu-icon -cart flex-shrink-0 mr-6 relative hover:opacity-70 transition-opacity max-md:hidden"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/basket");
                      }}
                      aria-label="Cart"
                    >
                      <Icon.Handbag className="text-2xl text-gray-700" />
                      {cartCount > 0 && (
                        <span className="cart__quantity absolute top-[-4px] right-[-5px] h-4 w-4 bg-[#706FE4] text-white text-[10px] font-normal rounded-full flex items-center justify-center">
                          {cartCount > 99 ? '99+' : cartCount}
                        </span>
                      )}
                    </button>
                  )}

                  {/* User Menu / Auth Buttons */}
                  {isAuthenticated ? (
                    <div className="relative max-md:hidden">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-[#706FE4] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user?.first_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                        </div>
                        <Icon.CaretDown className="text-sm text-gray-700" />
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
                              <p className="text-sm font-medium text-gray-900">{user?.first_name || "User"}</p>
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
                            {/* <Link
                              href="/preference"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[#F7F4F1]"
                            >
                              <Icon.Gear className="text-lg" />
                              Preferences
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
                  ) : (
                    <div className="flex items-center gap-3 max-lg:hidden">
                      <Link
                        href="/signin"
                        className="px-5 py-2.5 bg-[#706FE4] text-white text-sm font-bold rounded-full hover:bg-[#5a5bd4] transition-all"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="px-5 py-2.5 border border-[#706FE4] text-[#706FE4] text-sm font-bold rounded-full hover:bg-[#F7F4F1] transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}

                  {/* Mobile Menu Button */}
                  <button
                    className="menu-icon -navbar lg:hidden ml-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowMobileNav(true);
                    }}
                    aria-label="Open menu"
                  >
                    <Icon.List className="text-3xl text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Box Overlay */}
          <AnimatePresence>
            {showSearch && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-[51]"
                  onClick={() => setShowSearch(false)}
                />

                {/* Search Box */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full right-0 w-[500px] max-lg:w-[90%] max-lg:mx-auto max-lg:left-1/2 max-lg:-translate-x-1/2 z-[52] mt-2"
                >
                  <div className="search-box relative">
                    <form className="relative z-10">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-3 pr-12 border-0 shadow-[1px_1px_9px_#00000024] rounded-lg focus:ring-2 focus:ring-[#706FE4] outline-none"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowSearch(false)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 border-0 bg-transparent cursor-pointer"
                      >
                        <Icon.X className="text-xl text-gray-500" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {showMobileNav && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[51]"
              onClick={() => setShowMobileNav(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[360px] max-w-[90vw] bg-white z-[52] shadow-xl overflow-y-auto px-10 py-10"
            >
              {/* Search Box - Only show when logged in */}
              {isAuthenticated && (
                <div className="search-box mb-[30px]">
                  <form className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-3 pr-12 border-0 shadow-[1px_1px_9px_#00000024] rounded-lg focus:ring-2 focus:ring-[#706FE4] outline-none"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent"
                    >
                      <Icon.MagnifyingGlass className="text-xl text-gray-500" />
                    </button>
                  </form>
                </div>
              )}

              {/* Mobile Navigation */}
              <nav className="navigator-mobile mb-[80px]">
                <ul className="list-none">
                  {navItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.to}
                        onClick={() => !item.subMenu && setShowMobileNav(false)}
                        className="text-[16px] font-semibold text-gray-900 block py-[9px]"
                      >
                        {item.title}
                      </Link>
                      {item.subMenu && (
                        <ul className="dropdown-menu pl-[15px] pb-[15px]">
                          {item.subMenu.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.to}
                                onClick={() => setShowMobileNav(false)}
                                className="text-[14px] font-medium text-gray-600 block py-[11px] hover:text-[#706FE4] transition-colors"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="navigation-sidebar__footer mt-auto">
                {isAuthenticated ? (
                  <>
                    <div className="mb-[50px]">
                      <p className="text-[16px] font-medium text-gray-900 mb-3">Quick Actions</p>
                      <div className="space-y-2">
                        <Link
                          href="/bookmarks"
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#706FE4] transition-colors"
                        >
                          <Icon.Bookmark className="text-lg" />
                          My Bookmarks {bookmarkCount > 0 && <span className="bg-[#706FE4] text-white text-xs px-2 py-0.5 rounded-full">{bookmarkCount}</span>}
                        </Link>
                        <Link
                          href="/basket"
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#706FE4] transition-colors"
                        >
                          <Icon.Handbag className="text-lg" />
                          My Basket {cartCount > 0 && <span className="bg-[#706FE4] text-white text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
                        </Link>
                        <Link
                          href="/my-account"
                          onClick={() => setShowMobileNav(false)}
                          className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#706FE4] transition-colors"
                        >
                          <Icon.User className="text-lg" />
                          My Account
                        </Link>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileNav(false);
                      }}
                      className="w-full py-3 px-4 bg-red-600 text-white text-center font-bold rounded-full hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setShowMobileNav(false)}
                      className="block w-full py-3 px-4 bg-[#706FE4] text-white text-center font-bold rounded-full hover:bg-[#5a5bd4] transition-colors mb-3"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setShowMobileNav(false)}
                      className="block w-full py-3 px-4 border border-[#706FE4] text-[#706FE4] text-center font-bold rounded-full hover:bg-[#F7F4F1] transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
