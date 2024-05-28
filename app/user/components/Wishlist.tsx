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
  IconCross,
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
  Grid,
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
  fetchWishlistByUsers,
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

export function Wishlist() {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const xIcon = <IconCross style={{ width: rem(20), height: rem(20) }} />;

  const [wishlist, setWishlist] = useState<any>([]);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  const fetchDatas = async () => {
    try {
      const authUser = await getCurrentUser();
      if (authUser) {
        const wishlistData = await fetchViewWishlist();
        console.log("Wishlist fetched:", wishlistData);
        setWishlist(wishlistData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Setelah selesai fetching, set loading menjadi false
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleDeleteWishlist = async (wishlistId: string) => {
    try {
      console.log("Deleting wishlist item with id:", wishlistId);

      await deleteWishlist(wishlistId);
      notifications.show({
        title: "Berhasil!",
        message: "Gunung berhasil dihapus dari wishlist!",
        icon: checkIcon,
        color: "green",
      });
      window.location.href = "/user/wishlist";

      const updatedWishlist = wishlist.filter(
        (item: any) => item.id !== wishlistId
      );
      // setWishlist(updatedWishlist);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Gagal menghapus gunung dari wishlist!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error deleting wishlist item:", err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <p style={{ textAlign: "center" }}>Loading...</p>
      </div>
    );
  }

  return (
    <Grid>
      {wishlist.map((item: any, index: number) => (
        <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Card withBorder radius="md" className={classes.card}>
            <Card.Section>
              <Image src={item.gambar} height={180} />
            </Card.Section>
            <Text className={classes.title} fw={500}>
              {item.mountain_name}
            </Text>
            <Text fz="sm" c="dimmed" lineClamp={4}>
              {item.description}
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
                      <AlertDialogTitle>Konfirmasi Hapus </AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah anda ingin menghapus {item.mountain_name} dari
                        wishlist?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteWishlist(item.id)}
                      >
                        Iya
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Group>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
