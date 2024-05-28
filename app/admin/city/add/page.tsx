"use client";
import React, { useState } from "react";
import { Card, Group, Text, TextInput, rem } from "@mantine/core";
// import { useRouter } from "next/router";
import { addProvince } from "@/utils/supabase/city/crud";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";

const AddProvincePage = () => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  //   const router = useRouter();
  const [provinceName, setProvinceName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await addProvince(provinceName);
  //     // Menampilkan pesan sukses menggunakan alert
  //     alert("Province added successfully!");
  //     // Mengarahkan pengguna kembali ke halaman /admin/city
  //     window.location.href = "/admin/city";
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      await addProvince(provinceName);
      notifications.show({
        title: "Success!",
        message: "Province added successfully!",
        icon: checkIcon,
        color: "green",
      });
      window.location.href = "/admin/city";
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: "Failed to add Province!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error adding to province:", err);
    }
  };
  return (
    <div>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Add Province
            </Text>
          </Group>
        </Card.Section>
        <br />
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="provinceName">Province Name:</label>
            <TextInput
              id="provinceName"
              value={provinceName}
              onChange={(e) => setProvinceName(e.target.value)}
              required
            />
          </div>

          {error && <p>Error: {error}</p>}
          <br />

          <button
            type="button"
            className="bg-white text-black border border-black rounded-md px-4 py-2 my-3 mr-2"
            onClick={() => (window.location.href = "/admin/city")}
          >
            Back
          </button>

          <AlertDialog>
            <AlertDialogTrigger>
              <button
                type="submit"
                className="bg-black text-white rounded-md px-4 py-2 my-3 "
              >
                Add
              </button>{" "}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to add this province?{" "}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Card>
    </div>
  );
};

export default AddProvincePage;
