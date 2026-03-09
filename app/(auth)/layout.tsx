import Footer from "@/components/themeforest/Footer"
import Header from "@/components/themeforest/Header"

export default function PublicLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Header theme="light" />
        <main>{children}</main>
        <Footer theme="light" />
        </>
    )
}