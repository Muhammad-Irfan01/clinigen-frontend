import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";


export default function ProtectedLayout({children}: {children: React.ReactNode}) {
    const {isAuthenticated} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router]);

    return <>{children}</>
}