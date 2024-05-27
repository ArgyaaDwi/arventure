"use client";
import { useState, useEffect } from "react";
import {
  IconBookmark,
  IconColumnRemove,
  IconHeart,
  IconRowRemove,
  IconShare,
  IconStarOff,
  IconTrashFilled,
  IconCheck,
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
import { notifications } from "@mantine/notifications";
import classes from "../css/BadgeCard.module.css";
import {
  deleteWishlist,
  addToWishlist,
} from "@/utils/supabase/clientsite/crud";
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
import {
  fetchWishlistByUser,
  fetchViewWishlist,
} from "@/utils/supabase/clientsite/crud";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Wishlist({ wishlist }: any) {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const [setWishlist] = useState<any>([]);
  const [authUser, setAuthUser] = useState(null);

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
      await deleteWishlist(wishlistId);
      notifications.show({
        title: "Berhasil!",
        message: "Gunung berhasil dihapus dari wishlist!",
        icon: checkIcon,
        color: "green",
      });
      window.location.href = "/user/wishlist";
      // Refresh data setelah menghapus provinsi
      const updatedProvinces = wishlist.filter(
        (wishlist: any) => wishlist.id !== wishlistId
      );
    } catch (err: any) {}
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        {/* <a {...linkProps}>
          <Image src="https://i.imgur.com/Cij5vdL.png" height={180} />
        </a> */}
      </Card.Section>

      {/* <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
          outstanding
        </Badge> */}

      <Text className={classes.title} fw={500} component="a">
        {wishlist.id}{" "}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {wishlist.idMountain}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center></Center>

        <Group gap={8} mr={0}>
          <AlertDialog>
            <AlertDialogTrigger>
              <IconStarOff style={{ width: rem(16), height: rem(16) }} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Mau menghapus gunung ini dari wishlist?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteWishlist(wishlist.id)}
                >
                  Iya
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Group>
      </Group>
    </Card>
  );
}
