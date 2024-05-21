// "use client";
// import { createClient } from "@/utils/supabase/client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { getCurrentUser, getUsers } from "@/utils/supabase/auth";
// import { useState, useEffect } from "react";

// interface Props {}

// export default function User(props: Props) {
//   const [userName, setUserName] = useState<any>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const authUser = await getCurrentUser();

//         const user = await getUsers(authUser!.id);
//         console.log("auth user", authUser);
//         console.log("user", user);

//         setUserName(authUser!.email);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setUserName("Error");
//       }
//     };
//     fetchUser();
//   }, []);

//   const router = useRouter();

//   const handleLogout = async () => {
//     const supabase = createClient();
//     try {
//       await supabase.auth.signOut();
//       router.refresh();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Halo </h1>
//       <span className="font-semibold text-sm">{userName}</span>

//       <button
//         onClick={handleLogout}
//         className="p-2 bg-red-500 text-white rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
// pages/user/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { getCurrentUser, getUsers } from '@/utils/supabase/auth';

const UserPage = () => {
  const [userName, setUserName] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await getCurrentUser();
        const user = await getUsers(authUser!.id);
        console.log('auth user', authUser);
        console.log('user', user);
        setUserName(authUser!.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserName('Error');
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <h1>Halo </h1>
      <span className="font-semibold text-sm">{userName}</span>
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default UserPage;
