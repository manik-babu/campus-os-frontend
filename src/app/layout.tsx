import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./app.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryClientProviders from "@/providers/queryClientProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uttara University",
  description: "Uttara University is a prestigious private university located in Dhaka, Bangladesh. It offers a wide range of undergraduate and postgraduate programs in various fields of study, including business, engineering, computer science, humanities, and social sciences. The university is known for its commitment to academic excellence, research, and innovation. With state-of-the-art facilities and a vibrant campus life, Uttara University provides students with a conducive environment for learning and personal growth. The university also emphasizes community engagement and social responsibility, encouraging students to contribute positively to society.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProviders>
            {children}
          </QueryClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
