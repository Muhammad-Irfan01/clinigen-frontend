import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
// import "../globsls.css"

export default function PublicLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Header />
        <main>{children}</main>
        <Footer />
        </>
    )
}