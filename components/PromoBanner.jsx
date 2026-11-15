import { useState, useEffect } from "react";

// ── Edit promo slides here ────────────────────────────────────────────
// Each slide: { text, href }. Add, remove, or reorder freely.
export const PROMO_SLIDES = [
  { text: "Feeling stuck? Try a quick ADHD reset →", href: "https://fieldnotessupply.etsy.com/listing/4526355096" },
  { text: "Need a break? Ask Bigfoot anything →", href: "https://askacryptid.com" },
  { text: "Printables & cryptid art on Etsy →", href: "https://fieldnotessupply.etsy.com" },
];

const PROMO_LABEL = "You might also like";
const ROTATE_MS = 6000;
const FADE_MS = 400;

const COLORS = {
  card: "#1a1a1a",
  border: "#2a2a2a",
  accent: "#e8ff47",
  text: "#f0ede8",
  muted: "#888",
};

const styles = {
  wrap: {
    width: "100%",
    maxWidth: "480px",
    marginTop: "32px",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "16px 18px",
    boxSizing: "border-box",
  },
  label: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.2em",
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  link: {
    display: "block",
    fontFamily: "'DM Serif Display', 'Georgia', serif",
    fontSize: "clamp(17px, 4.5vw, 20px)",
    lineHeight: 1.3,
    color: COLORS.text,
    textDecoration: "none",
    minHeight: "2.6em", // reserve two lines so wrapping on mobile doesn't jump
    transition: `opacity ${FADE_MS}ms ease, color 0.2s ease`,
  },
  dots: {
    display: "flex",
    gap: "6px",
    marginTop: "10px",
  },
  dot: (active) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    border: "none",
    padding: 0,
    cursor: "pointer",
    background: active ? COLORS.accent : COLORS.border,
    transition: "background 0.3s ease",
  }),
};

export default function PromoBanner({ slides = PROMO_SLIDES }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    let fadeTimer;
    const interval = setInterval(() => {
      setVisible(false);
      fadeTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
    };
  }, [slides.length, paused]);

  if (!slides.length) return null;
  const slide = slides[index];

  return (
    <aside
      style={styles.wrap}
      aria-label={PROMO_LABEL}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div style={styles.label}>{PROMO_LABEL}</div>
      <a
        href={slide.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...styles.link, opacity: visible ? 1 : 0 }}
        aria-live="polite"
        onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}
      >
        {slide.text}
      </a>
      {slides.length > 1 && (
        <div style={styles.dots}>
          {slides.map((s, i) => (
            <button
              key={s.href}
              type="button"
              aria-label={`Show promo ${i + 1}`}
              style={styles.dot(i === index)}
              onClick={() => {
                setIndex(i);
                setVisible(true);
              }}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
