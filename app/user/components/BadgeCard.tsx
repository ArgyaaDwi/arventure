"use client";
import { IconHeart, IconMessage } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  rem,
} from "@mantine/core";
import { EyeIcon } from "lucide-react";
import classes from "../css/BadgeCard.module.css";

export function ArticleCard({ mountain }: { mountain: any }) {
  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image
            src={mountain.image || "/public/assets/images/default.jpg"}
            alt={mountain.name}
            height={20}
            width={50}
          />
        </a>
      </Card.Section>

      {mountain.isOpen ? (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "green", to: "blue" }}
        >
          OPEN
        </Badge>
      ) : (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "gray", to: "black" }}
        >
          CLOSED
        </Badge>
      )}

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {mountain.name}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {mountain.description}
      </Text>
      <Group justify="space-between" className={classes.footer}>
        <Center></Center>
        <Group gap={8} mr={0}>
          {/* <ActionIcon className={classes.action}>
            <EyeIcon style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon> */}
          <ActionIcon className={classes.action}>
            <IconHeart style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
          {/* <ActionIcon className={classes.action}>
            <IconMessage style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon> */}
        </Group>
      </Group>
    </Card>
  );
}
