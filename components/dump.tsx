"use client";

// create context

import React, { createContext, ReactNode, useContext, useState } from "react";

interface HeroContextType {
  isHeroShortened: boolean;
  setIsHeroShortened: (value: boolean) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

//create hero provider

export function HeroProvider({ children }: { children: ReactNode }) {
  const [isHeroShortened, setIsHeroShortened] = useState<boolean>(false);

  return (
    <HeroContext.Provider value={{ isHeroShortened, setIsHeroShortened }}>
      {children}
    </HeroContext.Provider>
  );
}


// create use provider hook 

export function useHeroContext(){
  const context = useContext(HeroContext)
  if(!context){
    throw new Error("usehero context ")
  }
}