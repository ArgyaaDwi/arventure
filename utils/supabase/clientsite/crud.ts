'use client';

import { createClient } from "../client";
export const addToWishlist = async (idUser: string, idMountain: string) => {
    const supabase = createClient();

  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: idUser, mountain_id: idMountain }]);

  if (error) throw error;
  return data;
};
export const fetchWishlistByUser = async (idUser: string) => {
  const supabase = createClient();

  const { data: wishlist, error } = await supabase
    .from('wishlist')
    .select('*')
    .eq('idUser', idUser);

  if (error) {
    console.error("Error fetching wishlist:", error.message);
    throw new Error(error.message);
  }

  console.log("Fetched wishlist:", wishlist);
  console.log("Total wishlist items:", wishlist.length);
  
  return wishlist;
};
export const fetchViewWishlist = async () => {
  const supabase = createClient();
  const { data: users, error } = await supabase.from('wishlist_with_mountain').select('*');
  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }
  console.log("Fetched users:", users);
  console.log("Fetched total users:", users.length);
  return users;
};
export const deleteWishlit = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};