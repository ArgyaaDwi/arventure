"use client";

import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from "./css/FooterLinks.module.css";

const data = [
  {
    title: "ARventure",
    links: [
      { label: "Home", path: "/user" },
      { label: "Mountains", path: "/user/mountains" },
      { label: "Wishlists", path: "/user/wishlist" },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.path}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {/* <MantineLogo size={30} /> */}
          <Text size="xs" c="dimmed" className={classes.description}>
            Your Climbing Buddy
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 ARventure. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
