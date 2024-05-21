// pages/admin.tsx
"use client";
import classNames from "classnames";
import React from "react";
import { Table } from "@mantine/core";
import TableDemo from "@/app/admin/user/components/table";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FileInput, Card, Group, Text } from "@mantine/core";

export default function Mountain() {
  const router = useRouter();
  const handleAddMountain = () => {
    router.push("/admin/mountain/add");
  };

  return (
    <div className="">
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding >
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Users Page
            </Text>
            <button
              className="my-3 flex items-center text-white bg-black rounded-md p-2 hover:bg-gray-500"
              onClick={handleAddMountain}
            >
              <div className="px-3"> Add</div>
            </button>{" "}
          </Group>
        </Card.Section>
        <br />
        <TableDemo />
      </Card>
    </div>
  );
}
