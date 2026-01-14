'use client'
import { Bookmark, BookMarked, Cog, Cross, Hamburger, LogOut, Menu, RotateCcw, ShoppingBag, ShoppingBasket, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import { AppTooltip } from "../ui/Tooltip"
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import HaloHealthModal from "../ui/HaloHealthModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface NavItem {
    label: string,
    href: string,
    message?: string,
    requiresAuth?: boolean, // Flag to indicate if the route requires authentication
}

interface SearchForm {
    query: string;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Order", href: "/order", message: 'View all the order placed at your institute', requiresAuth: true },
    { label: "Products", href: "/products", message: 'View a complete catalogue of all our medicine' },
    { label: "Access Programs", href: "/access-program", message: 'View managed access program you are enrolled ', requiresAuth: true },
    { label: "Patients", href: "/patients", message: 'View all patients enrolled in managed access program', requiresAuth: true },
    { label: "Physicians", href: "/physicians", message: 'View all physician you are associated to at you institute' },
    { label: "Shortage", href: "/shortage", message: 'View drug shortage in your country' },
    { label: "Contact", href: "/support", message: 'Find frequent asked question and other support materials' },
    { label: "Report Adverse Event", href: "/report-event", message: 'Click here to report adverse event your patient may have experience', requiresAuth: true },
];
const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { register, handleSubmit } = useForm<SearchForm>()
    const [showMenuItems, setShowMenuItems] = useState<boolean>(false);
    const [haloHealthModalOpen, setHaloHealthModalOpen] = useState<boolean>(false)
    const { logout, isAuthenticated } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push('/'); // Redirect to home after logout
    };

    return (
        <header>
            <div className='flex items-center justify-between px-4 bg-[#270272] text-white py-8'>
                <div className="relative flex items-center gap-4">
                    <div className="block lg:hidden" onClick={() => setShowMenuItems(true)}>
                        <Menu />
                    </div>
                    <div>
                        <Image
                            src="/images/Halo-Direct-Light.png"
                            alt="logo"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>


                <div className="hidden lg:block">
                    <div className="flex items-center gap-8 ">
                    {isAuthenticated ? (
                        <>
                            <AppTooltip content="Switch Institute">
                                <div onClick={() => setHaloHealthModalOpen(true)} className="flex items-center gap-1 text-sm hover:underline hover:text-[#007aff] cursor-pointer">
                                    <RotateCcw strokeWidth={1.5} />
                                    <span>Halo Health Technologies</span>
                                </div>
                            </AppTooltip>

                            <AppTooltip content="Viewed your bookmarked products">
                                <div onClick={() => router.push('/bookmark')} className="flex items-center gap-1 text-sm hover:underline hover:text-[#007aff] cursor-pointer">
                                    <Bookmark strokeWidth={1.4} />
                                    <span>Bookmark</span>
                                </div>
                            </AppTooltip>

                            <div className="relative inline-block group">
                                {/* Trigger */}
                                <div className="flex items-center gap-1 text-sm cursor-pointer hover:underline hover:text-[#007aff]">
                                    <Cog strokeWidth={1.5} />
                                    <span>My Account</span>
                                </div>

                                <div

                                    className="absolute right-0 mt-2 w-40
                                        bg-white text-[#270272] shadow-md rounded-md
                                        opacity-0 invisible
                                        group-hover:opacity-100 group-hover:visible
                                        transition-all duration-200
                                        z-50">
                                    <div className="flex flex-col">
                                        <span onClick={() => router.push('/my-account')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            My Account
                                        </span>
                                        <span onClick={() => router.push('/preference')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            Preference
                                        </span>
                                        <span onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                            Logout
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => router.push('/basket')} className="flex items-center gap-1 text-sm hover:underline hover:text-[#007aff] cursor-pointer">
                                <ShoppingCart strokeWidth={1.5} />
                                <span>Basket</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/signin')}
                                className="px-4 py-2 bg-white text-[#270272] rounded-md font-bold hover:bg-gray-100 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => router.push('/signup')}
                                className="px-4 py-2 bg-[#706FE4] text-white rounded-md font-bold hover:bg-[#5a5bd4] transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <div className="bg-[#706FE4] px-4 py-6 text-white flex items-center justify-center space-x-16">
                {navItems.map((item) => {
                    // Skip protected routes if user is not authenticated
                    if (item.requiresAuth && !isAuthenticated) {
                        return null;
                    }

                    return (
                        <AppTooltip key={item.href} content={item.message}>
                            <Link href={item.href} className={clsx('hover:text-black hover:underline decoration-2 underline-offset-8',
                                {
                                    'text-black underline': pathname === item.href
                                })}>
                                {item.label}
                            </Link>
                        </AppTooltip>
                    );
                })}
            </div>
            </div>


            {showMenuItems && (
                <header className="bg-[#20025B] absolute top-0 w-full h-screen block lg:hidden space-y-40">
                    <div className="">
                        <div className="text-white bg-[#270272] py-6 px-4" onClick={() => setShowMenuItems(false)}>
                            <X />
                        </div>

                        <div className="">
                            <Input
                                type="text"
                                placeholder="Search by generic or brand name"
                                registration={register("query")}
                                className="text-gray-200 px-4 py-2 bg-[#20025B]"
                            />
                        </div>

                        <div className=" px-6 py-6 text-gray-300 flex flex-col items-start justify-start gap-10 z-50">
                            {navItems.map((item) => {
                                // Skip protected routes if user is not authenticated
                                if (item.requiresAuth && !isAuthenticated) {
                                    return null;
                                }

                                return (
                                    <AppTooltip key={item.href} content={item.message} side="right">
                                        <Link href={item.href} className={clsx('hover:text-[#7239FF] hover:underline decoration-2 underline-offset-8',
                                            {
                                                'text-white underline': pathname === item.href
                                            })}>
                                            {item.label}
                                        </Link>
                                    </AppTooltip>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-white flex items-center justify-evenly py-6 text-[#20025B]">
                        {isAuthenticated ? (
                            <>
                                <div onClick={() => router.push('/basket')} className="flex flex-col items-center cursor-pointer">
                                    <ShoppingCart strokeWidth={1.5} />
                                    <span className="text-xs mt-1">Basket</span>
                                </div>
                                <div onClick={() => router.push('/bookmark')} className="flex flex-col items-center cursor-pointer">
                                    <Bookmark strokeWidth={1.4} />
                                    <span className="text-xs mt-1">Bookmark</span>
                                </div>
                                <div onClick={() => router.push('/my-account')} className="flex flex-col items-center cursor-pointer">
                                    <Cog strokeWidth={1.5} />
                                    <span className="text-xs mt-1">Account</span>
                                </div>
                                <div onClick={handleLogout} className="flex flex-col items-center cursor-pointer text-red-500">
                                    <LogOut strokeWidth={1.5} />
                                    <span className="text-xs mt-1">Logout</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div onClick={() => router.push('/signin')} className="flex flex-col items-center cursor-pointer">
                                    <X strokeWidth={1.5} />
                                    <span className="text-xs mt-1">Sign In</span>
                                </div>
                                <div onClick={() => router.push('/signup')} className="flex flex-col items-center cursor-pointer">
                                    <X strokeWidth={1.5} />
                                    <span className="text-xs mt-1">Sign Up</span>
                                </div>
                            </>
                        )}
                    </div>

                </header>
            )}
            <div>
                <HaloHealthModal isOpen={haloHealthModalOpen} onClose={() => setHaloHealthModalOpen(false)} />
            </div>
        </header>
    )
}

export default Header
