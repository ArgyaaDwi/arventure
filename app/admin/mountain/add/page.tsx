"use client";
import {
  TextInput,
  NativeSelect,
  MantineProvider,
  createTheme,
  Input,
  Select,
  Notification,
  FileInput,
  Card,
  Group,
  Text,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { addMountains } from "@/utils/supabase/mountain/crud";
import { fetchAllProvinces } from "@/utils/supabase/city/crud";

export default function AddMountainPage() {
  const [name, setMountainName] = useState("");
  const [idProvince, setIdProvinceName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProvinces();
        const formattedData = data.map((province) => ({
          value: province.id,
          label: province.provinceName,
        }));
        setProvinces(formattedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = image;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "arventure");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dpr1oftgx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      await addMountains(name, selectedProvince.value, imageUrl);
      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/admin/mountain";
      }, 3000);
    } catch (err: any) {
      setError(err.message);
      setShowError(true);
      setShowSuccess(false);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div>
      {showSuccess && (
        <Notification color="green" title="Success">
          Mountain added successfully!
        </Notification>
      )}
      {showError && (
        <Notification color="red" title="Error">
          {error}
        </Notification>
      )}
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Add Mountain
            </Text>
          </Group>
        </Card.Section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Mountain Name:</label>
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setMountainName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="idProvince">Province:</label>
            <Select
              data={provinces}
              value={selectedProvince.value}
              onChange={(_value, option) => setSelectedProvince(option)}
            />
          </div>
          <div>
            <label htmlFor="provinceName">Image</label>
            <FileInput
              accept="image/png,image/jpeg"
              label="Upload files"
              placeholder="Upload files"
              value={file}
              onChange={setFile}
            />
          </div>
          {error && <p>Error: {error}</p>}
          <button
            type="button"
            className="bg-white text-black border border-black rounded-md px-4 py-2 my-3 mr-2"
            onClick={() => (window.location.href = "/admin/mountain")}
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
}
