// components/SplashProvider.tsx
"use client";

import React, { useState, useEffect } from "react";
import Splashloding from "../_SplashLoding/page";

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3100); // 3 ثواني
    return () => clearTimeout(timer);
  }, []);

  return <>{showSplash ? <Splashloding /> : children}</>;
}