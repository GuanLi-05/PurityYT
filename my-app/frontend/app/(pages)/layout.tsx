import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provide";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SessionProviderWrapper from "@/app/sessionWrapper";
import "../globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PurityYT",
  description: "A Pure version of Youtube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderWrapper>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />

                {/* Make trigger sticky to top-left */}
                <div className="sticky top-[25px] z-50 self-start ml-1.5">

                  <SidebarTrigger />
                </div>

                <div className="flex-1">{children}</div>
                <Toaster />
              </div>
            </SidebarProvider>
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
