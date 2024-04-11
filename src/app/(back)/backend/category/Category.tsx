"use client"

import DashboardCard from '@/app/components/back/shared/DashboardCard'
import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function CategoryPage({}: Props) {
  return (
    <DashboardCard title={'Category'}>
      <Box mt={3}>
        <Typography variant='subtitle1'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum obcaecati at delectus repudiandae ipsam vero tempora, porro consequatur, placeat sed natus in! Hic quaerat, eveniet voluptatum, dolores corrupti placeat veritatis ab minima ex magnam, dolore repellendus vitae voluptates dicta sit cumque earum atque! Voluptatum sunt quae ratione necessitatibus! Saepe, cum!
        </Typography>
      </Box>
    </DashboardCard>
  )
}