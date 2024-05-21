"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";
import { Button } from "./ui/button";

interface Props {}
import {
  Square,
  Triangle,
  LayoutDashboard,
  UserRound,
  MessageCircle,
  TreePalm,
  ChevronRight,
} from "lucide-react";
const Sidebar: React.FC<Props> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  function toogleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button onClick={toogleSidebar} variant="secondary" className="rounded-full p-2">
          <ChevronRight />
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            label: "",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Province",
            label: "",
            icon: Square,
            variant: "ghost",
          },
          {
            title: "City",
            label: "",
            icon: Triangle,
            variant: "ghost",
          },
          {
            title: "Holiday",
            label: "",
            icon: TreePalm,
            variant: "ghost",
          },
          {
            title: "User",
            label: "",
            icon: UserRound,
            variant: "ghost",
          },
          {
            title: "Review",
            label: "",
            icon: MessageCircle,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};
export default Sidebar;
// import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// // import { MantineLogo } from '@mantinex/mantine-logo';

// export default function BasicAppShell() {
//   const [opened, { toggle }] = useDisclosure();

//   return (
//     <AppShell
//       header={{ height: 60 }}
//       navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
//       padding="md"
//     >
//       <AppShell.Header>
//         <Group h="100%" px="md">
//           <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
//           {/* <MantineLogo size={30} /> */}
//         </Group>
//       </AppShell.Header>
//       <AppShell.Navbar p="md">
//         Navbar
//         {Array(15)
//           .fill(0)
//           .map((_, index) => (
//             <Skeleton key={index} h={28} mt="sm" animate={false} />
//           ))}
//       </AppShell.Navbar>
//       <AppShell.Main>Main</AppShell.Main>
//     </AppShell>
//   );
// }
