import React from 'react'
import ReportPage from './Report'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Report',
    description: 'Report page description',
    keywords: ['Report', 'Next.js'],
}


type Props = {}

export default function Report({}: Props) {
  return (
    <ReportPage />
  )
}