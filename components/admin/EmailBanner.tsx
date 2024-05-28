import { Text, Title, TextInput, Button, Image } from "@mantine/core";
// import image from './image.svg';
import classes from "../css/EmailBanner.module.css";

export function EmailBanner() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Welcome to Dashboard Admin</Title>
        {/* <Text fw={500} fz="lg" mb={5}>
          Subscribe to our newsletter!
        </Text> */}
        <Text fz="sm" c="dimmed">
          You can manage many things in this Arventure application
        </Text>
      </div>
    </div>
  );
}
