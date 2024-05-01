import "./globals.css";

export const metadata = {
  title: "Get me a CHAI",
  description: "A website for generating funds from followers and fans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
