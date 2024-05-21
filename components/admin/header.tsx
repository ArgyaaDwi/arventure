"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
import { Menu } from "lucide-react";
import classNames from "classnames";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { UserNav } from "./userNav";
import {BsList} from "react-icons/bs"
import { ThemeSwitcher } from "../ui/themeSwitcher";
export default function Header() {
  const { toggleCollapse, invokeToggleCollapse } = useSidebarToggle();
  const sidebarToggle = () => {
    invokeToggleCollapse();
  };
  const [userName, setUserName] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await getCurrentUser();

        const user = await getUsers(authUser!.id);
        console.log("auth user", authUser);
        console.log("user", user);

        setUserName(authUser!.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Error");
      }
    };
    fetchUser();
  }, []);

  const headerStyle = classNames(
    "bg-sidebar fixed w-full z-[99997] px-4 shadow-sm shadow-slate-500/40",
    {
      ["sm:pl-[20rem]"]: !toggleCollapse,
      ["sm:pl-[5.6rem]"]: toggleCollapse,
    }
  );
  return (
    <header className={headerStyle}>
      <div className="flex items-center justify-between h-16">
        <button
          onClick={sidebarToggle}
          className="order-2 sm:order-1 bg-black text-white hover:bg-gray-700 hover:text-white ml-3 rounded-md h-[30px] w-[30px] shadow-md shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <BsList />
        </button>
        {/* <div className="order-1 sm:order-2 flex items-center justify-center">
        </div> */}
        <div className="flex items-center justify-between sm:order-2 order-1">
          {/* <div className="p-2"><ThemeSwitcher></ThemeSwitcher></div> */}
          <div className="h-10 w-10 rounded-full bg-sidebar-muted flex items-center justify-center text-center">
            <UserNav />
          </div>
        </div>
        {/* <div className="order-1 sm:order-2  flex items-center justify-center text-center">
        <span className="font-semibold text-sm text-white" >{userName}</span>

        </div> */}
      </div>
    </header>
  );
}
