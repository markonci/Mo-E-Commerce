"use client";
import React, { ReactNode } from 'react'

import { ThemeProvider } from "next-themes";

interface ProvidersDarkModeProps {
  children: ReactNode;
}

export default function Providersdarkmode({children}:ProvidersDarkModeProps) {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* hna b2olo anta htstghal bnzam al class */}
        {/* defultthem system de lw al user lsa m5tarsh 7aga ygbha mn alsystem   */}
        {/* enableSystem b2olo bsm7 any al theme yt2sr b seating al system alghas */}
      {children}
    </ThemeProvider>
  )
}
