'use client';
import { createClient } from "../client";

export const fetchAllUsers = async () => {
  const supabase = createClient();
  const { data: users, error } = await supabase.from('users').select('*');
  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }
  console.log("Fetched users:", users);
  console.log("Fetched total users:", users.length);
  return users;
};
export const fetchViewUsers = async () => {
  const supabase = createClient();
  const { data: users, error } = await supabase.from('user_views').select('*');
  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error(error.message);
  }
  console.log("Fetched users:", users);
  console.log("Fetched total users:", users.length);
  return users;
};
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   city: string;
// }

// export const fetchAllUsers = async (): Promise<User[]> => {
//   const supabase = createClient();

//   const { data, error } = await supabase
//     .from('users')
//     .select(`
//       id,
//       name,
//       city,
//       auth.users (email)
//     `);

//   if (error) {
//     console.error("Error fetching users:", error.message);
//     throw new Error(error.message);
//   }

//   // Ensure data is defined and properly formatted
//   if (!data) {
//     throw new Error("No data returned from query");
//   }

//   const formattedData: User[] = data.map((user: any) => {
//     // Validate structure of the user object
//     if (!user.id || !user.name || !user.city || !user.auth || !user.auth.email) {
//       throw new Error("Invalid user data structure");
//     }

//     return {
//       id: user.id,
//       name: user.name,
//       city: user.city,
//       email: user.auth.email,
//     };
//   });

//   console.log("Fetched users:", formattedData);
//   console.log("Fetched total users:", formattedData.length);
//   return formattedData;
// };

export const addUsers = async (name: string, idProvince:string, image: string) => {
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