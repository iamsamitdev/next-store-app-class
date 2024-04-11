import Header from "@/app/components/front/header/Header"
import Footer from "@/app/components/front/footer/Footer"

export default function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
