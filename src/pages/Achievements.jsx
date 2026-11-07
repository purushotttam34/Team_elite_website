
import React, { useState } from "react";
import { motion } from "motion/react";

import {
  Trophy,
  Medal,
  Globe2,
  CalendarDays,
} from "lucide-react";

import { achievements } from "../data/achievements";

export default function Achievements() {
  const [year, setYear] = useState("all");
  const [team, setTeam] = useState("all");

  const years = [
    "all",
    ...new Set(achievements.map((item) => item.year)),
  ];

  const teams = [
    "all",
    ...new Set(achievements.map((item) => item.team)),
  ];

  const filtered = achievements.filter((item) => {
    const yearMatch =
      year === "all" || item.year === Number(year);

    const teamMatch =
      team === "all" || item.team === team;

    return yearMatch && teamMatch;
  });

  const championships = achievements.filter(
    (item) => item.rank === 1
  );

  const podiums = achievements.filter(
    (item) => item.rank <= 3
  );

  const international = achievements.filter(
    (item) => item.type === "International"
  );

  return (
    <div className="achievements-page">
      {/* HERO */}
      <section className="section achievements-hero">
        <p className="section-tag">
          01 / THE TROPHY CABINET
        </p>

        <h2>
          BUILT THROUGH
          <br />
          <span>VICTORY.</span>
        </h2>

        <p className="page-description">
          From national championships to international
          competition, explore the tournament results
          recorded across the Elite player legacy.
        </p>

        <div className="achievement-stat-grid">
          <div>
            <Trophy size={26} />
            <strong>{championships.length}</strong>
            <span>RECORDED TITLES</span>
          </div>

          <div>
            <Medal size={26} />
            <strong>{podiums.length}</strong>
            <span>TOP-THREE RESULTS</span>
          </div>

          <div>
            <Globe2 size={26} />
            <strong>{international.length}</strong>
            <span>INTERNATIONAL RESULTS</span>
          </div>

          <div>
            <CalendarDays size={26} />
            <strong>{achievements.length}</strong>
            <span>RESULTS IN ARCHIVE</span>
          </div>
        </div>
      </section>

      {/* CHAMPIONSHIPS */}
      <section className="section">
        <p className="section-tag">
          02 / CHAMPIONSHIP MOMENTS
        </p>

        <h2>
          THE <span>CHAMPIONS.</span>
        </h2>

        <div className="championship-grid">
          {championships.map((item) => (
            <motion.article
              key={item.id}
              className={`championship-card era-${item.era}`}
              whileHover={{ y: -7 }}
            >
              <Trophy size={30} />

              <span>{item.date}</span>

              <h3>{item.tournament}</h3>

              <p>{item.team}</p>

              <strong>CHAMPIONS</strong>
            </motion.article>
          ))}
        </div>
      </section>

      {/* RESULTS ARCHIVE */}
      <section className="section">
        <p className="section-tag">
          03 / COMPETITIVE HISTORY
        </p>

        <h2>
          TOURNAMENT <span>RESULTS.</span>
        </h2>

        <div className="achievement-filters">
          <label>
            YEAR
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All Years" : item}
                </option>
              ))}
            </select>
          </label>

          <label>
            TEAM
            <select
              value={team}
              onChange={(event) => setTeam(event.target.value)}
            >
              {teams.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All Teams" : item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="achievement-results">
          {filtered.length === 0 ? (
            <p>No results found for these filters.</p>
          ) : (
            filtered.map((item) => (
              <motion.article
                key={item.id}
                className={`achievement-result-card era-${item.era}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="achievement-result-icon">
                  {item.rank === 1 ? (
                    <Trophy size={25} />
                  ) : (
                    <Medal size={25} />
                  )}
                </div>

                <div className="achievement-result-info">
                  <span>{item.date} · {item.team}</span>
                  <h3>{item.tournament}</h3>
                  <p>{item.type}</p>
                </div>

                <strong
                  className={
                    item.rank === 1
                      ? "achievement-rank champion"
                      : "achievement-rank"
                  }
                >
                  {item.result}
                </strong>
              </motion.article>
            ))
          )}
        </div>

        <p className="achievement-source-note">
          Historical working archive. Results and dates
          should be checked against original tournament
          records before being marked as verified.
        </p>
      </section>
    </div>
  );
}
