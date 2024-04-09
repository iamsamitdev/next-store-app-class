import React from 'react'

import { Metadata } from 'next'
import BlogPage from './Blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog page description',
  keywords: ['Blog', 'Next.js'],
}

type Props = {}

export default function Blog({}: Props) {
  return (
    <BlogPage />
  )
}