"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeroContextType {
  isHeroShortened: boolean;
  setIsHeroShortened: (value: boolean) => void;
}

//create context based on the type HerocontextType
const HeroContext = createContext<HeroContextType | undefined>(undefined);

//create provider that we'll use to hook up our components
export function HeroProvider({ children }: { children: ReactNode }) {
  const [isHeroShortened, setIsHeroShortened] = useState<boolean>(false);

  return (
    <HeroContext.Provider value={{ isHeroShortened, setIsHeroShortened }}>
      {children}
    </HeroContext.Provider>
  );
}

//and we make a custom hook to use the context, this gives it access to the stuff we defined in the provider
export function useHeroContext() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
}
