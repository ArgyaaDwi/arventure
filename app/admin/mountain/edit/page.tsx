"use client";

import {
  Card,
  Group,
  Text,
  TextInput,
  Select,
  FileInput,
  Textarea,
  rem,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateMountain,
  fetchMountainById,
} from "@/utils/supabase/mountain/crud";
import { fetchAllProvinces } from "@/utils/supabase/city/crud";
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

interface EditMountainPageProps {
  searchParams: { id: string };
}

const EditMountainPage: React.FC<EditMountainPageProps> = ({
  searchParams,
}) => {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const router = useRouter();
  const id = searchParams.id;

  const [name, setMountainName] = useState("");
  const [description, setDescription] = useState("");
  const [idProvince, setIdProvinceName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const provinceData = await fetchAllProvinces();
        const formattedProvinceData = provinceData.map((province) => ({
          value: province.id,
          label: province.provinceName,
        }));
        setProvinces(formattedProvinceData);

        if (id) {
          const mountainData = await fetchMountainById(id);
          console.log("Fetched mountain data:", mountainData);

          setMountainName(mountainData.name);
          setDescription(mountainData.description);
          setIsOpen(mountainData.isOpen);

          setSelectedProvince({
            value: mountainData.idProvince,
            label: mountainData.provinceName,
          });
          setImage(mountainData.image);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

      await updateMountain(
        id,
        name,
        selectedProvince.value,
        description,
        imageUrl,
        isOpen!
      );
      notifications.show({
        title: "Succes!",
        message: "Successfully updated mountain!",
        icon: checkIcon,
        color: "green",
      });
      router.push("/admin/mountain");
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: "Gagal mengupdate data!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error update mmountain:", err);
    }
  };

  return (
    <div>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Edit Mountain
            </Text>
          </Group>
        </Card.Section>
        <br />
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
              onChange={(value) => setSelectedProvince(value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <FileInput
              accept="image/png,image/jpeg"
              label="Upload Image"
              placeholder="Upload Image"
              value={file}
              onChange={setFile}
            />
          </div>
          <div>
            <label htmlFor="isOpen">Status:</label>
            <Select
              data={[
                { value: "true", label: "Open" },
                { value: "false", label: "Closed" },
              ]}
              value={isOpen?.toString() || ""}
              onChange={(value) => setIsOpen(value === "true")}
              required
            />
          </div>
          <br />
          {error && <p>Error: {error}</p>}
          <button
            type="button"
            className="bg-white text-black border border-black rounded-md px-4 py-2 my-3 mr-2"
            onClick={() => router.push("/admin/mountain")}
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
                  Are you sure you want to update this mountain?{" "}
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

export default EditMountainPage;
