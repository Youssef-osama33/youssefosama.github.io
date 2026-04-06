import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { profile } from "../data/portfolio";

const LINKS = [
  { to: "/",         label: "Home"     },
  { to: "/projects", label: "Projects" },
  { to: "/writing",  label: "Writing"  },
  { to: "/about",    label: "About"    },
];

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(13,13,13,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
        height: "57px",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 8,
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 15,
          fontStyle: "italic",
          color: "var(--accent)",
          marginRight: 16,
          letterSpacing: "-0.01em",
          flexShrink: 0,
        }}
      >
        {profile.name.first[0]}{profile.name.last[0]}
      </span>

      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-1">
        {LINKS.map(({ to, label }) => {
          const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              style={{
                position: "relative",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                padding: "5px 14px",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${isActive ? "var(--accent)" : "transparent"}`,
                background: isActive ? "var(--accent-dim)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--muted)",
                textDecoration: "none",
                transition: "all var(--transition)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                }
              }}
            >
              {label}
            </NavLink>
          );
        })}
      </nav>

      {/* Right: hint + mobile menu */}
      <div className="ml-auto flex items-center gap-3">
        <span
          className="hidden md:block"
          style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.08em" }}
        >
          ⌘K — command
        </span>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 18, height: 1.5,
                background: menuOpen && i === 1 ? "transparent" : "var(--muted)",
                borderRadius: 1,
                transform: menuOpen
                  ? i === 0 ? "translateY(5px) rotate(45deg)"
                  : i === 2 ? "translateY(-5px) rotate(-45deg)"
                  : "none"
                  : "none",
                transition: "all 0.2s",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "57px", left: 0, right: 0,
              background: "var(--surface)",
              borderBottom: "1px solid var(--border)",
              padding: "12px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  padding: "10px 12px",
                  color: isActive ? "var(--accent)" : "var(--text-2)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-sm)",
                  background: isActive ? "var(--accent-dim)" : "transparent",
                  letterSpacing: "0.04em",
                })}
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
