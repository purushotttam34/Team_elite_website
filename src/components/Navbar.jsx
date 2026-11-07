
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { useIdentity } from "../context/IdentityContext";
import IdentitySwitcher from "./IdentitySwitcher";

export function Brand() {
  const { mode, identity } = useIdentity();
  const [broken, setBroken] = useState({});

  return (
    <div className="brand-mark">
      {!broken[mode] ? (
        <img
          src={identity.logo}
          alt={`${identity.name} logo`}
          onError={() =>
            setBroken((previous) => ({
              ...previous,
              [mode]: true,
            }))
          }
        />
      ) : (
        <span className="brand-placeholder">
          {mode === "te" ? "TE" : "OG"}
        </span>
      )}

      <span>
        <strong>ELITE</strong>
        <small>THE LEGACY PROJECT</small>
      </span>
    </div>
  );
}

const navigation = [
  { name: "HOME", path: "/" },
  { name: "ROSTER", path: "/roster" },
  { name: "LIVE ARENA", path: "/live" },
  { name: "ACHIEVEMENTS", path: "/achievements" },
  { name: "OUR LEGACY", path: "/legacy" },
  { name: "PAHADI", path: "/pahadi" },
  { name: "FAN ZONE", path: "/fans" },
  { name: "MEDIA", path: "/media" },
];

export default function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="topbar">
      <Link
        to="/"
        className="brand-link"
        aria-label="Home"
        onClick={() => setMenu(false)}
      >
        <Brand />
      </Link>

      <nav
        className={menu ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMenu(false)}
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="top-actions">
        <IdentitySwitcher />

        <button
          className="menu-button"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
