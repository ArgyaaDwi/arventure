"use client";
import { useState, useEffect } from "react";
import {
  IconBookmark,
  IconColumnRemove,
  IconHeart,
  IconShare,
  IconTrashFilled,
} from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from "@mantine/core";
import classes from "../css/BadgeCard.module.css";
import { deleteWishlit } from "@/utils/supabase/clientsite/crud";
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
import { fetchWishlistByUser, fetchViewWishlist } from "@/utils/supabase/clientsite/crud";

export function Wishlist({wishlist}:any) {
  const [ setWishlist] = useState<any>([]);

  const fetchData = async () => {
    try {
      const authUser = await getCurrentUser();
      if (authUser) {
        const wishlistData = await fetchWishlistByUser(authUser.id);
        console.log("Wishlist fetched:", wishlistData[0].id);
        setWishlist(wishlistData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteWishlist = async (wishlistId: string) => {
    try {
      await deleteWishlit(wishlistId);
      window.location.href = "/user/wishlist";
      // Refresh data setelah menghapus provinsi
      const updatedProvinces = wishlist.filter(
        (wishlist: any) => wishlist.id !== wishlistId
      );
    } catch (err: any) {}
  };
  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/Cij5vdL.png" height={180} />
        </a>
      </Card.Section>

      {/* <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
          outstanding
        </Badge> */}

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {wishlist.id}{" "}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {wishlist.idMountain}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center></Center>

        <Group gap={8} mr={0}>
          <ActionIcon
            className={classes.action}
            onClick={() => handleDeleteWishlist(wishlist.id)}
          >
            {" "}
            <IconTrashFilled style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
