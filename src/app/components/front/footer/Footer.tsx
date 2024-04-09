import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import logoIcon from '/public/images/logos/NextStoreLogoIcon.svg'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={5} lg={4} textAlign="center">
          <Image src={logoIcon} alt="icon" />
          <Typography fontSize="16" color="textSecondary" mt={1} mb={4}>
            All rights reserved by Next Modern. Designed & Developed by &nbsp;&nbsp;
            <Link href="http://www.itgenius.co.th" target='_blank'>
              <Typography color="textSecondary" component="span" display="inline">
                ITGenius
              </Typography>{' '}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer
