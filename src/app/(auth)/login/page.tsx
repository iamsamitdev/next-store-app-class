import React from 'react'
import LoginPage from './Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page description',
    keywords: ['Login', 'Next.js'],
}
  
type Props = {}

export default function Login({}: Props) {
  return (
    <LoginPage />
  )
}