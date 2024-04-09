"use client"

import Blog from '@/app/components/back/dashboard/Blog'
import MonthlyEarnings from '@/app/components/back/dashboard/MonthlyEarnings'
import ProductPerformance from '@/app/components/back/dashboard/ProductPerformance'
import RecentTransactions from '@/app/components/back/dashboard/RecentTransactions'
import SalesOverview from '@/app/components/back/dashboard/SalesOverview'
import YearlyBreakup from '@/app/components/back/dashboard/YearlyBreakup'
// import DashboardCard from '@/app/components/back/shared/DashboardCard'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function DashboardPage({}: Props) {
  return (
    // <DashboardCard title="Sample Page">
    //   <Typography>This is a sample2 page</Typography>
    // </DashboardCard>
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentTransactions />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance />
        </Grid>
        <Grid item xs={12}>
          <Blog />
        </Grid>
      </Grid>
    </Box>
  )
}