'use client'
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProtectedLayout({children}: {children: React.ReactNode}) {
    const {isAuthenticated, isLoading} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/signin');
        }
    }, [isAuthenticated, isLoading, router]);

    // Show loading state while checking authentication
    if (!isAuthenticated && isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}