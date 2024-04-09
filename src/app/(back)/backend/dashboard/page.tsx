import React from 'react'
import DashboardPage from './Dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard page description',
  keywords: ['Dashboard', 'Next.js'],
}

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <DashboardPage />
  )
}