import { create } from "zustand";
interface SideBarToggle{
    toggleCollapse: boolean;
    invokeToggleCollapse: () => void;
}

export const useSidebarToggle=create<SideBarToggle>((set, get)=>({
    toggleCollapse: false,
    invokeToggleCollapse: () => set({toggleCollapse: !get().toggleCollapse}),

}))