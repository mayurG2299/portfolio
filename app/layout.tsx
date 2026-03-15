import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mayur Subhash Ghadi",
  description: "Senior Software Engineer specializing in backend systems, Node.js, NestJS, and AWS. Based in Mumbai.",
};

const themeScript = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('portfolio_theme');
      if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${syne.variable} ${ibmPlexMono.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
