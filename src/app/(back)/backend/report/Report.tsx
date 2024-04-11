"use client"

import ProductPerformance from '@/app/components/back/dashboard/ProductPerformance'
import SalesOverview from '@/app/components/back/dashboard/SalesOverview'
import { Box, Grid } from '@mui/material'
import React from 'react'

type Props = {}

export default function ReportPage({}: Props) {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={12}>
          <ProductPerformance />
        </Grid>
      </Grid>
    </Box>
  )
}