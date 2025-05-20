"use client";
import { AppSidebar } from "./admin/_components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "../globals.css";
import "../prosemirror.css";
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
  return (
    <html lang="en">
      {/* <DashboardLayout> */}
      <body className={`${lora.className} antialiased`}>
        {/* Buktikan ini dipakai */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* <SiteHeader /> */}
            <div className="w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
              {" "}
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
      {/* </DashboardLayout> */}
    </html>
  );
}
