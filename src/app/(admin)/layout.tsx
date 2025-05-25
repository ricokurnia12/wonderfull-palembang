"use client";
import { AppSidebar } from "./admin/_components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "../globals.css";
import "../prosemirror.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { SiteHeader } from "./admin/_components/sidebar/site-header";
import { Toaster } from "@/components/ui/sonner";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      {/* <DashboardLayout> */}
      <body className={`${lora.className} antialiased`}>
        {/* Buktikan ini dipakai */}
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {/* <SiteHeader /> */}
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto px-4 py-8 max-w-7xl">

                  {children}
                </div>

              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </QueryClientProvider>
      </body>
      {/* </DashboardLayout> */}
    </html>
  );
}
