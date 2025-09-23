import { Button } from '@/components/ui/button'
import React from 'react'

export default function Footer() {
  return (
    <div className='dark:bg-amber-900 bg-sky-300  p-7 '>
        <div>
            <p>Get the FreshCart app</p> 
            <p className='text-gray-500'>we wil send you a link,open it  on your phone to download the app </p>
            <div>
                <input type="text" placeholder='Emaill......' className='w-[90%]  bg-red-200 me-3 p-2 ' />
                <Button className='mt-3'>Share app Link</Button>
            </div>
            <span className='font-bold   '>©Mark Onci</span>
        </div>
    </div>
  )
}
