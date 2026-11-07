
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Crown,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { players } from "../data/players";

export default function Pahadi() {
  const pahadi = players.find((player) => player.slug === "pahadi");

  if (!pahadi) {
    return (
      <section className="section pahadi-page">
        <p className="section-tag">03 / PLAYER SPOTLIGHT</p>
        <h2>PLAYER <span>NOT FOUND.</span></h2>
        <p className="page-description">
          Pahadi's profile could not be found in the player database.
        </p>
        <Link to="/roster" className="primary-btn">
          RETURN TO ROSTER
          <ArrowUpRight size={17} />
        </Link>
      </section>
    );
  }

  return (
    <main className="pahadi-page">
      {/* Hero */}
      <section className="pahadi-hero">
        <div className="pahadi-hero-content">
          <Link to="/roster" className="pahadi-back-link">
            <ArrowLeft size={16} />
            BACK TO ROSTER
          </Link>

          <p className="section-tag">03 / PLAYER SPOTLIGHT</p>

          <p className="pahadi-eyebrow">
            THE ELITE LEGACY PROJECT
          </p>

          <h1>
            {pahadi.name}
            <span> THE LEGEND.</span>
          </h1>

          <p className="pahadi-intro">
            A dedicated tribute to Pahadi and his place in
            the Team Elite story. Explore his player profile,
            team history and recorded achievements.
          </p>

          <div className="pahadi-hero-actions">
            <Link
              to={`/players/${pahadi.slug}`}
              className="primary-btn"
            >
              FULL PLAYER PROFILE
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/achievements" className="pahadi-secondary-btn">
              EXPLORE ACHIEVEMENTS
            </Link>
          </div>
        </div>

        <div className="pahadi-portrait">
          <div className="pahadi-portrait-glow" />

          <div className="pahadi-portrait-frame">
            <img
              src={pahadi.image}
              alt={`${pahadi.name} player portrait`}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="pahadi-portrait-fallback">
              <Crown size={42} />
              <span>{pahadi.name}</span>
              <small>ELITE LEGACY</small>
            </div>
          </div>

          <span className="pahadi-portrait-caption">
            PLAYER ARCHIVE / {pahadi.era.toUpperCase()}
          </span>
        </div>
      </section>

      {/* Player information */}
      <section className="pahadi-content-section">
        <div className="pahadi-section-heading">
          <p className="section-tag">01 / PLAYER PROFILE</p>
          <h2>
            THE PLAYER <span>BEHIND THE NAME.</span>
          </h2>
          <p className="page-description">
            Information displayed here comes from the existing
            player database and should be source-checked before
            publication.
          </p>
        </div>

        <div className="pahadi-info-grid">
          <article className="pahadi-info-card">
            <Users size={22} />
            <span>PLAYER NAME</span>
            <strong>{pahadi.name}</strong>
          </article>

          <article className="pahadi-info-card">
            <Shield size={22} />
            <span>PLAYING ROLE</span>
            <strong>{pahadi.role || "Not documented"}</strong>
          </article>

          <article className="pahadi-info-card">
            <Star size={22} />
            <span>PLAYER STATUS</span>
            <strong>{pahadi.status || "Not documented"}</strong>
          </article>

          <article className="pahadi-info-card">
            <Crown size={22} />
            <span>REAL NAME</span>
            <strong>{pahadi.realName || "Not documented"}</strong>
          </article>
        </div>

        <div className="pahadi-bio-panel">
          <div>
            <p className="section-tag">PLAYER BIOGRAPHY</p>
            <h3>THE STORY SO FAR.</h3>
          </div>

          <p>{pahadi.bio || "Biography coming soon."}</p>
        </div>
      </section>

      {/* Team history */}
      <section className="pahadi-content-section">
        <div className="pahadi-section-heading">
          <p className="section-tag">02 / TEAM HISTORY</p>
          <h2>
            THE TEAMS <span>AND ERAS.</span>
          </h2>
          <p className="page-description">
            Team associations recorded in the current archive.
            Their order and dates should be verified against
            reliable historical sources.
          </p>
        </div>

        <div className="pahadi-team-list">
          {pahadi.teams?.length > 0 ? (
            pahadi.teams.map((team, index) => (
              <div
                className="pahadi-team-item"
                key={`${team}-${index}`}
              >
                <span className="pahadi-team-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{team}</strong>

                <span className="pahadi-team-mark">ELITE ARCHIVE</span>
              </div>
            ))
          ) : (
            <p className="page-description">
              Team history has not been added yet.
            </p>
          )}
        </div>
      </section>

      {/* Achievements */}
      <section className="pahadi-content-section pahadi-achievements">
        <div className="pahadi-section-heading">
          <p className="section-tag">03 / COMPETITIVE RECORD</p>
          <h2>
            MOMENTS OF <span>GLORY.</span>
          </h2>
          <p className="page-description">
            Recorded achievements from the current player data.
            Results should be verified before being treated as
            an authoritative competitive record.
          </p>
        </div>

        <div className="pahadi-achievement-list">
          {pahadi.achievements?.length > 0 ? (
            pahadi.achievements.map((achievement, index) => (
              <article
                className="pahadi-achievement-card"
                key={`${achievement}-${index}`}
              >
                <div className="pahadi-award-icon">
                  <Award size={24} />
                </div>

                <div>
                  <span>
                    ACHIEVEMENT {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{achievement}</h3>
                </div>

                <Star size={18} className="pahadi-achievement-star" />
              </article>
            ))
          ) : (
            <p className="page-description">
              Verified achievements will be added to the archive.
            </p>
          )}
        </div>

        <div className="pahadi-source-note">
          <Shield size={18} />
          <p>
            This is an unofficial fan archive. Historical records
            are subject to verification and are not an official
            statement from the team or tournament organizers.
          </p>
        </div>

        <Link to="/roster" className="primary-btn">
          EXPLORE ALL PLAYERS
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </main>
  );
}
