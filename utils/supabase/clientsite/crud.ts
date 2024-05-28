'use client';
import { createClient } from "../client";

//Tambah ke wishlist bro
export const addToWishlist = async (idMountain: string) => {
  const supabase = createClient();
  // Cek apakah gunung sudah ada di wishlist
  const { data: existingWishlist, error: existingError } = await supabase
    .from('wishlist')
    .select('*')
    .eq('idMountain', idMountain);

  if (existingError) {
    throw existingError;
  }
  // Jika gunung sudah ada di wishlist, hentikan fungsi dan kirim pesan error
  if (existingWishlist && existingWishlist.length > 0) {
    throw new Error('Gunung sudah ada di wishlist');
  }
  // Jika gunung belum ada di wishlist, tambahkan ke wishlist
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ idMountain: idMountain }]);
  if (error) {
    throw error;
  }
  return data;
};

//Menampilkan wishlist dari user yang login
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
export const fetchWishlistByUsers = async (idUser: string) => {
  const supabase = createClient();

  try {
    // Mengambil data wishlist
    const { data: wishlist, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('idUser', idUser);

    if (error) {
      throw error;
    }

    // Jika tidak ada wishlist yang ditemukan, mengembalikan array kosong
    if (!wishlist || wishlist.length === 0) {
      return [];
    }

    // Mengambil id gunung dari semua wishlist
    const mountainIds = wishlist.map(wishlistItem => wishlistItem.idMountain);

    // Mengambil informasi gunung berdasarkan id yang telah diambil
    const { data: mountainsData, error: mountainError } = await supabase
      .from('mountain')
      .select('*')
      .in('id', mountainIds);

    if (mountainError) {
      throw mountainError;
    }

    // Menggabungkan informasi gunung dengan wishlist
    const mergedData = wishlist.map(wishlistItem => {
      const mountain = mountainsData.find(mountainItem => mountainItem.id === wishlistItem.idMountain);
      return {
        ...wishlistItem,
        mountain_name: mountain ? mountain.name : '',
        mountain_image: mountain ? mountain.image : '',
      };
    });

    return mergedData;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    // throw new Error(error.message);
  }
};

export const deleteWishlist = async (id: string) => {
  const supabase = createClient();
  console.log('Deleting wishlist item with id:', id);

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
export const fetchViewWishlist = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  const { data: users, error } = await supabase.from('wishlist_with_mountainss').select('*').eq('idUser', user!.id);
  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }
  console.log("Fetched users:", users);
  console.log("Fetched total users:", users.length);
  return users;
};
