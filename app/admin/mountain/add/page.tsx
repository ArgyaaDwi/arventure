"use client";
import {
  TextInput,
  Select,
  FileInput,
  Card,
  Group,
  Text,
  rem,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
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
// import { useRouter } from "next/router";
import { addMountains } from "@/utils/supabase/mountain/crud";
import { fetchAllProvinces } from "@/utils/supabase/city/crud";
import { notifications } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";
export default function AddMountainPage() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const [name, setMountainName] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);

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

  const handleSubmit = async () => {
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

      await addMountains(name, selectedProvince.value, description, imageUrl);
      notifications.show({
        title: "Success!",
        message: "Mountain added successfully!",
        icon: checkIcon,
        color: "green",
      });
      window.location.href = "/admin/mountain";
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: "Failed to add mountain!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error adding to mountain:", err);
    }
  };

  return (
    <div>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Add Mountain
            </Text>
          </Group>
        </Card.Section>
        <form onSubmit={(e) => e.preventDefault()}>
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
            <label htmlFor="idProvince">Description:</label>
            <TextInput
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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
                  Are you sure you want to add this mountain?{" "}
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
}
