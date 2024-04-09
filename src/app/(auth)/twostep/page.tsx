import React from 'react'
import { Metadata } from 'next'
import TwostepPage from './Twostep'

export const metadata: Metadata = {
    title: 'Two Step Verification',
    description: 'Two Step Verification page description',
    keywords: ['Two Step Verification', 'Next.js'],
}

type Props = {}

export default function Twostep({}: Props) {
  return (
    <TwostepPage />
  )
}