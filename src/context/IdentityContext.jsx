import React, { createContext, useContext, useEffect, useState } from "react";
import { identities } from '../data/identities';
const IdentityContext = createContext(null);
export function IdentityProvider({ children }) {
  const [mode, setMode] = useState(() => { try { return localStorage.getItem('elite-identity') === 'og' ? 'og' : 'te'; } catch { return 'te'; } });
  useEffect(() => { try { localStorage.setItem('elite-identity', mode); } catch {} }, [mode]);
  return <IdentityContext.Provider value={{ mode, setMode, identity: identities[mode] }}>{children}</IdentityContext.Provider>;
}
export function useIdentity() { return useContext(IdentityContext); }
