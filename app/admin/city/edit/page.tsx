"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProvinceById, updateProvince } from "@/utils/supabase/city/crud";
import { Card, Group, Text, TextInput, rem } from "@mantine/core";
import { Suspense } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
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
const EditProvincePage = ({ searchParams }: { searchParams: any }) => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const router = useRouter();

  // console.log("search param", searchParams.provinceId);

  // const searchParams = useSearchParams();
  // const provinceId = searchParams.get("provinceId");
  const provinceId = searchParams.provinceId;
  const [provinceName, setProvinceName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProvince = async () => {
      try {
        const province = await fetchProvinceById(provinceId as string);
        setProvinceName(province.provinceName);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (provinceId) {
      getProvince();
    }
  }, [provinceId]);

  const handleSubmit = async () => {
    try {
      await updateProvince(provinceId as string, provinceName);
      notifications.show({
        title: "Succes!",
        message: "Successfully updated province!",
        icon: checkIcon,
        color: "green",
      });
      router.push("/admin/city");
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: "Gagal mengupdate data!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error update province:", err);
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Card withBorder shadow="sm" radius="md">
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                Edit Province
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
            <br />
            {error && <p>Error: {error}</p>}
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
                  Update
                </button>{" "}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    {" "}
                    Are you sure you want to update this province?{" "}
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
      </Suspense>
    </div>
  );
};

export default EditProvincePage;
