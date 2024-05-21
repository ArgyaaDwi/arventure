import { SIDENAV_ITEMS } from "@/SIDEBAR_CONSTANTS";
import Image from "next/image";
import { SideBarMenuItem } from "./sidebarMenuItem";
import SideBarMenuGroup from "./sidebarMenuGroup";
import { SideNavItemGroup } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import React from "react";
export default function Sidebar() {
  const { toggleCollapse } = useSidebarToggle();

  const asideStyle = classNames(
    // "fixed bg-sidebar text-gray-500 z-50 h-full shadow-gray-900/20 transition duration-300 ease-in-out w-[20rem]",
    "sidebar overflow-y-auto ouverflow-x-auto fixed bg-sidebar h-full shadow-sm shadow-slate-500/40 transition duration-300 ease-in-out z-[99999]",
    {
      // "w-0": toggleCollapse,
      ["sm:w-[5.4rem] sm:left-0 left-[-100%]"]: toggleCollapse,
      ["w-[20rem]"]: !toggleCollapse,
    }
  );
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();

      window.location.replace("/login");
      // router.push("/login");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return (
    <aside className={asideStyle}>
      <div className="flex relative items-center py-3 px-3.5">
      {/* <div className="sidebar-top relative flex items-center py-3 px-3.5"> */}
        {/* <Image
          alt=""
          src="/assets/images/logob1.png"
          className="w-12 mx-3.5 min-h-fit"
          width={20}
          height={20}
        ></Image> */}
        {!toggleCollapse && (
          <h3 className="font-bold text-2xl text-sidebar-foreground min-w-max">
            ARventure
          </h3>
        )}
      </div>
      <nav className="flex flex-col gap-2 transition duration-300 ease-in-out">
        <div className="flex flex-col gap-2 px-4">
          {SIDENAV_ITEMS.map((item, index) => {
            return (
              <SideBarMenuGroup menuGroup={item} key={index}></SideBarMenuGroup>
            );
          })}
        </div>
        {/* <button onClick={handleLogout} >Logout</button> */}
      </nav>
    </aside>
  );
}
