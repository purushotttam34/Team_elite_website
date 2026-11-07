import { useIdentity } from '../context/IdentityContext';
export default function IdentitySwitcher() {
 const { mode, setMode } = useIdentity();
 return <div className="identity-switch" role="group" aria-label="Choose team identity">
  <button className={mode==='te'?'active':''} aria-pressed={mode==='te'} onClick={()=>setMode('te')}>TEAM ELITE</button>
  <button className={mode==='og'?'active':''} aria-pressed={mode==='og'} onClick={()=>setMode('og')}>OG ELITE</button>
 </div>;
}
