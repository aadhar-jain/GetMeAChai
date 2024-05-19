import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "Get me a CHAI",
  description: "A patreon website for generating funds from followers and fans",
};


export default function RootLayout({ children }) {
  return (
    <>

      <html lang="en">
        <body>
          <SessionWrapper>

            <Navbar />
            <div style={{}} className="childrenDiv">
              {children}
            </div>
            <Footer />

          </SessionWrapper>
        </body>
      </html>
    </>
  );
}
