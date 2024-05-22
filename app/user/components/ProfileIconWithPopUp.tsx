// ProfileIconWithPopup.tsx
import React from 'react';
import { Menu, Avatar, Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';

function ProfileIconWithPopup() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Group >
      <Menu
        opened={opened}
        onOpen={open}
        onClose={close}
        withinPortal
        position="bottom-end"
        withArrow
      >
        <Menu.Target>
          <Avatar
            src="path_to_your_profile_image.jpg" // ganti dengan path gambar profil Anda
            radius="xl"
            size="md"
            style={{ cursor: 'pointer' }}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item >Profile</Menu.Item>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Item>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export default ProfileIconWithPopup;
