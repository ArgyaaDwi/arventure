"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProvinceById, updateProvince } from "@/utils/supabase/city/crud";
import { Card, Group, Text, TextInput } from "@mantine/core";
import { Suspense } from "react";
const EditProvincePage = ({ searchParams }: { searchParams: any }) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProvince(provinceId as string, provinceName);
      // Menampilkan pesan sukses menggunakan alert
      alert("Province updated successfully!");
      // Mengarahkan pengguna kembali ke halaman /admin/city
      router.push("/admin/city");
    } catch (err: any) {
      setError(err.message);
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
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="bg-black text-white rounded-md px-4 py-2 my-3 "
            >
              Update
            </button>{" "}
          </form>
        </Card>
      </Suspense>
    </div>
  );
};

export default EditProvincePage;
