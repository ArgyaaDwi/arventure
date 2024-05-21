// pages/admin.tsx
"use client";
import classNames from "classnames";
import { Suspense } from "react";
import React from "react";
import { Table } from "@mantine/core";
import TableDemo from "@/app/admin/city/components/table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FileInput, Card, CardSection, Group, Text } from "@mantine/core";

export default function City() {
  const router = useRouter();
  const handleAddProvince = () => {
    router.push("/admin/city/add");
  };

  return (
    <div className="">
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding>
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Province Page
            </Text>
            <button
              className="my-3 flex items-center text-white bg-black rounded-md p-2 hover:bg-gray-500"
              onClick={handleAddProvince}
            >
              <div className="px-3"> Add</div>
            </button>{" "}
          </Group>
        </Card.Section>
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <TableDemo />
        </Suspense>
      </Card>
    </div>
  );
}
