'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function MySessionProvider({children}:{children:React.ReactNode}) {
  return (
    <SessionProvider >
        {/* ('خلينا الكمبونت كلينت علشان السيشن بروفيدر بتشتغل في الكلاينت بس ') */}
        {children}
    </SessionProvider>
  )
}
