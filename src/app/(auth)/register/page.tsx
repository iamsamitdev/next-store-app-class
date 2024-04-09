import React from 'react'
import RegisterPage from './Register'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register page description',
    keywords: ['Register', 'Next.js'],
}

type Props = {}

export default function Register({}: Props) {
  return (
    <RegisterPage />
  )
}