import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { SideNavItemGroup } from "@/types/types";
import React from "react";
import { SideBarMenuItem } from "./sidebarMenuItem";
import classNames from "classnames";

const sidebarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const { toggleCollapse } = useSidebarToggle();
  const menuGroupStyle=classNames('py-4 tracking-[.1rem] font-medium uppercase text-sm text-sidebar-foreground',{
    
        'text-center': toggleCollapse
    }
  )
  return (
    <>
      {
        <h3 className={menuGroupStyle}>
          {!toggleCollapse ? menuGroup.title : "..."}
        </h3>
      }{" "}
      {menuGroup.menuList?.map((item, index) => (
          <SideBarMenuItem key={index} item={item}/>
      ))}
    </>
  );
};

export default sidebarMenuGroup;
