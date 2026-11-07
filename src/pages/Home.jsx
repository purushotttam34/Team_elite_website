
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";

import {
  ArrowDownRight,
  ArrowUpRight,
  Trophy,
  Users,
  History,
  Radio,
  Images,
  Heart,
  BarChart3,
} from "lucide-react";

import { useIdentity } from "../context/IdentityContext";
import PhotoStage from "../components/PhotoStage";

const pages = [
  {
    name: "Our Legacy",
    icon: History,
    desc: "The complete journey through every era.",
    path: "/legacy",
  },
  {
    name: "Roster",
    icon: Users,
    desc: "Players, legends, and their stories.",
    path: "/roster",
  },
  {
    name: "Achievements",
    icon: Trophy,
    desc: "Trophies, match results, and tournament analytics.",
    path: "/achievements",
  },
  {
    name: "Live Arena",
    icon: Radio,
    desc: "Tournament coverage and live updates.",
    path: "/live",
  },
  {
    name: "Media",
    icon: Images,
    desc: "Highlights, photographs, and jersey evolution.",
    path: "/media",
  },
  {
    name: "Fan Zone",
    icon: Heart,
    desc: "Quizzes, voting, and fan creations.",
    path: "/fans",
  },
];

export default function Home() {
  const { mode, identity } = useIdentity();

  return (
    <>
      {/* CINEMATIC HERO */}
      <section id="home" className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse" />
            UNOFFICIAL FREE FIRE FAN TRIBUTE
            <span className="eyebrow-line" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.42 }}
            >
              <p className="hero-kicker">
                {identity.eyebrow}
              </p>

              <h1>
                {mode === "te" ? (
                  <>
                    TEAM
                    <br />
                    <em>ELITE.</em>
                  </>
                ) : (
                  <>
                    OG
                    <br />
                    <em>ELITE.</em>
                  </>
                )}
              </h1>

              <p className="slogan">
                {identity.slogan}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="hero-description">
            One team. Countless moments. Explore the players,
            tournaments and unforgettable story behind the
            Elite legacy.
          </p>

          <div className="hero-buttons">
            <Link className="primary-btn" to="/legacy">
              EXPLORE THE LEGACY
              <ArrowUpRight size={17} />
            </Link>

            <Link className="secondary-btn" to="/pahadi">
              PAHADI'S STORY
              <ArrowDownRight size={17} />
            </Link>
          </div>

          <div className="hero-footnote">
            <span>01 / 02</span>
            <span>
              SWITCH IDENTITIES ABOVE TO EXPERIENCE BOTH ERAS
            </span>
          </div>
        </div>

        <PhotoStage />

        <div className="vertical-label">
          BUILT BY A FAN · FOR THE FANS
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <span>THE LEGACY LIVES ON</span>
        <span>✦</span>
        <span>TEAM ELITE</span>
        <span>✦</span>
        <span>OG ELITE</span>
        <span>✦</span>
        <span>FREE FIRE ESPORTS</span>
      </div>

      {/* LEGACY INTRO */}
      <section id="legacy" className="intro section">
        <p className="section-tag">01 / THE STORY</p>

        <h2>
          MORE THAN A TEAM.
          <br />
          <span>A LEGACY.</span>
        </h2>

        <p>
          From the original Team Elite identity to the
          Orangutan chapter, this fan archive will preserve
          the stories, player journeys, iconic matches and
          moments that matter. Historical entries will be
          added after source verification.
        </p>
      </section>

      {/* FEATURE CARDS */}
      <section id="explore" className="section explore">
        <div className="section-heading">
          <div>
            <p className="section-tag">02 / DISCOVER</p>

            <h2>
              EXPLORE THE <span>ELITE.</span>
            </h2>
          </div>

          <p>Six destinations. One unforgettable journey.</p>
        </div>

        <div className="feature-grid">
          {pages.map((page, index) => {
            const Icon = page.icon;

            return (
              <Link
                className="feature-card"
                to={page.path}
                key={page.name}
              >
                <div className="feature-top">
                  <Icon size={26} strokeWidth={1.5} />
                  <span>0{index + 1}</span>
                </div>

                <div>
                  <h3>{page.name}</h3>
                  <p>{page.desc}</p>
                </div>

                <ArrowUpRight
                  className="feature-arrow"
                  size={20}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}
      <section id="analytics" className="section analytics">
        <p className="section-tag">
          03 / COMPETITIVE ARCHIVE
        </p>

        <h2>
          EVERY MATCH.
          <br />
          <span>EVERY PLAYER.</span>
        </h2>

        <p>
          Our tournament hub will track squad placements,
          Booyahs, kill points and individual player
          performance — including kills, damage, assists
          and match-by-match breakdowns whenever verified
          data is available.
        </p>

        <div className="analytics-banner">
          <BarChart3 size={26} />

          <div>
            <strong>TOURNAMENT ANALYTICS</strong>

            <span>
              Historical data and player-level dashboards
              are coming in a later phase. No fictional stats.
            </span>
          </div>

          <span className="coming">
            COMING SOON
          </span>
        </div>
      </section>
    </>
  );
}
