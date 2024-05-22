"use client";
import { Card, Overlay, Button, Text } from "@mantine/core";
import classes from "../css/ImageActionBanner.module.css";
import { useRouter } from "next/navigation";
export default function ImageActionBanner() {
  const router = useRouter();
  const handleInfo = () => {
    router.push("/user/mountains");
  };
  return (
    <Card radius="md" className={classes.card}>
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

      <div className={classes.content}>
        <Text size="lg" fw={900} className={classes.title}>
          ARventure{" "}
        </Text>

        <Text size="lg" className={classes.description}>
          Discover comprehensive information on mountain hiking in Indonesia
          with our app. Start your journey to the stunning peaks of Indonesia
          today!
        </Text>
        <Button
          className={classes.action}
          variant="white"
          color="dark"
          size="lg"
          onClick={handleInfo}
        >
          View More
        </Button>
      </div>
    </Card>
  );
}
