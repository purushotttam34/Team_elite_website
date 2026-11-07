
import React from "react";
import { Radio, CalendarDays } from "lucide-react";

export default function LiveArena() {
  return (
    <section className="section">
      <p className="section-tag">05 / TOURNAMENT COVERAGE</p>

      <h2>
        LIVE <span>ARENA.</span>
      </h2>

      <p className="page-description">
        Follow upcoming tournaments, match schedules,
        results, standings, and official broadcasts.
      </p>

      <div className="analytics-banner">
        <Radio size={28} />
        <div>
          <strong>LIVE TOURNAMENT UPDATES</strong>
          <span>
            Real-time tournament data is not connected yet.
          </span>
        </div>
        <span className="coming">COMING SOON</span>
      </div>

      <div className="analytics-banner">
        <CalendarDays size={28} />
        <div>
          <strong>UPCOMING MATCHES</strong>
          <span>
            Verified match schedules and tournament
            information will appear here.
          </span>
        </div>
        <span className="coming">COMING SOON</span>
      </div>
    </section>
  );
}
