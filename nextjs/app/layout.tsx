import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
