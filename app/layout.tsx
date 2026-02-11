import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader'
import { BlogNavbar } from "@/components/Navbar";
import { BlogFooter } from "@/components/Footer";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap', // Ensure swap is used
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Sagar Sangwan’s Blog — Web, AI & Engineering Notes",
    template: "%s | Sagar Sangwan’s Blog",
  },

  description:
    "A technical blog by Sagar Sangwan sharing practical insights on web development, AI systems, software engineering, and real-world projects. Focused on clarity, depth, and production experience.",

  metadataBase: new URL("https://blogs.sagarsangwan.dev"),

  alternates: {
    canonical: "https://blogs.sagarsangwan.dev",
  },

  openGraph: {
    title: "Sagar Sangwan’s Blog — Web, AI & Engineering Notes",
    description:
      "Practical writing on web development, AI, and engineering systems by Sagar Sangwan. Lessons learned from building real software.",
    url: "https://blogs.sagarsangwan.dev",
    siteName: "Sagar Sangwan’s Blog",
    type: "website",
    // images: [
    //   {
    //     url: "/images/blog-og.png", 
    //     width: 1200,
    //     height: 630,
    //     alt: "Sagar Sangwan Blog",
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sagar Sangwan’s Blog — Web, AI & Engineering Notes",
    description:
      "Writing about web development, AI systems, and real engineering work by Sagar Sangwan.",
    // images: ["/images/blog-og.png"],
    creator: "@sagarsangwan", 
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <NextTopLoader showSpinner={false}/>
        <BlogNavbar/>
       <main className="min-h-screen">
          {children}
        </main>
        <BlogFooter/>
        <Toaster richColors />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N8XH647YNL"
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N8XH647YNL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
