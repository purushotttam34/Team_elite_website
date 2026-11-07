// src/components/PlayerCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, UserRound } from "lucide-react";
import { motion } from "motion/react";

export default function PlayerCard({ player }) {
  // Hide the portrait if its image file is not available.
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      className={`player-card era-${player.era}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/players/${player.slug}`}
        className="player-card-link"
        aria-label={`View ${player.name}'s profile`}
      >
        <div className="player-card-image">
          {!imageError && player.image ? (
            <img
              src={player.image}
              alt={`${player.name} portrait`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="player-image-placeholder">
              <UserRound size={56} strokeWidth={1.2} />
              <span>{player.name}</span>
            </div>
          )}

          { <span className="player-era-label">
            {player.era === "early"
              ? "EARLY ERA"
              : player.era === "te"
                ? "TEAM ELITE"
                : "ORANGUTAN ERA"}
          </span> }

          <span className="player-card-arrow">
            <ArrowUpRight size={21} />
          </span>
        </div>

        <div className="player-card-content">
          <p className="player-card-status">{player.status}</p>
          <h3>{player.name}</h3>
          <p className="player-card-role">{player.role}</p>

          <div className="player-team-tags">
            {player.teams.slice(0, 2).map((team) => (
              <span key={team}>{team}</span>
            ))}
            {player.teams.length > 2 && (
              <span>+{player.teams.length - 2}</span>
            )}
          </div>

          <div className="player-card-footer">
            <span>VIEW PROFILE</span>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}