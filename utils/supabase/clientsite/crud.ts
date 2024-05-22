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
