import {
  Home,
  LandPlotIcon,
  LayoutGrid,
  MessageCircleMore,
  MountainIcon,
  Square,
  TreePalm,
  Triangle,
  UsersRound,
} from "lucide-react";
import { SideNavItem, SideNavItemGroup } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboard",
    menuList: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <LayoutGrid size={20}></LayoutGrid>,
        
      },
    ],
  },
  {
    title: "Manage",
    menuList: [
      {
        title: "Provinces",
        path: "/admin/city",
        icon: <LandPlotIcon size={20}></LandPlotIcon>,
      },
      // {
      //   title: "Category",
      //   path: "/admin/category",
      //   icon: <Triangle size={20}></Triangle>,
      // },
      {
        title: "Mountains",
        path: "/admin/mountain",
        icon: <MountainIcon size={20}></MountainIcon>,
      },
      {
        title: "Users",
        path: "/admin/user",
        icon: <UsersRound size={20}></UsersRound>,
      },
      {
        title: "Reviews",
        path: "/admin/review",
        icon: <MessageCircleMore size={20}></MessageCircleMore>,
      },
    ],
  },
];
