import "./landing.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiUsers,
  FiZap,
  FiMessageSquare,
  FiAward,
  FiGlobe,
  FiCode,
  FiStar,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiChevronDown,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

/* ─────────────────────────────── helpers ─── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ─────────────────────────────── data ─── */
const features = [
  { icon: <FiUsers size={24} />, label: "Find Developers", desc: "Discover talented devs that match your stack & vibe." },
  { icon: <FiZap size={24} />, label: "Work on Projects", desc: "Build side projects, startups, & open-source together." },
  { icon: <FiMessageSquare size={24} />, label: "Chat & Connect", desc: "Real-time messaging designed for technical conversations." },
  { icon: <FiAward size={24} />, label: "Join Hackathons", desc: "Compete, create, and win with your dream dev team." },
];

const stats = [
  { value: "24K+", label: "Developers" },
  { value: "4.8K+", label: "Projects Built" },
  { value: "180+", label: "Countries" },
  { value: "99%", label: "Match Rate" },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Full-Stack Developer",
    avatar: "AM",
    color: "#7C3AED",
    text: "Found my co-founder through Date_Dev in two weeks. We shipped our SaaS MVP in under 3 months.",
  },
  {
    name: "Sarah Chen",
    role: "ML Engineer",
    avatar: "SC",
    color: "#DB2777",
    text: "The quality of developers here is insane. Everyone's actually passionate about what they build.",
  },
  {
    name: "Dev Patel",
    role: "Open-Source Maintainer",
    avatar: "DP",
    color: "#0891B2",
    text: "Recruited three amazing contributors for my OSS library. Date_Dev is the GitHub for teams.",
  },
];

const techLogos = ["React", "Node", "Python", "Rust", "Go", "Swift", "Flutter", "Next.js"];

/* ─────────────────────────────── sub-components ─── */
const FeatureCard = ({ icon, label, desc, index }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="feature-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{label}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  );
};

const StatCard = ({ value, label, index }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="stat-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.85)",
        transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
      }}
    >
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const TestimonialCard = ({ name, role, avatar, color, text, index }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="testimonial-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => <FiStar key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
      </div>
      <p className="testimonial-text">"{text}"</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar" style={{ background: color }}>{avatar}</div>
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">{role}</div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────── main page ─── */
export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing-root">
      {/* ── Navbar ── */}
      <nav className={`landing-nav ${scrollY > 40 ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-bracket">&lt;/&gt;</span>
            <span className="logo-text">
              Date<span className="logo-accent">_Dev</span>
            </span>
          </Link>

          {/* Center links (desktop) */}
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#stats" className="nav-link">Stats</a>
            <a href="#testimonials" className="nav-link">Stories</a>
          </div>

          {/* CTA */}
          <div className="nav-ctas">
            <Link to="/login" className="btn-ghost">Log In</Link>
            <Link to="/signup" className="btn-primary-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero-section" ref={heroRef}>
        {/* Background glow blobs */}
        <div className="glow-blob glow-blob-1" />
        <div className="glow-blob glow-blob-2" />
        <div className="glow-blob glow-blob-3" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${8 + i * 8}%`,
            top: `${15 + (i % 3) * 22}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }} />
        ))}

        <div className="hero-inner">
          {/* Badge */}
          <div className="hero-badge">
            <HiSparkles size={14} />
            <span>For Developers. By Developers.</span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            <span className="headline-line">Connect.</span>
            <span className="headline-line gradient-text">Collaborate.</span>
            <span className="headline-line">Build Together.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-sub">
            Date_Dev is the developer networking platform where the right people
            find the right ideas — and ship amazing products together.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="/signup" className="btn-primary">
              Get Started <FiArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-outline">
              Explore Developers
            </Link>
          </div>

          {/* Hero illustration */}
          <div className="hero-illustration">
            <div className="hero-img-wrap">
              <img
                src="/hero_dev_scene.jpg"
                alt="Developers collaborating"
                className="hero-img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              {/* Overlay gradient at bottom */}
              <div className="hero-img-fade" />
            </div>
          </div>

          {/* Feature pills */}
          <div className="hero-pills">
            {features.map((f) => (
              <div key={f.label} className="hero-pill">
                <span className="pill-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p className="hero-tagline">
            The right people. The right ideas. <strong>All in <span className="gradient-text">one place.</span></strong>
          </p>

          {/* Scroll indicator */}
          <a href="#features" className="scroll-indicator">
            <FiChevronDown size={22} />
          </a>
        </div>
      </section>

      {/* ── Tech Ticker ── */}
      <section className="ticker-section">
        <div className="ticker-track">
          {[...techLogos, ...techLogos].map((t, i) => (
            <span key={i} className="ticker-item">
              <FiCode size={14} /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" id="features">
        <div className="section-inner">
          <div className="section-badge">What We Offer</div>
          <h2 className="section-title">
            Everything you need to<br />
            <span className="gradient-text">build your dream team</span>
          </h2>
          <p className="section-sub">
            Tools and connections purpose-built for developers who want to ship, not just chat.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <FeatureCard key={f.label} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section" id="stats">
        <div className="stats-glow" />
        <div className="section-inner">
          <div className="section-badge">By the Numbers</div>
          <h2 className="section-title">
            Trusted by developers<br />
            <span className="gradient-text">around the world</span>
          </h2>
          <div className="stats-grid">
            {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section" id="how">
        <div className="section-inner">
          <div className="section-badge">How It Works</div>
          <h2 className="section-title">
            From zero to team<br />
            <span className="gradient-text">in three steps</span>
          </h2>
          <div className="steps-grid">
            {[
              { n: "01", title: "Create Your Profile", desc: "Showcase your stack, projects, and what you're looking to build next." },
              { n: "02", title: "Swipe & Match", desc: "Browse developer profiles and match with those who share your vision." },
              { n: "03", title: "Build Together", desc: "Chat, plan, and ship — right inside Date_Dev." },
            ].map((s, i) => {
              const [ref, inView] = useInView();
              return (
                <div
                  key={s.n}
                  ref={ref}
                  className="step-card"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(40px)",
                    transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                  }}
                >
                  <div className="step-number">{s.n}</div>
                  <div className="step-connector" />
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section" id="testimonials">
        <div className="section-inner">
          <div className="section-badge">Developer Stories</div>
          <h2 className="section-title">
            Real devs, real<br />
            <span className="gradient-text">success stories</span>
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => <TestimonialCard key={t.name} {...t} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="cta-section">
        <div className="cta-glow-1" />
        <div className="cta-glow-2" />
        <div className="cta-inner">
          <div className="section-badge">Ready to ship?</div>
          <h2 className="cta-title">
            Your next great project<br />starts with the right<br />
            <span className="gradient-text">collaborator.</span>
          </h2>
          <p className="cta-sub">
            Join thousands of developers already building the future — together.
          </p>
          <div className="cta-actions">
            <Link to="/signup" className="btn-primary btn-large">
              Join Date_Dev <FiArrowRight size={20} />
            </Link>
            <div className="cta-note">Free forever · No credit card required</div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <span className="logo-bracket">&lt;/&gt;</span>
              <span className="logo-text">
                Date<span className="logo-accent">_Dev</span>
              </span>
            </Link>
            <p className="footer-tagline">For Developers. By Developers.</p>
            <div className="footer-socials">
              <a href="#" className="social-btn"><FiGithub size={18} /></a>
              <a href="#" className="social-btn"><FiTwitter size={18} /></a>
              <a href="#" className="social-btn"><FiLinkedin size={18} /></a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#stats">Stats</a>
          </div>

          <div className="footer-links-group">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
          </div>

          <div className="footer-links-group">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Date_Dev. Built with ❤️ for developers.</span>
        </div>
      </footer>
    </div>
  );
}
