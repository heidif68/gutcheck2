import { useState, useEffect } from "react";

const decisions = [
  {
    id: "text",
    label: "Should I text them?",
    emoji: "💬",
    questions: [
      { text: "Have you already texted them recently with no reply?", yes: -2, no: 1 },
      { text: "Are you texting because you genuinely want to connect — not just to ease anxiety?", yes: 2, no: -2 },
      { text: "Would you be okay if they didn't reply?", yes: 2, no: -1 },
      { text: "Is this something that actually needs to be said?", yes: 2, no: -1 },
    ],
    results: {
      yes: { headline: "Send it.", sub: "You're coming from a real place. Say what you mean, mean what you say — then let it go." },
      no: { headline: "Not yet.", sub: "Your anxiety is writing the message, not you. Give it a day. If it still matters tomorrow, send it then." },
      maybe: { headline: "Sleep on it.", sub: "There's something real here, but the timing or reason isn't quite right. Tomorrow-you will know." },
    },
  },
  {
    id: "quit",
    label: "Should I quit my job?",
    emoji: "💼",
    questions: [
      { text: "Have you felt dread about work for more than 3 months straight?", yes: 2, no: -1 },
      { text: "Do you have savings or another opportunity lined up?", yes: 2, no: -2 },
      { text: "Is the problem the job — or something you'd carry to the next one?", yes: -1, no: 2 },
      { text: "Have you had an honest conversation with your manager about it?", yes: -1, no: 1 },
    ],
    results: {
      yes: { headline: "It's time.", sub: "You've been patient, you've done the thinking. Trust what you already know. Start planning your exit." },
      no: { headline: "Stay, but change something.", sub: "Quitting isn't the fix here. The real issue needs a different approach — a conversation, a boundary, a new project." },
      maybe: { headline: "Get a plan first.", sub: "The feeling is valid. But leaving without a landing pad creates new stress. Give yourself 60 days to build options." },
    },
  },
  {
    id: "apologize",
    label: "Should I apologize?",
    emoji: "🤝",
    questions: [
      { text: "Do you actually believe you did something wrong — not just that they're upset?", yes: 2, no: -2 },
      { text: "Can you apologize without adding 'but...'?", yes: 2, no: -2 },
      { text: "Is this apology for them — not to relieve your own guilt?", yes: 2, no: -1 },
      { text: "Are you willing to change the behavior, not just the words?", yes: 1, no: -2 },
    ],
    results: {
      yes: { headline: "Say sorry.", sub: "You know what you did. A real apology, no buts, no excuses — it'll mean everything." },
      no: { headline: "Don't apologize yet.", sub: "An apology you don't mean does more damage. Figure out what you actually feel first." },
      maybe: { headline: "Clarify your feelings first.", sub: "Part of you knows an apology is right. Get clear on what you're sorry for before you speak." },
    },
  },
  {
    id: "move",
    label: "Should I move cities?",
    emoji: "🏙️",
    questions: [
      { text: "Have you felt stuck or uninspired in your current city for over a year?", yes: 2, no: -1 },
      { text: "Do you have a real reason to go — not just to escape?", yes: 2, no: -2 },
      { text: "Could your current unhappiness follow you to a new place?", yes: -2, no: 2 },
      { text: "Do you have at least one anchor (job, person, community) in the new place?", yes: 2, no: -1 },
    ],
    results: {
      yes: { headline: "Go.", sub: "You're not running away — you're running toward something. Make the leap." },
      no: { headline: "The grass isn't greener.", sub: "A new city won't fix what's internal. Do the work first, then move if you still want to." },
      maybe: { headline: "Visit first.", sub: "Spend a week there. Stay in a neighborhood, not a hotel. If it still calls you after that — go." },
    },
  },
  {
    id: "confront",
    label: "Should I confront them?",
    emoji: "⚡",
    questions: [
      { text: "Has this bothered you for more than a week?", yes: 2, no: -1 },
      { text: "Can you bring it up without it turning into an attack?", yes: 2, no: -2 },
      { text: "Will you regret staying silent more than speaking up?", yes: 2, no: -1 },
      { text: "Is this about a pattern — not just a one-off bad day?", yes: 1, no: -1 },
    ],
    results: {
      yes: { headline: "Say something.", sub: "Silence isn't peace — it's just postponed conflict. Say it calmly, say it clearly, say it once." },
      no: { headline: "Let it go.", sub: "Not every battle is worth the war. Releasing this might be the stronger move." },
      maybe: { headline: "Write it out first.", sub: "Get your thoughts on paper before you get them in someone's face. Clarity first, conversation second." },
    },
  },
  {
    id: "relationship",
    label: "Should I end the relationship?",
    emoji: "💔",
    questions: [
      { text: "Do you feel consistently worse about yourself in this relationship?", yes: 2, no: -2 },
      { text: "Have you clearly communicated what isn't working?", yes: -1, no: 1 },
      { text: "Can you picture a future with this person that excites you?", yes: -2, no: 2 },
      { text: "Is this about who they are — not just a rough patch?", yes: 2, no: -2 },
    ],
    results: {
      yes: { headline: "It's okay to leave.", sub: "Staying out of guilt or comfort isn't love. You both deserve someone who's fully in." },
      no: { headline: "Don't give up yet.", sub: "Rough patches are real. If the foundation is solid, fight for it — but fight together." },
      maybe: { headline: "Get honest first.", sub: "Have the real conversation you've been avoiding. The answer will become clear after that." },
    },
  },
  {
    id: "buysomething",
    label: "Should I buy it?",
    emoji: "🛍️",
    questions: [
      { text: "Have you wanted this for more than two weeks — not just today?", yes: 2, no: -2 },
      { text: "Can you afford it without stress or guilt?", yes: 2, no: -2 },
      { text: "Will you use it at least once a week?", yes: 2, no: -1 },
      { text: "Are you buying it to feel better right now?", yes: -2, no: 1 },
    ],
    results: {
      yes: { headline: "Buy it.", sub: "You've thought it through. It's in budget, it's useful, it's not impulse. Enjoy it without guilt." },
      no: { headline: "Put it back.", sub: "Future-you will thank present-you. Wait 30 days — if you still want it then, it's real." },
      maybe: { headline: "Wait a week.", sub: "Not a hard no, not a yes. Set a reminder for 7 days from now. If you forget about it, you have your answer." },
    },
  },
  {
    id: "goback",
    label: "Should I give them another chance?",
    emoji: "🔄",
    questions: [
      { text: "Have they actually changed — not just promised to?", yes: 2, no: -2 },
      { text: "Do you want them back, or just want to stop feeling this way?", yes: 2, no: -2 },
      { text: "Did you feel safe and respected most of the time?", yes: 2, no: -2 },
      { text: "Have your friends or family expressed serious concern about this person?", yes: -2, no: 1 },
    ],
    results: {
      yes: { headline: "Give it a real shot.", sub: "But set clear terms. Change has to be demonstrated, not just declared." },
      no: { headline: "Don't go back.", sub: "You already know this. The pull you're feeling is pain, not love. Honor what you've learned." },
      maybe: { headline: "Take more time.", sub: "You're not ready — and that's okay. Don't make a permanent decision from a temporary feeling." },
    },
  },
  {
    id: "startup",
    label: "Should I start the business?",
    emoji: "🚀",
    questions: [
      { text: "Have you talked to at least 5 potential customers about this idea?", yes: 2, no: -1 },
      { text: "Could you run a small test of this idea for under $500?", yes: 2, no: -1 },
      { text: "Do you have 6+ months of personal runway if it doesn't work?", yes: 2, no: -2 },
      { text: "Are you solving a problem people admit they have — or one you assume they have?", yes: 2, no: -2 },
    ],
    results: {
      yes: { headline: "Start small. Start now.", sub: "You have enough signal. Launch the smallest version, get real feedback, iterate fast." },
      no: { headline: "Not ready yet.", sub: "The idea might be great — but the foundation isn't set. Fix the gaps before you leap." },
      maybe: { headline: "Run one experiment first.", sub: "Don't quit the day job. Spend 30 days validating one assumption. Build from proof, not hope." },
    },
  },
  {
    id: "therapy",
    label: "Should I try therapy?",
    emoji: "🧠",
    questions: [
      { text: "Are you carrying something that's been heavy for more than a few months?", yes: 2, no: -1 },
      { text: "Do you find yourself repeating the same patterns in relationships or work?", yes: 2, no: -1 },
      { text: "Have you avoided therapy because of stigma — not because you don't need it?", yes: 2, no: -1 },
      { text: "Do you feel like you could say anything to someone you trusted completely?", yes: -1, no: 2 },
    ],
    results: {
      yes: { headline: "Yes. Go.", sub: "Asking for help is a skill, not a weakness. The right therapist will change how you see everything." },
      no: { headline: "Maybe not urgent.", sub: "You seem to have good support and self-awareness. Still worth a trial session — it's rarely wasted." },
      maybe: { headline: "Try one session.", sub: "No commitment. Just show up once and see how it feels. You don't have to be in crisis to benefit." },
    },
  },
  {
    id: "saynо",
    label: "Should I say no?",
    emoji: "🚫",
    questions: [
      { text: "Did your gut immediately feel reluctant when you were asked?", yes: 2, no: -1 },
      { text: "Would saying yes mean sacrificing something important to you?", yes: 2, no: -1 },
      { text: "Are you considering saying yes mainly out of guilt or fear?", yes: -2, no: 1 },
      { text: "Is this person someone whose opinion of you genuinely matters long-term?", yes: -1, no: 2 },
    ],
    results: {
      yes: { headline: "Say no.", sub: "A no said clearly and kindly is more respectful than a yes said resentfully. Protect your time." },
      no: { headline: "Say yes.", sub: "You actually want this — you're just second-guessing. Lean in." },
      maybe: { headline: "Negotiate instead.", sub: "Not a flat no, not a full yes. Propose a version that works for you — most people respect that more." },
    },
  },
  {
    id: "post",
    label: "Should I post it?",
    emoji: "📱",
    questions: [
      { text: "Would you be comfortable if your boss, family, or ex saw this?", yes: 2, no: -2 },
      { text: "Are you posting to share something real — not to get a reaction?", yes: 2, no: -1 },
      { text: "Will this post matter to you in a year?", yes: 1, no: -1 },
      { text: "Are you posting this while emotionally activated?", yes: -2, no: 2 },
    ],
    results: {
      yes: { headline: "Post it.", sub: "It's genuine, you're calm, and you'd stand behind it tomorrow. That's the bar. Go ahead." },
      no: { headline: "Don't post it.", sub: "Screenshots live forever. Whatever you're feeling right now will pass — the post won't." },
      maybe: { headline: "Save it as a draft.", sub: "Come back in 24 hours. If it still feels right, post it. If you cringe — there's your answer." },
    },
  },
  {
    id: "freelance",
    label: "Should I go freelance?",
    emoji: "💻",
    questions: [
      { text: "Do you already have one client or project you could start with?", yes: 2, no: -1 },
      { text: "Can you handle income uncertainty without it wrecking your mental health?", yes: 2, no: -2 },
      { text: "Is your skill something people are already paying others for?", yes: 2, no: -2 },
      { text: "Are you going freelance to escape something — not build something?", yes: -2, no: 2 },
    ],
    results: {
      yes: { headline: "Make the jump.", sub: "You have the skill, the mindset, and the starting point. Don't wait for perfect conditions." },
      no: { headline: "Build it as a side hustle first.", sub: "Don't burn your safety net. Get two paying clients before you touch your notice letter." },
      maybe: { headline: "Set a 90-day test.", sub: "Keep the job. Spend 90 days finding paying clients on the side. If you replace 50% of your salary, then jump." },
    },
  },
  {
    id: "forgive",
    label: "Should I forgive them?",
    emoji: "🕊️",
    questions: [
      { text: "Is holding onto this anger costing you more than letting it go?", yes: 2, no: -1 },
      { text: "Do you understand — even slightly — why they did what they did?", yes: 2, no: -1 },
      { text: "Does forgiving them mean having to let them back into your life?", yes: -1, no: 2 },
      { text: "Are you ready — not just being pressured by others?", yes: 2, no: -2 },
    ],
    results: {
      yes: { headline: "Forgive them.", sub: "Forgiveness isn't for them — it's for you. You can let go of the weight without excusing what happened." },
      no: { headline: "Not yet.", sub: "Forced forgiveness isn't real forgiveness. Take the time you need. It'll come when it's ready." },
      maybe: { headline: "Forgive slowly.", sub: "Start with the intention. You don't have to feel it all at once. It's a direction, not a destination." },
    },
  },
  {
    id: "askout",
    label: "Should I ask them out?",
    emoji: "💘",
    questions: [
      { text: "Have you thought about this person consistently for more than a few days?", yes: 2, no: -1 },
      { text: "Is there any signal — even a small one — that they might be interested?", yes: 2, no: -1 },
      { text: "Could you handle a kind rejection and still be okay?", yes: 2, no: -1 },
      { text: "Are you holding back mainly because of fear — not a real reason?", yes: 2, no: -1 },
    ],
    results: {
      yes: { headline: "Ask.", sub: "The worst realistic outcome is a polite no. The best is everything you've been imagining. Say something." },
      no: { headline: "Not quite yet.", sub: "There isn't enough signal yet. Keep it natural, spend more time around them, let it develop." },
      maybe: { headline: "Create one more moment.", sub: "Find a low-stakes way to spend time together first. Clarity often arrives before courage does." },
    },
  },
];

const COLORS = {
  bg: "#0f0f0f",
  card: "#1a1a1a",
  border: "#2a2a2a",
  accent: "#e8ff47",
  text: "#f0ede8",
  muted: "#888",
  yes: "#e8ff47",
  no: "#ff6b6b",
  maybe: "#ffd166",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'DM Serif Display', 'Georgia', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 16px 60px",
  },
  header: {
    textAlign: "center",
    paddingTop: "56px",
    paddingBottom: "40px",
    maxWidth: "480px",
    width: "100%",
  },
  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  title: {
    fontSize: "clamp(36px, 8vw, 52px)",
    lineHeight: 1.05,
    fontWeight: 400,
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "13px",
    color: COLORS.muted,
    lineHeight: 1.6,
    fontWeight: 400,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    maxWidth: "480px",
    width: "100%",
  },
  decisionCard: (active: boolean) => ({
    background: active ? COLORS.accent : COLORS.card,
    border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
    borderRadius: "12px",
    padding: "20px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
  }),
  decisionEmoji: { fontSize: "24px", marginBottom: "10px", display: "block" },
  decisionLabel: (active: boolean) => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    fontWeight: 500,
    color: active ? COLORS.bg : COLORS.text,
    lineHeight: 1.4,
  }),
  questionWrap: {
    maxWidth: "480px",
    width: "100%",
    marginTop: "8px",
  },
  questionHeader: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.15em",
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  progressBar: {
    height: "2px",
    background: COLORS.border,
    borderRadius: "2px",
    marginBottom: "32px",
    overflow: "hidden",
  },
  progressFill: (pct: number) => ({
    height: "100%",
    width: `${pct}%`,
    background: COLORS.accent,
    borderRadius: "2px",
    transition: "width 0.4s ease",
  }),
  questionText: {
    fontSize: "clamp(22px, 5vw, 30px)",
    lineHeight: 1.25,
    fontWeight: 400,
    marginBottom: "32px",
    letterSpacing: "-0.01em",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
  },
  btn: (type: string) => ({
    flex: 1,
    padding: "18px 12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontFamily: "'DM Mono', monospace",
    fontWeight: 600,
    letterSpacing: "0.05em",
    transition: "all 0.15s ease",
    background: type === "YES" ? "#1e2400" : "#2a0f0f",
    color: type === "YES" ? COLORS.yes : COLORS.no,
    border: `1px solid ${type === "YES" ? "#3a4800" : "#4a1a1a"}`,
  }),
  resultWrap: {
    maxWidth: "480px",
    width: "100%",
    marginTop: "8px",
  },
  resultCard: (type: string) => ({
    background: COLORS.card,
    border: `1px solid ${type === "yes" ? COLORS.yes : type === "no" ? COLORS.no : COLORS.maybe}`,
    borderRadius: "16px",
    padding: "36px 28px",
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
  }),
  resultGlow: (type: string) => ({
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: type === "yes" ? COLORS.yes : type === "no" ? COLORS.no : COLORS.maybe,
  }),
  resultLabel: (type: string) => ({
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: type === "yes" ? COLORS.yes : type === "no" ? COLORS.no : COLORS.maybe,
    textTransform: "uppercase",
    marginBottom: "16px",
  }),
  resultHeadline: {
    fontSize: "clamp(32px, 8vw, 48px)",
    fontWeight: 400,
    lineHeight: 1.05,
    marginBottom: "20px",
    letterSpacing: "-0.02em",
  },
  resultSub: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "13px",
    color: COLORS.muted,
    lineHeight: 1.7,
  },
  restartBtn: {
    width: "100%",
    padding: "16px",
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    color: COLORS.muted,
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    letterSpacing: "0.1em",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "all 0.2s ease",
    marginBottom: "12px",
  },
  shareBtn: {
    width: "100%",
    padding: "16px",
    background: COLORS.accent,
    border: "none",
    borderRadius: "12px",
    color: COLORS.bg,
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    letterSpacing: "0.1em",
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: "24px",
  },
  adSlot: {
    width: "100%",
    maxWidth: "480px",
    background: COLORS.card,
    border: `1px dashed ${COLORS.border}`,
    borderRadius: "8px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "24px",
  },
  adText: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    color: "#444",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  footer: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    color: "#333",
    letterSpacing: "0.1em",
    textAlign: "center",
    marginTop: "40px",
    maxWidth: "480px",
    width: "100%",
  },
};

function getResultType(score) {
  if (score >= 4) return "yes";
  if (score <= -2) return "no";
  return "maybe";
}

export default function GutCheck() {
  const [phase, setPhase] = useState("pick"); // pick | questions | result
  const [selected, setSelected] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [anim, setAnim] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const decision = decisions.find((d) => d.id === selected);

  function pickDecision(id) {
    setSelected(id);
    setQIndex(0);
    setScore(0);
    setPhase("questions");
    setAnim(true);
  }

  function answer(val) {
    const q = decision.questions[qIndex];
    const delta = val === "YES" ? q.yes : q.no;
    const newScore = score + delta;
    setAnim(false);
    setTimeout(() => {
      if (qIndex + 1 >= decision.questions.length) {
        setScore(newScore);
        setPhase("result");
      } else {
        setQIndex(qIndex + 1);
        setScore(newScore);
      }
      setAnim(true);
    }, 150);
  }

  function restart() {
    setPhase("pick");
    setSelected(null);
    setScore(0);
    setQIndex(0);
  }

  function share() {
    const resultType = getResultType(score);
    const result = decision.results[resultType];
    const text = `"${decision.label}" → ${result.headline}\n\ngutencheck.app`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const resultType = phase === "result" ? getResultType(score) : null;
  const result = phase === "result" ? decision.results[resultType] : null;
  const progress = decision ? ((qIndex) / decision.questions.length) * 100 : 0;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.eyebrow}>Gut Check</div>
        <h1 style={styles.title}>Your gut already<br />knows. Let's listen.</h1>
        <p style={styles.subtitle}>No algorithms. No advice columns.<br />Just the right questions.</p>
      </header>

      {phase === "pick" && (
        <div style={styles.grid}>
          {decisions.map((d) => (
            <div
              key={d.id}
              style={styles.decisionCard(selected === d.id)}
              onClick={() => pickDecision(d.id)}
              onMouseEnter={(e) => {
                if (selected !== d.id) {
                  e.currentTarget.style.borderColor = COLORS.accent + "80";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== d.id) {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.transform = "none";
                }
              }}
            >
              <span style={styles.decisionEmoji}>{d.emoji}</span>
              <div style={styles.decisionLabel(selected === d.id)}>{d.label}</div>
            </div>
          ))}
        </div>
      )}

      {phase === "questions" && decision && (
        <div style={{ ...styles.questionWrap, opacity: anim ? 1 : 0, transition: "opacity 0.15s ease" }}>
          <div style={styles.questionHeader}>
            Question {qIndex + 1} of {decision.questions.length}
          </div>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(progress)} />
          </div>
          <div style={styles.questionText}>{decision.questions[qIndex].text}</div>
          <div style={styles.btnRow}>
            <button style={styles.btn("YES")} onClick={() => answer("YES")}
              onMouseEnter={(e) => e.currentTarget.style.background = "#2e3a00"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#1e2400"}
            >
              ✓ Yes
            </button>
            <button style={styles.btn("NO")} onClick={() => answer("NO")}
              onMouseEnter={(e) => e.currentTarget.style.background = "#3d1010"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#2a0f0f"}
            >
              ✗ No
            </button>
          </div>
        </div>
      )}

      {phase === "result" && result && (
        <div style={styles.resultWrap}>
          <div style={styles.resultCard(resultType)}>
            <div style={styles.resultGlow(resultType)} />
            <div style={styles.resultLabel(resultType)}>
              {resultType === "yes" ? "✓ Clear signal" : resultType === "no" ? "✗ Hold back" : "◐ It's complicated"}
            </div>
            <div style={styles.resultHeadline}>{result.headline}</div>
            <div style={styles.resultSub}>{result.sub}</div>
          </div>

          <button
            style={styles.shareBtn}
            onClick={share}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            {copied ? "✓ Copied to clipboard" : "↗ Share this result"}
          </button>

          <button
            style={styles.restartBtn}
            onClick={restart}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.muted; e.currentTarget.style.color = COLORS.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; }}
          >
            ← Try another decision
          </button>

          {/* Ad slot */}
          <div style={styles.adSlot}>
            <div style={styles.adText}>Advertisement · Google AdSense</div>
          </div>
        </div>
      )}

      <div style={styles.footer}>
        GUT CHECK · NOT ADVICE · JUST CLARITY
      </div>
    </div>
  );
}
