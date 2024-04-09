import React from 'react'
import AboutPage from './About'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About page description',
  keywords: ['About', 'Next.js'],
}

type Props = {}

export default function About({}: Props) {
  return (
    <AboutPage />
  )
}