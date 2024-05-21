import { GeistSans } from "geist/font/sans";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { HeaderMegaMenu } from "@/components/Navbar";
import { FooterLinks  } from "@/components/Footer";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

  
      <html lang="en" className='{GeistSans.className}'>
      <body className="bg-background text-foreground">
        {/* <main className="flex flex-col items-center min-h-screen"> */}
        <MantineProvider>
          {/* <HeaderMegaMenu/> */}
          
          {children}
          {/* <FooterLinks /> */}
        </MantineProvider>
        {/* </main> */}
      </body>
    </html>
  
  
  );
}
