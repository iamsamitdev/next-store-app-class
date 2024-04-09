import React from 'react'
import Home from './home/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page description',
  keywords: ['Home', 'Next.js'],
}


type Props = {}

export default function Front({}: Props) {
  return (
    <Home />
  )
}