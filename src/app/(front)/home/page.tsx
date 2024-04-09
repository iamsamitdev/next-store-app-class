import React from 'react'
import HomePage from './Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page description',
  keywords: ['Home', 'Next.js'],
}

type Props = {}

export default function Home({}: Props) {
  return (
    <HomePage />
  )
}