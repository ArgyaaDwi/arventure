// "use client";

// import React, {useState} from "react";
// import Link from "next/link";
// // import { headers } from "next/headers";
// import { createClient } from "@/utils/supabase/client";
// import { redirect, useRouter } from "next/navigation";
// import { SubmitButton } from "./submit-button";

// export default function Login({
//   searchParams,
// }: {
//   searchParams: { message: string };
// }) {
//   const router = useRouter();
//   const signIn = async (formData: FormData) => {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const supabase = createClient();

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     const { data: users } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", user?.id)
//       .single();

//     if (users) {
//       if (users.isAdmin) {
//         router.push("/admin");
//       } else {
//         router.push("/user");
//       }
//     }

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     // router.push("/");
//     router.refresh();
//   };

//   const signUp = async (formData: FormData) => {

//     // const origin = headers().get("origin");
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const supabase = createClient();

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         emailRedirectTo: `${origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       return redirect("/login?message=Could not authenticate user");
//     }

//     return redirect("/login?message=Check email to continue sign in process");
//   };

//   return (
//     <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
//       <Link
//         href="/"
//         className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
//         >
//           <polyline points="15 18 9 12 15 6" />
//         </svg>{" "}
//         Back
//       </Link>

//       <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
//         <label className="text-md" htmlFor="email">
//           Email
//         </label>
//         <input
//           className="rounded-md px-4 py-2 bg-inherit border mb-6"
//           name="email"
//           placeholder="you@example.com"
//           required
//         />
//         <label className="text-md" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="rounded-md px-4 py-2 bg-inherit border mb-6"
//           type="password"
//           name="password"
//           placeholder="••••••••"
//           required
//         />
//         <SubmitButton
//           formAction={signIn}
//           className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
//           pendingText="Signing In..."
//         >
//           Sign In
//         </SubmitButton>
//         <SubmitButton
//           // formAction={signUp}
//           className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
//           pendingText="Signing Up..."
//         >
//           Sign Up
//         </SubmitButton>
//         {searchParams?.message && (
//           <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
//             {searchParams.message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./authentication.module.css";
import { SubmitButton } from "@/components/submit-button";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.currentTarget.value;

    if (!inputEmail) {
      setIsEmailError(true);
      setEmailError("Email is required");
    } else if (!inputEmail.includes("@") || !inputEmail.includes(".")) {
      setIsEmailError(true);
      setEmailError("Alamat email tidak valid");
    } else {
      setIsEmailError(false);
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.currentTarget.value;

    if (!inputPassword) {
      setIsPasswordError(true);
      setPasswordError("Password is required");
    } else {
      setIsPasswordError(false);
      setPasswordError("");
    }
  };

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("Could not authenticate user");
      return;
    }

    router.push("/user");
    router.refresh();
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-background-secondary-light px-8 justify-center gap-2 h-screen">
      <Container w={400} my={40}>
        <Title ta="center" className={classes.title}>
          ARventure
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Don't have an account yet?{" "}
          <Anchor size="sm" component="a" href="/register" underline="never">
            Sign Up
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border"
              name="email"
              placeholder="argya@example.com"
              onChange={handleEmailChange}
              required
            />
            {isEmailError && (
              <Text color="red" size="sm">
                {emailError}
              </Text>
            )}
            <label className="text-md" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handlePasswordChange}
              required
            />
            {isPasswordError && (
              <Text color="red" size="sm">
                {passwordError}
              </Text>
            )}
            <SubmitButton
              className="bg-background-secondary w-full font-semibold text-white rounded-md mt-4 px-4 py-2 text-foreground mb-2"
              pendingText="Signing In..."
              formAction={signIn}
            >
              Sign In
            </SubmitButton>
            {loginError && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {loginError}
              </p>
            )}
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </Paper>
      </Container>
    </div>
  );
}
