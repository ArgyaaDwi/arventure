"use client";
import React, { useState, useEffect } from "react";
import { Card, Image, Text, Badge, Group } from "@mantine/core";
import { fetchAllProvinces } from "@/utils/supabase/city/crud";
import { fetchMountainById } from "@/utils/supabase/mountain/crud";
import { useRouter } from "next/navigation";
interface DetailMountain {
  searchParams: { id: string };
}

const DetailMountainPage: React.FC<DetailMountain> = ({ searchParams }) => {
  const router = useRouter();   
  const [name, setMountainName] = useState("");
  const [description, setDescription] = useState("");
  const [idProvince, setIdProvince] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const id = searchParams.id;

  const [selectedProvince, setSelectedProvince] = useState<any>("");

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
          setIdProvince(mountainData.idProvince);

          setSelectedProvince({
            value: mountainData.idProvince,
            label: mountainData.provinceName,
          });
          setImage(mountainData.image);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={
              image 
              
            }
            alt={name}
            height={160}
            fit="cover"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{name}</Text>
          <Badge color={isOpen ? "green" : "red"}>
            {isOpen ? "Open" : "Closed"}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" mb="sm">
          {description}
        </Text>
      </Card>
      <button
        type="button"
        className="bg-white text-black border border-black rounded-md px-4 py-2 my-3 mr-2"
        onClick={() => router.push("/admin/mountain")}
      >
        Back
      </button>
    </div>
  );
};

export default DetailMountainPage;
