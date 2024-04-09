import React from 'react'

import { Metadata } from 'next'
import ContactPage from './Contact'


export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page description',
  keywords: ['Contact', 'Next.js'],
}

type Props = {}

export default function Contact({}: Props) {
  return (
    <ContactPage />
  )
}