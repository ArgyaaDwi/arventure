"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export function UserNav() {
  const [userEmail, setUserEmail] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await getCurrentUser();
        if (authUser) {
          setUserEmail(authUser.email);

          const user = await getUsers(authUser.id);
          console.log("auth user", authUser);
          console.log("user", user);

          setUserName(user?.name || null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserEmail("Error");
        setUserName("Error");
      }
    };
    fetchUser();
  }, []);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/assets/images/userr.jpg" alt="" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[99998]">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
       
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='#' onClick={handleLogout}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
