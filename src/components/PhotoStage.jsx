
import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIdentity } from "../context/IdentityContext";

// Authentic roster photographs for both identities
const photos = {
  te: "/assets/team-photos/team-elite.jpeg",
  og: "/assets/team-photos/orangutan-elite.jpeg",
};

export default function PhotoStage() {
  // Read the selected website identity
  const { mode } = useIdentity();

  // Track whether either photograph fails to load
  const [missing, setMissing] = useState({});

  // Respect the visitor's reduced-motion preference
  const reduceMotion = useReducedMotion();

  // Use a smooth transition between the two photographs
  const duration = reduceMotion ? 0 : 1.1;

  return (
    <div className="photo-stage">

      {/* TEAM ELITE: Blue jersey photograph */}
      <motion.div
        className="photo-layer"
        initial={false}
        animate={{ opacity: mode === "te" ? 1 : 0 }}
        transition={{ duration, ease: "easeInOut" }}
        style={{ zIndex: mode === "te" ? 2 : 1 }}
        aria-hidden={mode !== "te"}
      >
        {!missing.te ? (
          <img
            src={photos.te}
            alt="Team Elite roster wearing blue jerseys"
            onError={() =>
              setMissing(prev => ({ ...prev, te: true }))
            }
          />
        ) : (
          <div className="photo-placeholder">
            TEAM ELITE PHOTO NOT FOUND
          </div>
        )}
      </motion.div>

      {/* ORANGUTAN ELITE: Black jersey photograph */}
      <motion.div
        className="photo-layer"
        initial={false}
        animate={{ opacity: mode === "og" ? 1 : 0 }}
        transition={{ duration, ease: "easeInOut" }}
        style={{ zIndex: mode === "og" ? 2 : 1 }}
        aria-hidden={mode !== "og"}
      >
        {!missing.og ? (
          <img
            src={photos.og}
            alt="Orangutan Elite roster wearing black jerseys"
            onError={() =>
              setMissing(prev => ({ ...prev, og: true }))
            }
          />
        ) : (
          <div className="photo-placeholder">
            ORANGUTAN ELITE PHOTO NOT FOUND
          </div>
        )}
      </motion.div>

      {/* Cinematic overlays remain above both photographs */}
      <div className="photo-fade" />
      <div className="photo-scan" />

    </div>
  );
}
