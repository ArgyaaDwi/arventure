"use client";

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
import classes from "@/public/css/a/authentication.module.css";
import { SubmitButton } from "@/components/submit-button";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Register({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

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
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = event.currentTarget.value;

    if (!inputPassword) {
      setIsPasswordError(true);
      setPasswordError("Password is required");
    }  else {
      setIsPasswordError(false);
      setPasswordError("");
    }
  };
  const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(data);
    if (error) {
      return {
        success: false,
        message: `Could not authenticate user: ${error.message}`,
      };
    }

    const userId = data.user?.id;

    if (!userId) {
      return { success: false, message: `Could not retrieve user ID` };
    }

    const { data: users, error: profileError } = await supabase
      .from("users")
      .insert({ id: userId, name: name, city: city });
    console.log(users);
    if (profileError) {
      return {
        success: false,
        message: `Could not create user profile: ${profileError.message}`,
      };
    }
    router.refresh();

    return { success: true };
  };

  return (
    <div className="flex-1 flex flex-col w-full h-screen bg-background-secondary-light px-8 justify-center gap-2">
      <Container w={400} my={40}>
        <Title ta="center" className={classes.title}>
          ARventure
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Have an Account?{" "}
          <Anchor size="sm" component="a" href="/login">
            Sign In
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
            <label htmlFor="fullName" className="text-md">
              Nama Lengkap
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-2"
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              required
            />
            <label htmlFor="fullName" className="text-md">
              City
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-2"
              type="text"
              name="city"
              placeholder="Masukkan Kota"
              required
            />
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-2"
              name="email"
              placeholder="you@example.com"
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
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
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
              className="bg-background-primary w-full font-semibold text-white rounded-md mt-4 px-4 py-2 text-foreground mb-2"
              pendingText="Signing Up..."
              formAction={signUp}
            >
              Sign Up
            </SubmitButton>
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
