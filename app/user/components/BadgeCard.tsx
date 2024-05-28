"use client";
import { IconHeart, IconMessage, IconStar } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  rem,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { EyeIcon } from "lucide-react";
import classes from "../css/BadgeCard.module.css";
import {
  addToWishlist,
  fetchWishlistByUser,
} from "@/utils/supabase/clientsite/crud";
import { getCurrentUser } from "@/utils/supabase/auth";
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
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export function ArticleCard({ mountain }: { mountain: any }) {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const linkProps = {};
  const [setWishlist] = useState<any>([]);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      const user = await getCurrentUser();
      setAuthUser(user);
    };

    fetchAuthUser();
  }, []);

  const handleAddToWishlist = async (mountainId: any) => {
    try {
      await addToWishlist(mountainId);
      notifications.show({
        title: "Berhasil!",
        message: "Gunung  berhasil ditambahkan ke wishlist!",
        icon: checkIcon,
        color: "green",
      });
    } catch (err) {
      notifications.show({
        title: "Gagal",
        message: "Gagal menambahkan gunung karena sudah ada di wishlist!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error adding to wishlist:", err);
    }
  };
  // const handleAddToWishlist = async (mountainId: any) => {
  //   try {
  //     // Fetch wishlist items for the current user
  //     const wishlistData = await fetchWishlistByUser(authUser);

  //     // Check if the mountain is already in the wishlist
  //     const isAlreadyInWishlist = wishlistData.some(
  //       (item: any) => item.idMountain === mountainId
  //     );

  //     if (isAlreadyInWishlist) {
  //       notifications.show({
  //         title: "Gunung Sudah Ada",
  //         message: "Gunung ini sudah ada di wishlist Anda.",
  //         icon: xIcon,
  //         color: "yellow",
  //       });
  //     } else {
  //       // Add to wishlist
  //       await addToWishlist(mountainId);
  //       notifications.show({
  //         title: "Berhasil!",
  //         message: "Gunung berhasil ditambahkan ke wishlist!",
  //         icon: checkIcon,
  //         color: "green",
  //       });
  //     }
  //   } catch (err) {
  //     notifications.show({
  //       title: "Error",
  //       message: "Gagal menambahkan gunung ke wishlist!",
  //       icon: xIcon,
  //       color: "red",
  //     });
  //     console.error("Error adding to wishlist:", err);
  //   }
  // };
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          {/* <div className="m-5"> */}

          <Image
            src={mountain.image || "/public/assets/images/default.jpg"}
            alt={mountain.name}
            height={20}
            width={50}
          />
          {/* </div> */}
        </a>
      </Card.Section>

      {mountain.isOpen ? (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "green", to: "blue" }}
        >
          OPEN
        </Badge>
      ) : (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "gray", to: "black" }}
        >
          CLOSED
        </Badge>
      )}

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {mountain.name}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {mountain.description}
      </Text>
      <Group justify="space-between" className={classes.footer}>
        <Center></Center>
        <Group gap={8} mr={0}>
          <AlertDialog>
            <AlertDialogTrigger>
              <IconStar style={{ width: rem(16), height: rem(16) }} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Wishlist</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah anda ingin menambahkan {mountain.name} ke wishlist?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleAddToWishlist(mountain.id)}
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
