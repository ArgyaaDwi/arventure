"use client";
import React, { useState } from "react";
import { Card, Group, Text, TextInput } from "@mantine/core";
// import { useRouter } from "next/router";
import { addProvince } from "@/utils/supabase/city/crud";

const AddProvincePage = () => {
  //   const router = useRouter();
  const [provinceName, setProvinceName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addProvince(provinceName);
      // Menampilkan pesan sukses menggunakan alert
      alert("Province added successfully!");
      // Mengarahkan pengguna kembali ke halaman /admin/city
      window.location.href = "/admin/city";
    } catch (err: any) {
      setError(err.message);
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
          {/* <div>
            <label htmlFor="provinceName">Province Name:</label>
            <input
              type="text"
              id="provinceName"
              value={provinceName}
              onChange={(e) => setProvinceName(e.target.value)}
              required
            />
          </div> */}
          {error && <p>Error: {error}</p>}
          <br />
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
            Add
          </button>
        </form>
      </Card>
    </div>
  );
};

export default AddProvincePage;
