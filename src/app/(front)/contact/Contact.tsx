import { Box, Container, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function ContactPage({}: Props) {
  return (
    <>
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='65vh'
            flexDirection='column'
        >
            <Container maxWidth='lg'>
                <Typography variant='h1'>Contact Page</Typography>
                <Typography variant='h2'>This is the contact page</Typography>
                <Typography variant='body1' my={2}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eos cupiditate ducimus, quidem a molestiae praesentium consequatur quos qui assumenda non nobis repellendus ipsa veniam quibusdam tempora tenetur et, voluptatum excepturi ipsam minima corrupti. Ducimus consequatur corporis dolores odio nemo in minima, voluptatem, quam quibusdam harum pariatur cum eligendi culpa adipisci temporibus odit illum, aperiam ea optio? Fugiat maxime modi, rerum deleniti mollitia sequi
                </Typography>
            </Container>
        </Box>
    </>
  )
}