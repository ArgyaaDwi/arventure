import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie, IconStar, IconMountain, IconUsers, IconFileInfo, IconLayout, IconTimeline } from "@tabler/icons-react";
import classes from "../css/FeaturesCard.module.css";

const mockdata = [
  {
    title: "Mountain Exploration",
    description:
      "Find the latest information about which mountains are currently open or closed.",
    icon: IconMountain,
  },
  {
    title: "Mountain Management by Admin",
    description:
      "Admins can easily add and manage mount status - open or closed - in seconds.",
    icon: IconUsers,
  },
  {
    title: "Add to Wishlist with One Click",
    description:
      "Users can add their favorite mountains to their wishlist for future visits with just one click.",
    icon: IconStar,
  },
  {
    title: "Complete Mountain Information",
    description:
      "Access complete and up-to-date information about the various mountains in it.",
    icon: IconFileInfo,
    
  },
  {
    title: "Friendly User Interface",
    description:
      "Enjoy a seamless user experience with an interface specifically designed for ease of navigation and use.",
    icon: IconLayout,
  },
  {
    title: "Plan Your Hike",
    description: "offer an unforgettable climbing experience with us.",
    icon: IconTimeline,
  },
];

export function FeaturesCards() {
  // const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        //   color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      {/* <Group justify="center">
          <Badge variant="filled" size="lg">
            Best company ever
          </Badge>
        </Group> */}

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Explore the best mountain hiking destinations in Indonesia{" "}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you'll find a hidden gem among Indonesia's
        mountain trails. Our app provides all the information you need, from
        detailed trail guides to safety tips, ensuring your hiking adventure is
        both safe and unforgettable.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
