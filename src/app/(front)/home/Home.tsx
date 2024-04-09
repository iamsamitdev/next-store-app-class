'use client'

import React from 'react'
import Frameworks from '@/app/components/front/frameworks/Frameworks'
import Banner from '@/app/components/front/banner/Banner'

type Props = {}

export default function HomePage({}: Props) {
  return (
    <>
      <Banner />
      <Frameworks />
    </>
  )
}