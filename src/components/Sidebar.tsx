import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

const LINKS = [
  { label: "GitHub", href: profile.links.github,   icon: "⎇" },
  { label: "Apex4U", href: profile.links.blog,     icon: "✐" },
  { label: "LinkedIn", href: profile.links.linkedin, icon: "⌘" },
  { label: "Email",  href: `mailto:${profile.links.email}`, icon: "✉" },
  { label: "CV / Resume", href: profile.links.cv,   icon: "↓" },
];

export function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-8 shrink-0"
      style={{
        width: "260px",
        borderRight: "1px solid var(--border)",
        padding: "48px 32px",
        position: "sticky",
        top: "57px",                  // below navbar
        height: "calc(100vh - 57px)",
        overflowY: "auto",
      }}
    >
      {/* Avatar + name */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Avatar ring */}
        <div
          className="mb-5"
          style={{
            width: 68, height: 68,
            borderRadius: "50%",
            border: "1.5px solid var(--accent)",
            padding: 3,
          }}
        >
          <div
            style={{
              width: "100%", height: "100%",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e1812, #111)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontSize: 26, fontStyle: "italic",
              color: "var(--accent)",
            }}
          >
            Y
          </div>
        </div>

        <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 300, marginBottom: 6 }}>
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>{profile.name.first}</em>{" "}
          {profile.name.last}
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", lineHeight: 1.8, letterSpacing: "0.03em" }}>
          {profile.roles.join(" · ")}<br />
          {profile.location}
          {profile.available && (
            <>
              {" "}<span className="pulse-dot" title="Available for work" />
            </>
          )}
        </div>
      </motion.div>

      <div className="divider" />

      {/* Interests */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div
          className="label-tag mb-3"
          style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}
        >
          Interests
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.interests.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                padding: "3px 8px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="divider" />

      {/* Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <div
          style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}
        >
          Links
        </div>
        <ul className="flex flex-col gap-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors group"
                style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                <span style={{ opacity: 0.6, minWidth: 14, fontSize: 12 }}>{l.icon}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </aside>
  );
}
