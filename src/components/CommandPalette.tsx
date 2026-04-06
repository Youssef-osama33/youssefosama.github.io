import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Command {
  id: string;
  label: string;
  sublabel?: string;
  category: "Navigate" | "Pages" | "Links" | "Actions";
  icon: string;
  keywords?: string[];
  action: () => void;
}

// ── Component ──────────────────────────────────────────────────────────────────
export function CommandPalette() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef              = useRef<HTMLInputElement>(null);
  const navigate              = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      // Navigate
      { id: "home",     label: "Home",     sublabel: "Bio & featured work",  category: "Navigate", icon: "⌂", action: () => navigate("/"),        keywords: ["start", "top"] },
      { id: "projects", label: "Projects", sublabel: "All projects",          category: "Navigate", icon: "◈", action: () => navigate("/projects"), keywords: ["work", "portfolio"] },
      { id: "writing",  label: "Writing",  sublabel: "Articles & blog posts", category: "Navigate", icon: "✦", action: () => navigate("/writing"),  keywords: ["blog", "articles", "posts"] },
      { id: "about",    label: "About",    sublabel: "Timeline & skills",     category: "Navigate", icon: "◎", action: () => navigate("/about"),    keywords: ["bio", "timeline", "cv"] },
      // Links
      { id: "github",   label: "GitHub",   sublabel: "github.com/youssefLabs", category: "Links", icon: "⎇", action: () => window.open("https://github.com/youssefLabs", "_blank") },
      { id: "blog",     label: "Apex4U",   sublabel: "Technical blog",         category: "Links", icon: "✐", action: () => window.open("https://apex4u.blogspot.com", "_blank") },
      { id: "linkedin", label: "LinkedIn", sublabel: "Connect on LinkedIn",    category: "Links", icon: "⌘", action: () => window.open("https://linkedin.com/in/youssefosama", "_blank") },
      { id: "cv",       label: "Download CV", sublabel: "PDF",                 category: "Links", icon: "↓", action: () => window.open("/cv.pdf", "_blank"), keywords: ["resume"] },
      // Actions
      { id: "email",    label: "Send Email", sublabel: "hi@youssefosama.dev", category: "Actions", icon: "✉", action: () => window.open("mailto:hi@youssefosama.dev") },
      { id: "theme",    label: "Toggle Theme",                                 category: "Actions", icon: "◑", action: () => document.documentElement.classList.toggle("light"), keywords: ["dark", "light", "mode"] },
    ],
    [navigate]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.sublabel?.toLowerCase().includes(q) ||
        c.keywords?.some((k) => k.includes(q))
    );
  }, [query, commands]);

  const grouped = useMemo(() => {
    const map: Record<string, Command[]> = {};
    filtered.forEach((c) => {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    });
    return map;
  }, [filtered]);

  const flatList = useMemo(() => filtered, [filtered]);

  // Keyboard handler
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape")     { close(); return; }
      if (e.key === "ArrowDown")  { e.preventDefault(); setSelected((i) => Math.min(i + 1, flatList.length - 1)); }
      if (e.key === "ArrowUp")    { e.preventDefault(); setSelected((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && flatList[selected]) { flatList[selected].action(); close(); }
    },
    [open, flatList, selected, close]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const run = (cmd: Command) => { cmd.action(); close(); };

  return (
    <>
      {/* Trigger hint (bottom right) */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded border text-xs font-mono transition-all"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.05em",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
        aria-label="Open command palette"
      >
        <span>⌘K</span>
        <span style={{ opacity: 0.5 }}>command</span>
      </motion.button>

      {/* Palette modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9990] flex items-start justify-center"
            style={{ paddingTop: "18vh" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }} />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1,    y: 0   }}
              exit={{   opacity: 0, scale: 0.97, y: -12  }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full mx-4 rounded-lg overflow-hidden shadow-2xl"
              style={{
                maxWidth: "540px",
                background: "var(--surface)",
                border: "1px solid var(--border-hover)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search bar */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span style={{ color: "var(--muted)", fontSize: 14 }}>⌕</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text)" }}
                />
                <kbd
                  className="hidden sm:block text-[10px] px-2 py-0.5 rounded"
                  style={{ fontFamily: "var(--font-mono)", background: "var(--surface-2)", color: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="overflow-y-auto" style={{ maxHeight: "320px", padding: "6px" }}>
                {flatList.length === 0 ? (
                  <div className="py-10 text-center" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--muted)" }}>
                    No results
                  </div>
                ) : (
                  Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat} className="mb-1">
                      <div
                        className="px-3 py-1.5"
                        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}
                      >
                        {cat}
                      </div>
                      {items.map((cmd) => {
                        const idx = flatList.indexOf(cmd);
                        const isSelected = idx === selected;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => run(cmd)}
                            onMouseEnter={() => setSelected(idx)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-colors"
                            style={{
                              fontFamily: "var(--font-mono)",
                              background: isSelected ? "var(--accent-dim)" : "transparent",
                              borderLeft: isSelected ? "2px solid var(--accent)" : "2px solid transparent",
                              paddingLeft: isSelected ? "10px" : "12px",
                              transition: "all 0.12s",
                            }}
                          >
                            <span style={{ fontSize: 13, color: isSelected ? "var(--accent)" : "var(--muted)", minWidth: 18 }}>{cmd.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div style={{ fontSize: "12px", color: isSelected ? "var(--text)" : "var(--text-2)" }}>{cmd.label}</div>
                              {cmd.sublabel && (
                                <div style={{ fontSize: "10px", color: "var(--muted)", marginTop: 1 }}>{cmd.sublabel}</div>
                              )}
                            </div>
                            {isSelected && <span style={{ fontSize: 10, color: "var(--accent)" }}>↵</span>}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center gap-5 px-4 py-2.5"
                style={{ borderTop: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--muted)", letterSpacing: "0.05em" }}
              >
                {[["↑↓", "navigate"], ["↵", "select"], ["esc", "close"]].map(([key, label]) => (
                  <span key={key} className="flex items-center gap-1.5">
                    <kbd style={{ padding: "1px 5px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 3 }}>{key}</kbd>
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
