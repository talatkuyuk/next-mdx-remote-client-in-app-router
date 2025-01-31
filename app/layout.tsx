import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { TransitionProvider } from "@/contexts/TransitionProvider";
import Header from "@/components/Header";
import MotionFade from "@/components/MotionFade";

import "@/styles/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ipikuka Blog",
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
        <TransitionProvider>
          <div className="main-wrapper">
            <ThemeProvider enableSystem={false}>
              <Header />
              <MotionFade>{children}</MotionFade>
            </ThemeProvider>
          </div>
        </TransitionProvider>
      </body>
    </html>
  );
}
