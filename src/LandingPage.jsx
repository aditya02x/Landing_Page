import { useEffect, useRef, useState } from "react";

const NAV_LINKS = ["Features", "How it Works", "Testimonials", "Pricing"];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Blazing Fast",
    desc: "Sub-50ms response times across every edge node. Your users feel zero friction, globally.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12 1.863 0 3.622-.425 5.187-1.189m-8.312-9.75h2.25m-2.25 0L9 12.75" />
      </svg>
    ),
    title: "Enterprise Security",
    desc: "SOC 2 Type II, GDPR, and HIPAA compliant. End-to-end encryption baked in, not bolted on.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Deep Analytics",
    desc: "Real-time dashboards with custom funnels. Understand every user journey, not just the vanity metrics.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "500+ Integrations",
    desc: "Connect your entire stack in minutes. Native support for Slack, Notion, Salesforce, and more.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Team Collaboration",
    desc: "Shared workspaces, live cursors, granular permissions. Built for teams that move fast.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: "AI-Powered",
    desc: "Intelligent automation that learns your workflow. Less repetitive work, more strategic thinking.",
  },
];

const STEPS = [
  { num: "01", title: "Connect your stack", desc: "Link your existing tools with one-click OAuth. No engineering team required." },
  { num: "02", title: "Configure your workflow", desc: "Use our visual builder to map exactly how data flows through your organisation." },
  { num: "03", title: "Launch and iterate", desc: "Go live in minutes. Monitor, measure, and improve with built-in A/B testing." },
];

const TESTIMONIALS = [
  {
    quote: "We cut our onboarding time from 3 weeks to 4 days. The ROI was immediate and the team actually enjoys using it.",
    name: "Sarah Chen",
    role: "VP of Operations, Meridian",
    initials: "SC",
    color: "#6366f1",
  },
  {
    quote: "Every tool we evaluated looked the same. This was the only one that felt like it was designed for how we actually work.",
    name: "Marcus Webb",
    role: "Co-founder, Lumen Labs",
    initials: "MW",
    color: "#0ea5e9",
  },
  {
    quote: "Our churn dropped 34% in Q1. The analytics gave us visibility we never had — we finally know what's working.",
    name: "Priya Nair",
    role: "Head of Growth, Volta",
    initials: "PN",
    color: "#10b981",
  },
];

// ── Utility: load GSAP from CDN and call back ──────────────────────────────
function loadGSAP(cb) {
  if (window.gsap) { cb(window.gsap, window.ScrollTrigger); return; }
  const core = document.createElement("script");
  core.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
  core.onload = () => {
    const st = document.createElement("script");
    st.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
    st.onload = () => { window.gsap.registerPlugin(window.ScrollTrigger); cb(window.gsap, window.ScrollTrigger); };
    document.head.appendChild(st);
  };
  document.head.appendChild(core);
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 16 16" fill="white" style={{ width: 14, height: 14 }}>
              <path d="M8 1L1 5v6l7 4 7-4V5L8 1zm0 2.18L13 6.06v3.88L8 12.82 3 9.94V6.06L8 3.18z" />
            </svg>
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "#0f0f0f" }}>
            Orbit
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ fontSize: 14, color: "#6b7280", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.target.style.color = "#0f0f0f")}
              onMouseLeave={e => (e.target.style.color = "#6b7280")}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>Log in</a>
          <a
            href="#"
            style={{
              fontSize: 14, fontWeight: 600, color: "#fff",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              padding: "8px 20px", borderRadius: 99,
              boxShadow: "0 2px 12px rgba(99,102,241,0.35)",
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 20px rgba(99,102,241,0.45)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 2px 12px rgba(99,102,241,0.35)"; }}
          >
            Get started free
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(o => !o)}>
          <div style={{ width: 22, height: 2, background: "#0f0f0f", marginBottom: 5, borderRadius: 2, transition: "all .2s", transform: open ? "rotate(45deg) translate(5px,5px)" : "" }} />
          <div style={{ width: 22, height: 2, background: "#0f0f0f", marginBottom: 5, borderRadius: 2, opacity: open ? 0 : 1, transition: "all .2s" }} />
          <div style={{ width: 22, height: 2, background: "#0f0f0f", borderRadius: 2, transition: "all .2s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden", maxHeight: open ? 320 : 0,
          transition: "max-height .35s cubic-bezier(.4,0,.2,1)",
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)",
          borderBottom: open ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} style={{ fontSize: 15, color: "#374151", fontWeight: 500 }} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="#" style={{ fontSize: 15, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "10px 20px", borderRadius: 99, textAlign: "center" }}>
            Get started free
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroVisual() {
  return (
    <div
      id="hero-visual"
      className="relative mx-auto"
      style={{ maxWidth: 580, aspectRatio: "16/10", opacity: 0 }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: -40,
        background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Dashboard mock */}
      <div style={{
        borderRadius: 16, overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,.6) inset",
        background: "#fff",
      }}>
        {/* Title bar */}
        <div style={{ background: "#f8f8f8", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ marginLeft: 10, flex: 1, height: 6, borderRadius: 99, background: "rgba(0,0,0,0.07)", maxWidth: 200 }} />
        </div>
        {/* Body */}
        <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, background: "#fafafa" }}>
          {[
            { label: "Total Revenue", value: "$284,291", up: true, pct: "+12.4%" },
            { label: "Active Users", value: "18,472", up: true, pct: "+8.1%" },
            { label: "Churn Rate", value: "1.8%", up: false, pct: "-0.4%" },
          ].map(card => (
            <div key={card.label} style={{ background: "#fff", borderRadius: 10, padding: "14px 16px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500, marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.03em" }}>{card.value}</div>
              <div style={{ fontSize: 10, color: card.up ? "#10b981" : "#ef4444", fontWeight: 600, marginTop: 4 }}>{card.pct}</div>
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div style={{ padding: "0 20px 20px", background: "#fafafa" }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 16, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 11, color: "#374151", fontWeight: 600, marginBottom: 14 }}>Revenue over time</div>
            <svg viewBox="0 0 460 80" style={{ width: "100%", display: "block" }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,60 C40,55 80,45 120,40 C160,35 200,50 240,38 C280,26 320,28 360,18 C390,12 430,8 460,5" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
              <path d="M0,60 C40,55 80,45 120,40 C160,35 200,50 240,38 C280,26 320,28 360,18 C390,12 430,8 460,5 L460,80 L0,80 Z" fill="url(#chartGrad)" />
              {[0,80,160,240,320,400,460].map((x,i) => (
                <line key={i} x1={x} y1="0" x2={x} y2="80" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Floating badge 1 */}
      <div
        id="badge1"
        style={{
          position: "absolute", top: -18, right: -16,
          background: "#fff", borderRadius: 12, padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", gap: 8, opacity: 0,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#0f0f0f" }}>All systems live</span>
      </div>

      {/* Floating badge 2 */}
      <div
        id="badge2"
        style={{
          position: "absolute", bottom: -16, left: -16,
          background: "#fff", borderRadius: 12, padding: "10px 14px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)",
          display: "flex", alignItems: "center", gap: 8, opacity: 0,
        }}
      >
        <span style={{ fontSize: 18 }}>🚀</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#0f0f0f" }}>+34% growth</div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>vs. last quarter</div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "28px",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered ? "0 16px 48px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 44, height: 44, borderRadius: 12,
          background: hovered ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#f5f5ff",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "#fff" : "#6366f1",
          transition: "all .3s cubic-bezier(.4,0,.2,1)",
          marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f0f0f", marginBottom: 8, letterSpacing: "-0.02em" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

function StepItem({ num, title, desc, last }) {
  return (
    <div className="step-item" style={{ display: "flex", gap: 24, opacity: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: "#fff", letterSpacing: "0.04em",
        }}>
          {num}
        </div>
        {!last && <div style={{ flex: 1, width: 1, background: "linear-gradient(to bottom, #6366f1, transparent)", minHeight: 48, marginTop: 8 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, maxWidth: 420 }}>{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name, role, initials, color }) {
  return (
    <div
      className="testimonial-card"
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "28px",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        opacity: 0,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        {[1,2,3,4,5].map(s => (
          <span key={s} style={{ color: "#fbbf24", fontSize: 14 }}>★</span>
        ))}
      </div>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>
        "{quote}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0f0f" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap";
    document.head.appendChild(link);

    loadGSAP((gsap, ScrollTrigger) => {
      // ── Hero entrance ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo("#hero-badge", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo("#hero-h1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo("#hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo("#hero-ctas", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .fromTo("#hero-social", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo("#hero-visual", { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.5")
        .fromTo("#badge1", { opacity: 0, x: 20, y: -10 }, { opacity: 1, x: 0, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo("#badge2", { opacity: 0, x: -20, y: 10 }, { opacity: 1, x: 0, y: 0, duration: 0.5 }, "-=0.3");

      // ── Feature cards stagger ──
      ScrollTrigger.batch(".feature-card", {
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }),
        start: "top 88%",
        once: true,
      });

      // ── Steps stagger ──
      ScrollTrigger.batch(".step-item", {
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.18, ease: "power2.out" }),
        start: "top 88%",
        once: true,
      });

      // ── Testimonials stagger ──
      ScrollTrigger.batch(".testimonial-card", {
        onEnter: batch => gsap.fromTo(batch, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }),
        start: "top 88%",
        once: true,
      });

      // ── Generic fade-up sections ──
      gsap.utils.toArray(".section-fade").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh", paddingTop: 120,
          background: "linear-gradient(180deg, #f0f0ff 0%, #fafafa 55%)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            {/* Badge */}
            <div
              id="hero-badge"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#fff", border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 99, padding: "6px 16px 6px 8px",
                marginBottom: 32, boxShadow: "0 2px 8px rgba(99,102,241,0.1)",
                opacity: 0,
              }}
            >
              <span style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: "#fff" }}>NEW</span>
              <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Orbit 3.0 — AI workflows are here</span>
              <svg viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5" style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0l-3.5-3.5M13 8l-3.5 3.5" />
              </svg>
            </div>

            {/* H1 */}
            <h1
              id="hero-h1"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(38px, 6vw, 72px)",
                fontWeight: 400, lineHeight: 1.08,
                letterSpacing: "-0.03em", color: "#0f0f0f",
                marginBottom: 24, opacity: 0,
              }}
            >
              Work flows better
              <br />
              <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                when everything connects.
              </span>
            </h1>

            {/* Subtext */}
            <p
              id="hero-sub"
              style={{ fontSize: "clamp(16px,2vw,19px)", color: "#6b7280", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 36px", opacity: 0 }}
            >
              Orbit unifies your tools, automates your busywork, and gives your team the clarity to move fast — without the chaos.
            </p>

            {/* CTAs */}
            <div id="hero-ctas" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20, opacity: 0 }}>
              <a
                href="#"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff", fontWeight: 700, fontSize: 15,
                  padding: "14px 28px", borderRadius: 99,
                  boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                  transition: "all .2s cubic-bezier(.4,0,.2,1)",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.4)"; }}
              >
                Start for free
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m0 0l-3.5-3.5M13 8l-3.5 3.5" />
                </svg>
              </a>
              <a
                href="#"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#fff", color: "#374151", fontWeight: 600, fontSize: 15,
                  padding: "14px 28px", borderRadius: 99,
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all .2s cubic-bezier(.4,0,.2,1)",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16, color: "#6b7280" }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch demo
              </a>
            </div>

            {/* Social proof */}
            <div id="hero-social" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 72, opacity: 0 }}>
              <div style={{ display: "flex" }}>
                {["#6366f1","#8b5cf6","#0ea5e9","#10b981","#f59e0b"].map((c, i) => (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: c, border: "2px solid #fafafa", marginLeft: i ? -8 : 0 }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                <strong style={{ color: "#0f0f0f" }}>4,800+</strong> teams ship faster with Orbit
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <HeroVisual />
        </div>

        {/* Logos */}
        <div style={{ width: "100%", borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 80, padding: "36px 0", background: "#fff" }}>
          <div className="max-w-5xl mx-auto px-6">
            <p style={{ textAlign: "center", fontSize: 12, letterSpacing: "0.1em", color: "#9ca3af", fontWeight: 600, marginBottom: 28, textTransform: "uppercase" }}>
              Trusted by teams at
            </p>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(24px,5vw,64px)", flexWrap: "wrap", opacity: 0.4 }}>
              {["Acme Corp","Meridian","Volta Labs","Lumen","Archetype","Noma"].map(name => (
                <span key={name} style={{ fontSize: 15, fontWeight: 800, color: "#0f0f0f", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "100px 0", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-fade" style={{ textAlign: "center", marginBottom: 64, opacity: 0 }}>
            <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", marginBottom: 16 }}>
              Why Orbit
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "#0f0f0f", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>
              Everything your team needs.<br />Nothing it doesn't.
            </h2>
            <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Deliberately designed to remove friction at every layer — from setup to daily use.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "100px 0", background: "#fafafa" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-fade" style={{ opacity: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", marginBottom: 16 }}>How it works</div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, color: "#0f0f0f", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 48 }}>
                  Three steps to a calmer, faster workflow.
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {STEPS.map((s, i) => <StepItem key={s.num} {...s} last={i === STEPS.length - 1} />)}
              </div>
            </div>

            {/* Visual */}
            <div className="section-fade" style={{ opacity: 0 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.08)", background: "#fff" }}>
                <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", padding: "32px 32px 0", minHeight: 200, display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Fetch leads from CRM","Filter: deal value > $50k","Enrich via Clearbit","Post to #sales-alerts"].map((step, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(4px)" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{i+1}</div>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{step}</span>
                      <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: i < 2 ? "#4ade80" : "rgba(255,255,255,0.3)" }} />
                    </div>
                  ))}
                </div>
                <div style={{ padding: "24px 32px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0f0f", marginBottom: 4 }}>Workflow active · 2 min ago</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>Processed 142 leads · Flagged 18 for immediate follow-up</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section id="testimonials" style={{ padding: "100px 0", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="section-fade" style={{ textAlign: "center", marginBottom: 64, opacity: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#6366f1", textTransform: "uppercase", marginBottom: 16 }}>Testimonials</div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "#0f0f0f", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Loved by the teams<br />doing the real work.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map(t => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "#fafafa" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="section-fade"
            style={{
              opacity: 0, textAlign: "center",
              background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%)",
              borderRadius: 24, padding: "72px 48px",
              boxShadow: "0 32px 80px rgba(99,102,241,0.3)",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
                Ready to move faster?
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", marginBottom: 40, lineHeight: 1.7, maxWidth: 460, margin: "0 auto 40px" }}>
                Join 4,800+ teams that have eliminated their operational bottlenecks. No credit card required.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="#"
                  style={{
                    background: "#fff", color: "#6366f1", fontWeight: 700, fontSize: 15,
                    padding: "14px 32px", borderRadius: 99,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    textDecoration: "none", transition: "all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}
                >
                  Start for free — no card needed
                </a>
                <a
                  href="#"
                  style={{
                    background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 15,
                    padding: "14px 28px", borderRadius: 99,
                    border: "1px solid rgba(255,255,255,0.25)",
                    textDecoration: "none", backdropFilter: "blur(4px)", transition: "all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                >
                  Talk to sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{ background: "#0f0f0f", padding: "64px 0 40px" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 16 16" fill="white" style={{ width: 14, height: 14 }}>
                    <path d="M8 1L1 5v6l7 4 7-4V5L8 1zm0 2.18L13 6.06v3.88L8 12.82 3 9.94V6.06L8 3.18z" />
                  </svg>
                </div>
                <span style={{ fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-0.02em" }}>Orbit</span>
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
                The operating system for modern teams. Connect, automate, and grow — without the noise.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {["tw","li","gh"].map(s => (
                  <div key={s} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features","Integrations","Changelog","Roadmap"] },
              { title: "Company", links: ["About","Blog","Careers","Press"] },
              { title: "Legal", links: ["Privacy","Terms","Security","Cookies"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ display: "block", fontSize: 14, color: "#6b7280", marginBottom: 12, textDecoration: "none", transition: "color .15s" }}
                    onMouseEnter={e => (e.target.style.color = "#fff")} onMouseLeave={e => (e.target.style.color = "#6b7280")}
                  >{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#4b5563" }}>© 2025 Orbit Technologies, Inc. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "#4b5563" }}>Built for teams that care about quality.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
