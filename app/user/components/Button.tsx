'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Menu, Button, rem } from '@mantine/core';
import { IconUserCircle, IconLogout } from '@tabler/icons-react';
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";

export default function Demo() {
  const [userName, setUserName] = useState<any | null>(null);
  const [name, setName] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await getCurrentUser();
        if (authUser) {
          const user = await getUsers(authUser.id);
          console.log("auth user", authUser);
          console.log("user", user);  
          setUserName(authUser.email);
          setName(user.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Error");
        setName("Error");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button color="black">
          <IconUserCircle />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>{name}</Menu.Item> 
        <Menu.Item>{userName}</Menu.Item> 


        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={handleLogout}
        >
          Logout{" "}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

