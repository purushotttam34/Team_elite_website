
import React from "react";
import { Link } from "react-router-dom";
import { Brand } from "./Navbar";

export default function Footer() {
  return (
    <footer>
      <Brand />

      <p>
        Independent fan project. Not affiliated with Team Elite,
        Orangutan, iQOO or Garena. All team marks belong to
        their respective owners.
      </p>

      <Link to="/">BACK TO HOME ↑</Link>
    </footer>
  );
}
