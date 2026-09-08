"use client";
import {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import {regions} from "@/content/site";
const RegionContext = createContext({code: "IN", choose: (_code: string) => {}});
export function RegionProvider({children}: {children: ReactNode}) {
  const [code, setCode] = useState("IN");
  useEffect(() => {
    try { const saved = localStorage.getItem("in2it-region"); if (regions.some(r => r.code === saved)) setCode(saved!); } catch { /* Preference storage is optional. */ }
  }, []);
  function choose(value: string) {
    if (!regions.some(r => r.code === value)) return;
    setCode(value);
    try { localStorage.setItem("in2it-region", value); } catch { /* Keep the in-session preference. */ }
  }
  return <RegionContext.Provider value={{code, choose}}>{children}</RegionContext.Provider>;
}
export const useRegion = () => useContext(RegionContext);
