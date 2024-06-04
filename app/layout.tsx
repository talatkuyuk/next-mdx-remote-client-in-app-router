import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";

import "@/styles/styles.css";
import "@/styles/hljs.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ipikuka Blog Application",
  description:
    "Demonstration of next-mdx-remote-client's features in Next.js app router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main-wrapper">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
