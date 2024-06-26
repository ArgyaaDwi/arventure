'use client';
import { createClient } from "../client";


//Menampilkan semua provinsi
export const fetchAllProvinces = async () => {
  const supabase = createClient();

  const { data: provinces, error } = await supabase.from('province').select('*');

  if (error) {
    console.error("Error fetching provinces:", error.message);
    throw new Error(error.message);
  }

  console.log("Fetched provinces:", provinces)
  console.log("Number of provinces:", provinces.length);

  return provinces;
};

//Tambah provinsi
export const addProvince = async (provinceName: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('province').insert({ provinceName });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

//Menampilkan provinsi berdasarkan id
export const fetchProvinceById = async (id: string) => {
  const supabase = createClient();

  const { data: province, error } = await supabase
    .from('province')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching province:", error.message);
    throw new Error(error.message);
  }
  return province;
};

//Update provinsi
export const updateProvince = async (id: string, provinceName: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('province')
    .update({ provinceName })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//Hapus provinsi
export const deleteProvince = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('province')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};