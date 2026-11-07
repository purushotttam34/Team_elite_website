// src/pages/PlayerProfile.jsx
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Trophy,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { players } from "../data/players";

export default function PlayerProfile() {
  const { slug } = useParams();

  const player = players.find((item) => item.slug === slug);
  const [imageError, setImageError] = useState(false);

  // Show a friendly message for an unknown player URL.
  if (!player) {
    return (
      <section className="section player-not-found">
        <p className="section-tag">PLAYER ARCHIVE / 404</p>
        <h2>PLAYER NOT <span>FOUND.</span></h2>
        <p className="page-description">
          This profile doesn't exist in the current archive.
        </p>
        <Link to="/roster" className="primary-btn">
          <ArrowLeft size={17} />
          BACK TO ROSTER
        </Link>
      </section>
    );
  }

  return (
    <div className="player-profile-page">
      <section className={`section player-profile-hero era-${player.era}`}>
        <Link to="/roster" className="player-back-link">
          <ArrowLeft size={17} />
          BACK TO PLAYER ARCHIVE
        </Link>

        <div className="player-profile-layout">
          <div className="player-profile-portrait">
            {!imageError && player.image ? (
              <img
                src={player.image}
                alt={`${player.name} portrait`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="player-profile-placeholder">
                <UserRound size={100} strokeWidth={1} />
                <span>{player.name}</span>
              </div>
            )}
          </div>

          <div className="player-profile-info">
            <p className="section-tag">
              PLAYER ARCHIVE / {player.era.toUpperCase()}
            </p>

            <p className="player-profile-status">{player.status}</p>

            <h1>{player.name}</h1>

            {player.realName && (
              <p className="player-real-name">{player.realName}</p>
            )}

            <p className="player-profile-role">{player.role}</p>

            <p className="player-profile-bio">{player.bio}</p>

            <div className="player-profile-tags">
              {player.teams.map((team) => (
                <span key={team}>{team}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section player-profile-details">
        <p className="section-tag">CAREER ARCHIVE</p>
        <h2>THE <span>JOURNEY.</span></h2>

        <div className="player-detail-grid">
          <article className="player-detail-card">
            <Users size={25} />
            <h3>TEAM HISTORY</h3>

            {player.teams.length > 0 ? (
              <ul>
                {player.teams.map((team) => (
                  <li key={team}>{team}</li>
                ))}
              </ul>
            ) : (
              <p>No verified team history has been added yet.</p>
            )}
          </article>

          <article className="player-detail-card">
            <Trophy size={25} />
            <h3>ACHIEVEMENTS</h3>

            {player.achievements.length > 0 ? (
              <ul>
                {player.achievements.map((achievement, index) => (
                  <li key={`${achievement}-${index}`}>
                    {achievement}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Achievements will appear here when verified records
                are added to the player data.
              </p>
            )}
          </article>
        </div>

        <div className="player-verification-note">
          <ShieldCheck size={20} />
          <p>
            This is an unofficial fan archive. Biographical details,
            team associations, and achievements should be checked
            against reliable sources before being presented as confirmed.
          </p>
        </div>

        <Link to="/roster" className="secondary-btn">
          <ArrowLeft size={17} />
          RETURN TO ALL PLAYERS
        </Link>
      </section>
    </div>
  );
}