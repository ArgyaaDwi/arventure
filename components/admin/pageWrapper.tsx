// pages/admin.tsx
import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import classNames from "classnames";
import React from "react";

export default function Admin({ children}: { children: React.ReactNode }) {
  const { toggleCollapse, invokeToggleCollapse } = useSidebarToggle();

  const pageStyle=classNames('bg-background flex flex-col mt-16 py-4 p-4 h-full overflow-y-auto',{
    ["sm:pl-[21rem]"]: !toggleCollapse,
    ["pl-16px sm:pl-[6.2rem]"]: toggleCollapse
  })
  return (
    <div className={pageStyle}>
     {children}
    </div>
  );
}
