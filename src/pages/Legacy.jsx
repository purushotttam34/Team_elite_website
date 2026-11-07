
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

import {
  History,
  Trophy,
  Users,
  Star,
  ChevronDown,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

import { timeline, hallOfFame } from "../data/timeline";

const filters = [
  { label: "ALL ERAS", value: "all" },
  { label: "CRITICALX / S8UL", value: "early" },
  { label: "TEAM ELITE", value: "te" },
  { label: "ORANGUTAN ELITE", value: "og" },
];

export default function Legacy() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filteredEvents = timeline.filter(
    (event) => filter === "all" || event.era === filter
  );

  return (
    <div className="legacy-page">
      {/* INTRODUCTION */}
      <section className="section legacy-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">
            01 / THE ELITE ARCHIVE
          </p>

          <h2>
            FROM THE ORIGINS
            <br />
            TO THE <span>LEGACY.</span>
          </h2>

          <p className="legacy-description">
            From CriticalX Elite in 2020 to Orangutan x Elite
            in 2026, explore the competitive journey of the
            players and identities that shaped the Elite legacy.
          </p>

          <div className="legacy-hero-stats">
            <div>
              <strong>2020–2026</strong>
              <span>HISTORY COVERED</span>
            </div>

            <div>
              <strong>{timeline.length}</strong>
              <span>MILESTONES</span>
            </div>

            <div>
              <strong>4</strong>
              <span>LEGACY CHAPTERS</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="legacy-section-heading">
          <div>
            <p className="section-tag">
              02 / JOURNEY THROUGH THE ERAS
            </p>

            <h2>
              THE <span>TIMELINE.</span>
            </h2>
          </div>

          <History size={32} />
        </div>

        <div className="legacy-filter-bar">
          {filters.map((item) => (
            <button
              key={item.value}
              className={filter === item.value ? "active" : ""}
              onClick={() => {
                setFilter(item.value);
                setExpanded(null);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="legacy-history">
          {filteredEvents.map((event, index) => {
            const isExpanded = expanded === event.id;

            return (
              <motion.article
                key={event.id}
                className={`legacy-history-item era-${event.era}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(index * 0.03, 0.2),
                }}
              >
                <div className="legacy-history-dot" />

                <div className="legacy-history-card">
                  <div className="legacy-history-meta">
                    <span>
                      <CalendarDays size={14} />
                      {event.date}
                    </span>

                    <span>{event.team}</span>
                  </div>

                  <div className="legacy-history-category">
                    {event.category === "Championship" ? (
                      <Trophy size={15} />
                    ) : event.category === "Roster" ? (
                      <Users size={15} />
                    ) : (
                      <Star size={15} />
                    )}

                    {event.category}
                  </div>

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <button
                    className="legacy-read-more"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpanded(isExpanded ? null : event.id)
                    }
                  >
                    {isExpanded ? "SHOW LESS" : "EXPLORE MILESTONE"}

                    <ChevronDown
                      size={17}
                      className={isExpanded ? "rotate" : ""}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="legacy-history-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{event.details}</p>
                        <small>
                          Historical working draft — source verification
                          pending.
                        </small>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* HALL OF FAME */}
      <section className="section legacy-hall">
        <p className="section-tag">
          03 / THE IMMORTAL MOMENTS
        </p>

        <h2>
          HALL OF <span>FAME.</span>
        </h2>

        <p className="legacy-description">
          The players, achievements, and moments that define
          the Elite story.
        </p>

        <div className="legacy-hall-grid">
          {hallOfFame.map((item) => (
            <motion.article
              key={item.id}
              className={`legacy-hall-card era-${item.era}`}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="legacy-hall-image">
                <img src={item.image} alt={item.title} loading="lazy" />
                <span>{item.year}</span>
              </div>

              <div className="legacy-hall-content">
                <p>{item.subtitle}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* NEXT PAGE */}
      <section className="section legacy-next">
        <p className="section-tag">
          04 / THE TROPHY CABINET
        </p>

        <h2>
          EVERY VICTORY.
          <br />
          <span>EVERY ACHIEVEMENT.</span>
        </h2>

        <p>
          Explore championships, podium finishes, and
          international tournament results.
        </p>

        <Link to="/achievements" className="primary-btn">
          VIEW ACHIEVEMENTS
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  );
}
