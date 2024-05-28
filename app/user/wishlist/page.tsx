"use client";

import React, { useState, useEffect } from "react";
import { Wishlist } from "../components/Wishlist";
import { Grid } from "@mantine/core";
import classes from "../css/mountains.module.css"; // Sesuaikan path jika berbeda
import {
  fetchWishlistByUser,
  fetchViewWishlist,
} from "@/utils/supabase/clientsite/crud";
import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
interface WishlistProps {
  wishlist: any; // Sesuaikan tipe data sesuai struktur data yang diharapkan
}
const page = () => {

  return (
    <div className={classes.gridoi}>
      
      
        <Wishlist />
    
    </div>
  );
};

export default page;
