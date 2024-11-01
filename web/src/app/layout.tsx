import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../auth/firebase/auth-context";

const figtree = localFont({
  src: "./fonts/Figtree.woff",
  variable: "--font-figtree",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IntelliForge",
  description: "IntelliForge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
