import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import '../globals.css'
import { SiteHeader } from "./admin/_components/sidebar/site-header";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin - Wonder Palembang",
  description: "Admin panel",
};

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
          <SidebarInset />
          <SiteHeader />
          {children}
        </SidebarProvider>
      </body>
      {/* </DashboardLayout> */}
    </html>
  );
}
