'use client';
import { IconBookmark, IconColumnRemove, IconHeart, IconShare, IconTrashFilled } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from '@mantine/core';
import classes from '../css/BadgeCard.module.css';

export default function Wishlist() {
  const linkProps = { href: 'https://mantine.dev', target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/Cij5vdL.png" height={180} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        outstanding
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        Resident Evil Village review
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very
        different direction to its predecessor, namely the fact that this time round instead of
        fighting against various mutated zombies, you’re now dealing with more occult enemies like
        werewolves and vampires.
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
        
        </Center>

        <Group gap={8} mr={0}>
         
          <ActionIcon className={classes.action}>
            <IconTrashFilled
              style={{ width: rem(16), height: rem(16) }}

            />
          </ActionIcon>
         
        </Group>
      </Group>
    </Card>
  );
}