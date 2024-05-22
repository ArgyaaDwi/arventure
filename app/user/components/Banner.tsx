import { Card, Overlay, Button, Text } from '@mantine/core';
import classes from '../css/ImageActionBanner.module.css';

export default function ImageActionBanner() {
  return (
    <Card radius="md" className={classes.card}>
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

      <div className={classes.content}>
        <Text size="lg" fw={700} className={classes.title}>
          Plan & save
        </Text>

        <Text size="xl" className={classes.description}>
          Save up to 25% at Fifth Season Hotels in Europe, the Middle East, Africa and Asia Pacific
        </Text>
        <Button className={classes.action} variant="white" color="dark" size="lg">
          Book now
        </Button>
      </div>
    </Card>
  );
}