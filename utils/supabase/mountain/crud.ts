'use client';

import { createClient } from "../client";

export const fetchAllMountains = async () => {
  const supabase = createClient();

  const { data: mountains, error } = await supabase.from('mountain').select('*');

  if (error) {
    console.error("Error fetching provinces:", error.message);
    throw new Error(error.message);
  }

  console.log("Fetched mountains:", mountains);
  console.log("Fetched total mountains:", mountains.length);
  
  return mountains;
};
export const addMountains = async (name: string, idProvince:string, image: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('mountain').insert({ name, idProvince, image });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const fetchMountainById = async (id: string) => {
  const supabase = createClient();

  const { data: mountains, error } = await supabase
    .from('mountain')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching mountains:", error.message);
    throw new Error(error.message);
  }

  return mountains;
};
export const updateMountain = async (id: string, name: string, idProvince: string, image: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('mountain')
    .update({ name, idProvince, image })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const deleteMountain = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('mountain')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};