
// import React from "react";
// import { useState } from 'react';
// import { AnimatePresence, motion } from 'motion/react';

// import {
//   ArrowDownRight,
//   ArrowUpRight,
//   Menu,
//   X,
//   Trophy,
//   Users,
//   History,
//   Radio,
//   Images,
//   Heart,
//   BarChart3
// } from 'lucide-react';

// import { useIdentity } from './context/IdentityContext';
// import IdentitySwitcher from './components/IdentitySwitcher';
// import PhotoStage from './components/PhotoStage';


// const pages = [
//   {
//     name: 'Our Legacy',
//     icon: History,
//     desc: 'The complete journey through every era.'
//   },
//   {
//     name: 'Roster',
//     icon: Users,
//     desc: 'Players, legends, and their stories.'
//   },
//   {
//     name: 'Achievements',
//     icon: Trophy,
//     desc: 'Trophies, match results, and tournament analytics.'
//   },
//   {
//     name: 'Live Arena',
//     icon: Radio,
//     desc: 'Tournament coverage and live updates.'
//   },
//   {
//     name: 'Media',
//     icon: Images,
//     desc: 'Highlights, photographs, and jersey evolution.'
//   },
//   {
//     name: 'Fan Zone',
//     icon: Heart,
//     desc: 'Quizzes, voting, and fan creations.'
//   }
// ];


// function Brand() {
//   const { mode, identity } = useIdentity();
//   const [broken, setBroken] = useState({});

//   return (
//     <div className="brand-mark">
//       {!broken[mode] ? (
//         <img
//           src={identity.logo}
//           alt={`${identity.name} logo`}
//           onError={() =>
//             setBroken(s => ({
//               ...s,
//               [mode]: true
//             }))
//           }
//         />
//       ) : (
//         <span className="brand-placeholder">
//           {mode === 'te' ? 'TE' : 'OG'}
//         </span>
//       )}

//       <span>
//         <strong>ELITE</strong>
//         <small>THE LEGACY PROJECT</small>
//       </span>
//     </div>
//   );
// }


// export default function App() {
//   const { mode, identity } = useIdentity();
//   const [menu, setMenu] = useState(false);

//   return (
//     <main
//       className="app"
//       style={{
//         '--accent': identity.primary,
//         '--deep': identity.deep,
//         '--glow': identity.glow
//       }}
//     >

//       <div className="ambient ambient-one" />
//       <div className="ambient ambient-two" />


//       <header className="topbar">

//         <a
//           href="#home"
//           className="brand-link"
//           aria-label="Home"
//         >
//           <Brand />
//         </a>

//         <nav
//           className={menu ? 'nav open' : 'nav'}
//           aria-label="Main navigation"
//         >
//           <a
//             href="#legacy"
//             onClick={() => setMenu(false)}
//           >
//             THE LEGACY
//           </a>

//           <a
//             href="#explore"
//             onClick={() => setMenu(false)}
//           >
//             EXPLORE
//           </a>

//           <a
//             href="#analytics"
//             onClick={() => setMenu(false)}
//           >
//             STATISTICS
//           </a>
//         </nav>

//         <div className="top-actions">
//           <IdentitySwitcher />

//           <button
//             className="menu-button"
//             aria-label={menu ? 'Close menu' : 'Open menu'}
//             onClick={() => setMenu(!menu)}
//           >
//             {menu ? <X /> : <Menu />}
//           </button>
//         </div>

//       </header>


//       <section id="home" className="hero">

//         <div className="hero-copy">

//           <div className="eyebrow">
//             <span className="pulse" />
//             UNOFFICIAL FREE FIRE FAN TRIBUTE
//             <span className="eyebrow-line" />
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={mode}
//               initial={{
//                 opacity: 0,
//                 y: 18
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0
//               }}
//               exit={{
//                 opacity: 0,
//                 y: -14
//               }}
//               transition={{
//                 duration: .42
//               }}
//             >

//               <p className="hero-kicker">
//                 {identity.eyebrow}
//               </p>

//               <h1>
//                 {mode === 'te' ? (
//                   <>
//                     TEAM
//                     <br />
//                     <em>ELITE.</em>
//                   </>
//                 ) : (
//                   <>
//                     OG
//                     <br />
//                     <em>ELITE.</em>
//                   </>
//                 )}
//               </h1>

//               <p className="slogan">
//                 {identity.slogan}
//               </p>

//             </motion.div>
//           </AnimatePresence>

//           <p className="hero-description">
//             One team. Countless moments. Explore the players,
//             tournaments and unforgettable story behind the Elite legacy.
//           </p>

//           <div className="hero-buttons">

//             <a
//               className="primary-btn"
//               href="#explore"
//             >
//               EXPLORE THE LEGACY
//               <ArrowUpRight size={17} />
//             </a>

//             <a
//               className="secondary-btn"
//               href="#legacy"
//             >
//               OUR STORY
//               <ArrowDownRight size={17} />
//             </a>

//           </div>

//           <div className="hero-footnote">
//             <span>01 / 02</span>
//             <span>
//               SWITCH IDENTITIES ABOVE TO EXPERIENCE BOTH ERAS
//             </span>
//           </div>

//         </div>

//         <PhotoStage />

//         <div className="vertical-label">
//           BUILT BY A FAN · FOR THE FANS
//         </div>

//       </section>


//       <div className="marquee">
//         <span>THE LEGACY LIVES ON</span>
//         <span>✦</span>
//         <span>TEAM ELITE</span>
//         <span>✦</span>
//         <span>ORANGUTAN ELITE</span>
//         <span>✦</span>
//         <span>FREE FIRE ESPORTS</span>
//       </div>


//       <section
//         id="legacy"
//         className="intro section"
//       >

//         <p className="section-tag">
//           01 / THE STORY
//         </p>

//         <h2>
//           MORE THAN A TEAM.
//           <br />
//           <span>A LEGACY.</span>
//         </h2>

//         <p>
//           From the original Team Elite identity to the Orangutan chapter,
//           this fan archive will preserve the stories, player journeys,
//           iconic matches and moments that matter. Historical entries
//           will be added after source verification.
//         </p>

//       </section>


//       <section
//         id="explore"
//         className="section explore"
//       >

//         <div className="section-heading">

//           <div>
//             <p className="section-tag">
//               02 / DISCOVER
//             </p>

//             <h2>
//               EXPLORE THE <span>ELITE.</span>
//             </h2>
//           </div>

//           <p>
//             Six destinations. One unforgettable journey.
//           </p>

//         </div>


//         <div className="feature-grid">

//           {pages.map((p, i) => (
//             <article
//               className="feature-card"
//               key={p.name}
//             >

//               <div className="feature-top">
//                 <p.icon
//                   size={26}
//                   strokeWidth={1.5}
//                 />

//                 <span>0{i + 1}</span>
//               </div>

//               <div>
//                 <h3>{p.name}</h3>
//                 <p>{p.desc}</p>
//               </div>

//               <ArrowUpRight
//                 className="feature-arrow"
//                 size={20}
//               />

//             </article>
//           ))}

//         </div>

//       </section>


//       <section
//         id="analytics"
//         className="section analytics"
//       >

//         <p className="section-tag">
//           03 / COMPETITIVE ARCHIVE
//         </p>

//         <h2>
//           EVERY MATCH.
//           <br />
//           <span>EVERY PLAYER.</span>
//         </h2>

//         <p>
//           Our tournament hub will track squad placements,
//           Booyahs, kill points and individual player performance —
//           including kills, damage, assists and match-by-match
//           breakdowns whenever verified data is available.
//         </p>

//         <div className="analytics-banner">

//           <BarChart3 size={26} />

//           <div>
//             <strong>
//               TOURNAMENT ANALYTICS
//             </strong>

//             <span>
//               Historical data and player-level dashboards are
//               coming in a later phase. No fictional stats.
//             </span>
//           </div>

//           <span className="coming">
//             COMING SOON
//           </span>

//         </div>

//       </section>


//       <footer>

//         <Brand />

//         <p>
//           Independent fan project. Not affiliated with Team Elite,
//           Orangutan, iQOO or Garena. All team marks belong to
//           their respective owners.
//         </p>

//         <a href="#home">
//           BACK TO TOP ↑
//         </a>

//       </footer>

//     </main>
//   );
// }
import PlayerProfile from "./pages/PlayerProfile";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useIdentity } from "./context/IdentityContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Roster from "./pages/Roster";
import Legacy from "./pages/Legacy";
import Pahadi from "./pages/Pahadi";
import Achievements from "./pages/Achievements";
import LiveArena from "./pages/LiveArena";
import Media from "./pages/Media";
import FanZone from "./pages/Fanzone";

export default function App() {
  const { identity } = useIdentity();

  return (
    <BrowserRouter>
      <main
        className="app"
        style={{
          "--accent": identity.primary,
          "--deep": identity.deep,
          "--glow": identity.glow,
        }}
      >
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/legacy" element={<Legacy />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/pahadi" element={<Pahadi />} />
          <Route
            path="/achievements"
            element={<Achievements />}
          />
          <Route path="/live" element={<LiveArena />} />
          <Route path="/players/:slug" element={<PlayerProfile />} />
          <Route path="/media" element={<Media />} />
          <Route path="/fans" element={<FanZone />} />
        </Routes>

        <Footer />
      </main>
    </BrowserRouter>
  );
}

