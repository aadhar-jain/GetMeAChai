import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Get me a CHAI",
  description: "A website for generating funds from followers and fans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />
        <div>
          {children}
        </div>
        <Footer />

      </body>
    </html>
  );
}
