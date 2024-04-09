import Link from 'next/link'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 NotFound',
  description: '404 NotFound page description',
  keywords: ['404 NotFound', 'Next.js'],
}


export default function NotFound() {
  return (
    <div>
      <div>
        <h1>404 NotFound</h1>
        <Link href="/home">&larr; Back to Home</Link>
      </div>
    </div>
  )
}