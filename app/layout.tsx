'use client'

import "./css/style.css";
import { Inter } from "next/font/google";
import { BrowserRouter } from 'react-router-dom';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrowserRouter>
    <html lang="en" className="scroll-smooth">
      <head>
        <title>DeepMind Ai</title>
      </head>
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html></BrowserRouter>
  );
}
