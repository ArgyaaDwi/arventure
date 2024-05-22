"use client";
import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/HeaderSimple.module.css";
import Link from "next/link";

import Demo from "./Button";
const links = [
  { link: "/user", label: "Home" },
  { link: "/user/mountains", label: "Mountains" },
  { link: "/user/wishlist", label: "Wishlist" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} legacyBehavior>
      <a
        className={classes.link}
        data-active={active === link.link || undefined}
        onClick={() => setActive(link.link)}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div>
          <h1 className="text-xl font-bold">ARventure</h1>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Demo />
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
