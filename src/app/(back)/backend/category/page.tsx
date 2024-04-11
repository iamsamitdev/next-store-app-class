import React from 'react'
import CategoryPage from './Category'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Category',
    description: 'Category page description',
    keywords: ['Category', 'Next.js'],
}


type Props = {}

export default function Report({}: Props) {
  return (
    <CategoryPage />
  )
}