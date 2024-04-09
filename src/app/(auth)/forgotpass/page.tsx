import React from 'react'
import { Metadata } from 'next'
import ForgotpassPage from './Forgotpass'

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Forgot Password page description',
    keywords: ['Forgot Password', 'Next.js'],
}

type Props = {}

export default function Forgotpass({}: Props) {
  return (
    <ForgotpassPage />
  )
}