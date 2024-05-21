// pages/admin.tsx

import classNames from "classnames";
import React from "react";
import TableDemo from "@/app/admin/review/components/table";
import { Card, Group, Text } from "@mantine/core";

export default function Review() {
  return (
    <div className="">
      <h3>Review Page</h3>
      {/* <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding>
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Review Page
            </Text> */}
            <button
              className="my-3 flex items-center text-white bg-black rounded-md p-2 hover:bg-gray-500"
              // onClick={handleAddProvince}
            >
              <div className="px-3"> Add</div>
            </button>{" "}
          {/* </Group>
        </Card.Section> */}
      <br />
      <TableDemo />
      {/* </Card> */}
    </div>
  );
}
