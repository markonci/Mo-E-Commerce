'use client'
import Image from 'next/image'
import img1 from '../../../../../public/240589245_1180771678999693_8694138959577477664_n.jpg'

import React from 'react'
interface ErrorProps {
  error: Error & { digest?: string }
}

export default function Error({error}:ErrorProps) {
  
  return (
<>

<div className='mx-auto'>
      <h1 className='text-center text-3xl'>{error.message}</h1>
    <Image src={img1} alt="error msg" className=' mx-auto' />
</div>
</>
  )
}
