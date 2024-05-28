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

export default function User() {
  const router = useRouter();

  return (
    <div className="">
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding>
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Users Page
            </Text>
          </Group>
        </Card.Section>
        <br />
        <TableDemo />
      </Card>
    </div>
  );
}
