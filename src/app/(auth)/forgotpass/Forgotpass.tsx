'use client'

import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import AuthForgotPassword from '@/app/(auth)/_authForms/AuthForgotPassword'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

export default function ForgotpassPage({}: Props) {
  return (
    <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Box position="relative">
          <Box px={4} py={4}>
            <Link href='/'>
              <Image
                    src={"/images/logos/NextStoreLogo.svg"}
                    alt="logo"
                    height={40}
                    width={174}
                    priority
                />
            </Link>
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 75px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <Image
              src={"/images/front/background/login-bg.svg"}
              alt="bg" width={500} height={500}
              style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '500px',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
      <Box p={4}>
        <Typography variant="h4" fontWeight="700">
          Forgot your password?
        </Typography>

        <Typography color="textSecondary" variant="subtitle2" fontWeight="400" mt={2}>
          Please enter the email address associated with your account and We will email you a link
          to reset your password.
        </Typography>
        <AuthForgotPassword />
      </Box>
      </Grid>   
    </Grid>
  )
}