// src/pages/Roster.jsx
import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Users, ArrowRight, Search, Archive } from "lucide-react";
import { Link } from "react-router-dom";
import { players } from "../data/players";
import PlayerCard from "../components/PlayerCard";

// Preserve the roster history from your existing page.
const rosterHistory = [
  {
    year: "2020",
    team: "CriticalX Elite",
    era: "early",
    players: ["PAHADI", "JONTY", "ICONIC", "KILLER", "TANEJA"],
    note: "The early competitive core.",
  },
  {
    year: "2021",
    team: "Team Elite",
    era: "te",
    players: ["PAHADI", "JONTY", "ICONIC", "KILLER", "RDP"],
    note: "The historic Team Elite lineup.",
  },
  {
    year: "2022",
    team: "Orangutan Elite",
    era: "og",
    players: ["MR. JAY", "TANEJA", "OLDMONK", "PAHADI"],
    note: "Documented additions during the 2022 rebuild; not the complete roster.",
  },
  {
    year: "2025",
    team: "S8UL Elite early period",
    era: "te",
    players: ["PAHADI", "ARMAN", "ADEEB", "HASAN", "MR. JAY"],
    note: "Players named in the 2025 rebuilding period.",
  },
  {
    year: "2025",
    team: "S8UL Elite later period",
    era: "te",
    players: ["PAHADI", "WOTA", "SOHAN", "RONITH", "MR. JAY"],
    note: "Players named in the 2025 rebuilding period.",
  },
  {
    year: "2026",
    team: "Team Elite X Orangutan",
    era: "og",
    players: ["PAHADI", "MR. JAY", "CROPSE", "AMIN", "SOUL", "JOHAN"],
    note: "Players mentioned across the 2026 return and later additions; not a confirmed simultaneous lineup.",
  },
];

const eraOptions = [
  { label: "ALL PLAYERS", value: "all" },
  { label: "ORANGUTAN ERA", value: "og" },
];

export default function Roster() {
  const [search, setSearch] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");

  // Filter the directory by player name, team, role, or era.
const filteredPlayers = useMemo(() => {
  const query = search.trim().toLowerCase();

  return players.filter((player) => {
    const matchesEra =
      selectedEra === "all" || player.era === selectedEra;

    const searchableText = [
      player.name,
      player.realName,
      player.role,
      ...player.teams,
    ]
      .join(" ")
      .toLowerCase();

    return matchesEra && searchableText.includes(query);
  });
}, [search, selectedEra]);

  return (
    <div className="roster-page">
      {/* PLAYER DIRECTORY */}
      <section className="section roster-directory">
        <p className="section-tag">01 / THE PLAYERS</p>

        <h2>
          THE PEOPLE BEHIND
          <br />
          <span>THE LEGACY.</span>
        </h2>
        {/* CURRENT PLAYING ROSTER — ADMIN SELECTED */}
<section className="section current-roster-section">
  <p className="section-tag">01 / ACTIVE LINEUP</p>

  <h2>
    CURRENT PLAYING <span>ROSTER.</span>
  </h2>

  <p className="page-description">
    Meet the players selected for the current lineup.
  </p>

  <div className="player-grid">
    {players
      .filter((player) => player.currentRoster === true)
      .map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
  </div>

  {players.filter((player) => player.currentRoster === true).length === 0 && (
    <div className="roster-empty">
      <Users size={32} />
      <h3>ROSTER COMING SOON</h3>
      <p>
        The current playing roster will appear here when selected by the admin.
      </p>
    </div>
  )}
</section>

        <p className="page-description">
          Explore the players featured in the Team Elite archive
          across different generations, eras, and organizations.
          Select a player to explore their individual profile.
        </p>

        {/* Search box */}
        <div className="roster-search">
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search players or teams..."
            aria-label="Search players or teams"
          />
        </div>

        {/* Era filters */}
        <div className="roster-filter-bar" aria-label="Filter players by era">
          {eraOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={selectedEra === option.value ? "active" : ""}
              onClick={() => setSelectedEra(option.value)}
              aria-pressed={selectedEra === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="roster-directory-heading">
          <div>
            <p className="section-tag">PLAYER ARCHIVE</p>
            <h3>MEET THE <span>PLAYERS.</span></h3>
          </div>

          <span className="roster-player-count">
            {filteredPlayers.length}{" "}
            {filteredPlayers.length === 1 ? "PLAYER" : "PLAYERS"}
          </span>
        </div>

        {/* Player cards */}
        {filteredPlayers.length > 0 ? (
          <div className="player-grid">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="roster-empty">
            <Search size={32} />
            <h3>NO PLAYERS FOUND</h3>
            <p>Try another name or choose a different era.</p>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                setSearch("");
                setSelectedEra("all");
              }}
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </section>

      {/* HISTORICAL ROSTER EVOLUTION — ORIGINAL SECTION PRESERVED */}
      <section className="section roster-history-section">
        <p className="section-tag">02 / ROSTER EVOLUTION</p>

        <h2>
          GENERATIONS OF <span>ELITE.</span>
        </h2>

        <p className="page-description">
          Browse the lineup notes preserved in the archive.
          Historical records may represent different periods rather
          than one simultaneous roster.
        </p>

        <div className="roster-history-grid">
          {rosterHistory.map((roster) => (
            <motion.article
              key={`${roster.year}-${roster.team}`}
              className={`roster-history-card era-${roster.era}`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <div className="roster-history-top">
                <Users size={24} />
                <span>{roster.year}</span>
              </div>

              <h3>{roster.team}</h3>

              <div className="roster-player-list">
                {roster.players.map((player) => (
                  <span key={player}>{player}</span>
                ))}
              </div>

              <p>{roster.note}</p>
            </motion.article>
          ))}
        </div>

        <Link to="/pahadi" className="primary-btn">
          EXPLORE PAHADI'S LEGACY
          <ArrowRight size={17} />
        </Link>
      </section>

      {/* Archive note */}
      <section className="section roster-archive-note">
        <Archive size={24} />
        <p>
          This is an unofficial fan archive. Player appearances in
          historical notes do not by themselves establish an official
          roster, tournament result, or achievement.
        </p>
      </section>
    </div>
  );
}