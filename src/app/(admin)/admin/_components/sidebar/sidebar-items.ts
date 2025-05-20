import {
  // Home,
  // ChartPie,
  // Grid2X2,
  // ChartLine,
  // ShoppingBag,
  // BookA,
  // Forklift,
  Mail,
  MessageSquare,
  // Calendar,
  // Kanban,
  // ReceiptText,
  // Users,
  // Lock,
  // Fingerprint,
  // SquareArrowUpRight,
  type LucideIcon,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  // {
  //   id: 1,
  //   label: "Dashboards",
  //   items: [
  //     {
  //       title: "Dashboards",
  //       url: "/dashboard",
  //       icon: Home,
  //       subItems: [
  //         { title: "Default", url: `/dashboard/default`, icon: ChartPie },
  //         { title: "CRM", url: `/dashboard`, icon: Grid2X2, comingSoon: true },
  //         {
  //           title: "Analytics",
  //           url: `/dashboard/analytics`,
  //           icon: ChartLine,
  //           comingSoon: true,
  //         },
  //         {
  //           title: "eCommerce",
  //           url: `/dashboard/e-commerce`,
  //           icon: ShoppingBag,
  //           comingSoon: true,
  //         },
  //         {
  //           title: "Academy",
  //           url: `/dashboard/academy`,
  //           icon: BookA,
  //           comingSoon: true,
  //         },
  //         {
  //           title: "Logistics",
  //           url: `/dashboard/logistics`,
  //           icon: Forklift,
  //           comingSoon: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    id: 2,
    label: "Pages",
    items: [
      {
        title: "Blog",
        url: "/mail",
        icon: Mail,
        comingSoon: true,
      },
      {
        title: "Event",
        url: "/admin/events",
        icon: MessageSquare,
        // comingSoon: true,
      },
      {
        title: "Gallery",
        url: "/admin/gallery",
        icon: MessageSquare,
        // comingSoon: true,
      },
    ],
  },
  // {
  //   id: 3,
  //   label: "Misc",
  //   items: [
  //     {
  //       title: "Others",
  //       url: "/others",
  //       icon: SquareArrowUpRight,
  //       comingSoon: true,
  //     },
  //   ],
  // },
];
