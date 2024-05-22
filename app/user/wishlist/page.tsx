'use client'
import React from 'react'
import Wishlist from '../components/Wishlist'
import { Grid } from "@mantine/core";
import classes from "../css/mountains.module.css";  // Sesuaikan path jika berbeda

const page = () => {
  return (
    <div className={classes.gridoi}>
      <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            
      <Wishlist/>
          </Grid.Col>

      </Grid>
    </div>
  )
}

export default page
