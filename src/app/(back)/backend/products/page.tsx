import React from 'react'
import ProductsPage from './Products'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products page description',
  keywords: ['Products', 'Next.js'],
}

type Props = {}

export default function Products({}: Props) {
  return (
    <ProductsPage />
  )
}