"use client";

import React, { useState, useEffect } from "react";
import {Wishlist} from "../components/Wishlist";
import { Grid } from "@mantine/core";
import classes from "../css/mountains.module.css"; // Sesuaikan path jika berbeda
import { fetchWishlistByUser, fetchViewWishlist } from "@/utils/supabase/clientsite/crud";
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
interface WishlistProps {
  wishlist: any; // Sesuaikan tipe data sesuai struktur data yang diharapkan
}
const page = () => {
  const [wishlist, setWishlist] = useState<any>([]);
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

  return (
    <div className={classes.gridoi}>
      {/* <p>{wishlist.length}</p> */}
      <Grid>
        {wishlist.map((item:any) => (
          <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 3 }}>
            <Wishlist wishlist={item} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default page;
