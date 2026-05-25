import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ade Mulyana | Software Engineer — Backend & Full-Stack",
  description:
    "Portfolio of Ade Mulyana — Software Engineer specializing in backend engineering, scalable systems, AI-powered applications, and modern web development. Experienced with Spring Boot, Next.js, PostgreSQL, and Generative AI.",
  keywords: [
    "Ade Mulyana",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Developer",
    "Spring Boot",
    "Next.js",
    "React",
    "PostgreSQL",
    "AI Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Ade Mulyana" }],
  openGraph: {
    title: "Ade Mulyana | Software Engineer",
    description:
      "Building scalable backend systems, AI-powered applications, and modern web experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ade Mulyana | Software Engineer",
    description:
      "Building scalable backend systems, AI-powered applications, and modern web experiences.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
