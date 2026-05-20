"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "../components/TransitionLink";

const services = [
  {
    num: "01",
    name: "Nava Facial",
    tag: "Signature Treatment",
    img: "/1.webp",
  },
  {
    num: "02",
    name: "CO₂ Fractional",
    tag: "Skin Resurfacing",
    img: "/2.jpeg",
  },
  {
    num: "03",
    name: "Lipo Cavitation",
    tag: "Body Contouring",
    img: "/3.jpg",
  },
  {
    num: "04",
    name: "Hydra Facial",
    tag: "Deep Hydration",
    img: "/4.jpeg",
  },
  {
    num: "05",
    name: "Pico Diode Laser",
    tag: "Advanced Laser",
    img: "/5.jpg",
  },
  {
    num: "06",
    name: "Diamond Peel",
    tag: "Skin Renewal",
    img: "/6.jpeg",
  },
  {
    num: "07",
    name: "HIFU Treatment",
    tag: "Non-Surgical Lift",
    img: "/7.jpeg",
  },
  {
    num: "08",
    name: "Luxury Facial",
    tag: "Premium Experience",
    img: "/8.jpg",
  },
  {
    num: "09",
    name: "Warts Removal",
    tag: "Precision Care",
    img: "/9.webp",
  },
  {
    num: "10",
    name: "Barbie Arms",
    tag: "Arm Slimming",
    img: "/10.webp",
  },
  {
    num: "11",
    name: "Under Arms",
    tag: "Brightening & Smoothing",
    img: "/11.jpg",
  },
  {
    num: "12",
    name: "Carbon Laser",
    tag: "Hollywood Peel",
    img: "/12.jpeg",
  },
];

// Mapping service card numbers to detailed guide tabs
const serviceToTabMap: Record<string, string> = {
  "02": "co2",          // CO₂ Fractional
  "04": "hydrafacial",   // Hydra Facial
  "05": "picodiode",     // Pico Diode Laser
  "06": "diamondpeel",   // Diamond Peel
  "07": "hifu",          // HIFU Treatment
  "08": "hydrafacial",   // Luxury Facial (maps to Advanced Hydra Facial)
  "10": "hifu",          // Barbie Arms (maps to HIFU)
  "11": "picodiode",     // Under Arms (maps to Advanced Pico Diode)
};

// Detailed treatments and benefits information
const treatmentDetails = [
  {
    id: "co2",
    name: "Co2 Treatments",
    tagline: "Advanced Skin Resurfacing",
    targets: [
      "Stretch Marks",
      "Scar Treatments",
      "Melasma Treatments",
      "Fine Lines Reduction",
      "Dark Spots"
    ],
    benefits: "Reduces deep wrinkles, acne scars, sun damage, and sagging skin while dramatically improving overall skin texture and tone. Perfect for restoring smooth, rejuvenated skin.",
    msg: "Co2 Treatments"
  },
  {
    id: "hydrafacial",
    name: "Advanced Hydra Facial",
    tagline: "Ultimate Deep Hydration & Exfoliation",
    targets: [
      "Luxury Facial",
      "Acne-Cleanse Facial",
      "Hydrogen Facial",
      "8 in 1 Hydra Facial Treatment",
      "BabyGlow Facial"
    ],
    benefits: "Delivers instantly improved skin texture, reduced fine lines, diminished pores, and deeply enhanced hydration. An all-in-one facial with absolutely zero downtime.",
    msg: "Advanced Hydra Facial"
  },
  {
    id: "hifu",
    name: "7D / 12D Hifu Treatment",
    tagline: "Non-Surgical Face & Body Lift",
    targets: [
      "Barbie Arms",
      "Face Lifting",
      "Puffiness @ Eyebags",
      "Whole Face Hifu / 12D and 7D"
    ],
    benefits: "Effectively reduces wrinkles, defines the jawline, and lifts sagging skin on the face, neck, and décolletage by stimulating deep collagen layers non-invasively.",
    msg: "7D Hifu / 12D Hifu Treatment"
  },
  {
    id: "rf",
    name: "RF Advanced",
    tagline: "Radio Frequency Skin Tightening",
    targets: [
      "Abdomen - Reduction Skin Laxity / sagging smoother appearance of Stretch Marks",
      "Thighs and Buttocks - Improved Texture"
    ],
    benefits: "This heat stimulates collagen and elastin production, resulting in firmer, tighter, and more youthful skin while reducing sagging and wrinkles.",
    msg: "RF Advanced"
  },
  {
    id: "diamondpeel",
    name: "Advanced Diamond Peel",
    tagline: "Gentle Exfoliation & Skin Renewal",
    targets: [
      "Removes dead skin cells",
      "Uneven complexion",
      "Enlarged Pores",
      "Slight wrinkles",
      "Sun damage",
      "Fine Scars",
      "Non inflamed Whiteheads"
    ],
    benefits: "Diamond peel is a non-invasive, mechanical exfoliation treatment that uses a diamond-tipped wand to remove dead skin cells, revealing smoother, brighter, and rejuvenated skin. It boosts collagen, reduces fine lines, minimizes pores, and treats acne scars, resulting in a more even skin tone with zero downtime.",
    msg: "Advanced Diamond Peel"
  },
  {
    id: "picolaser",
    name: "Advanced Pico Laser",
    tagline: "High-Precision Laser Therapy",
    targets: [
      "All Darkened Areas",
      "Melasma Treatment",
      "Acne Treatment"
    ],
    benefits: "Pico laser is a non-invasive, high-precision treatment using ultra-short (picosecond) energy pulses to treat skin pigmentation, acne scars, wrinkles, and tattoos with minimal heat damage and downtime. It effectively stimulates collagen and elastin for improved skin texture, tone, and firmness.",
    msg: "Advanced Pico Laser"
  },
  {
    id: "picodiode",
    name: "Advanced Pico Diode Treatments",
    tagline: "Targeted Whitening & Smoothing",
    targets: [
      "Under arm Whitening",
      "Under Eye Whitening",
      "Bikini Whitening",
      "Arm Whitening",
      "Back Whitening",
      "Nape Whitening",
      "Elbow Whitening"
    ],
    benefits: "Treating acne scars, reducing sun damage/melasma, removing tattoos, and enhancing skin texture and tone in delicate target areas.",
    msg: "Advanced Pico Diode Treatments"
  }
];

export default function ServicesPage() {
  const navRef = useRef<HTMLElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("co2");

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navRef.current?.classList.add("scrolled");
      } else {
        navRef.current?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reveal on scroll
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, num: string) => {
    const tabId = serviceToTabMap[num];
    if (tabId) {
      e.preventDefault();
      setActiveTab(tabId);
      guideRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar scrolled" ref={navRef} id="navbar">
        <TransitionLink href="/" className="nav-logo nav-logo-flex" id="nav-logo">
          <Image src="/logo.jpg" alt="Lux-Mi Logo" width={40} height={40} className="logo-img" />
          <span>Lux-Mi Skin Wellness Aesthetics</span>
        </TransitionLink>
        <ul className="nav-links">
          <li><TransitionLink href="/about" id="nav-about">About</TransitionLink></li>
          <li><TransitionLink href="/services" id="nav-services">Treatments</TransitionLink></li>
          <li><TransitionLink href="/contact" id="nav-contact">Contact</TransitionLink></li>
        </ul>
        <a href="https://m.me/61573448662954" target="_blank" rel="noopener noreferrer" className="nav-cta" id="nav-book">
          Message Us
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" style={{ height: "50vh", minHeight: "350px" }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/4.jpeg')", opacity: 0.4 }} />
        <div className="hero-overlay" style={{ background: "rgba(26, 20, 16, 0.7)" }} />
        <div className="hero-content" style={{ paddingTop: "4rem", textAlign: "center", margin: "0 auto" }}>
          <h1 className="hero-title" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
            Our <em>Treatments</em>
          </h1>
          <p className="hero-sub">
            Bespoke treatments tailored to your unique skin needs.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="services-section" style={{ background: "var(--cream)", padding: "7rem 3rem" }}>
        <p className="section-label reveal">What We Offer</p>
        <h2 className="section-title reveal">
          Premium <em>Treatments</em>
        </h2>
        <div className="gold-rule reveal" />

        <div className="services-grid">
          {services.map((s, i) => (
            <a
              key={s.num}
              href={`https://m.me/61573448662954?text=${encodeURIComponent(`Hi! I'm interested in the ${s.name} treatment.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="service-card reveal"
              id={`service-${s.num}`}
              style={{ transitionDelay: `${(i % 4) * 0.05}s`, textDecoration: 'none' }}
              onClick={(e) => handleServiceClick(e, s.num)}
            >
              <div 
                className="service-card-bg" 
                style={{ backgroundImage: `url(${s.img})` }} 
              />
              <div className="service-card-content">
                <div className="service-num">{s.num}</div>
                <h3 className="service-name">{s.name}</h3>
                <span className="service-tag">{s.tag}</span>
                <div className="service-arrow">→</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Treatments & Benefits Guide Section ── */}
      <section ref={guideRef} className="treatments-guide-section" id="treatments-guide">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="section-label reveal">Clinical Guide</p>
          <h2 className="section-title reveal">
            Benefits & <em>Details</em>
          </h2>
          <div className="gold-rule reveal" />
          <p className="reveal" style={{ textAlign: "center", color: "var(--muted)", maxWidth: "700px", margin: "0 auto 3rem", fontSize: "0.95rem", lineHeight: "1.7", fontWeight: 300 }}>
            Discover the specific target areas and advanced aesthetic benefits of our specialized treatments. Click on any treatment card above or select from the tabs below to explore.
          </p>

          {/* Desktop Tabs Layout (Hidden on mobile) */}
          <div className="desktop-tabs-layout treatments-container reveal">
            {/* Left Tabs List */}
            <div className="treatment-tab-list">
              {treatmentDetails.map((item) => (
                <button
                  key={item.id}
                  className={`treatment-tab-btn ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span>{item.name}</span>
                  <span className="tab-arrow">→</span>
                </button>
              ))}
            </div>

            {/* Right Details Panel */}
            {(() => {
              const current = treatmentDetails.find((t) => t.id === activeTab) || treatmentDetails[0];
              return (
                <div key={activeTab} className="treatment-content-panel fade-slide-in">
                  <div>
                    <div className="treatment-header">
                      <h3 className="treatment-title">{current.name}</h3>
                      <span className="treatment-tagline">{current.tagline}</span>
                    </div>

                    <div className="benefits-box">
                      <h4 className="benefits-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        Clinical Benefits
                      </h4>
                      <p className="benefits-text">{current.benefits}</p>
                    </div>

                    <div className="targets-section">
                      <h4 className="targets-title">Target Areas &amp; Specific Treatments</h4>
                      <div className="targets-grid">
                        {current.targets.map((target, idx) => (
                          <span key={idx} className="target-badge">
                            <span style={{ color: "var(--gold)", marginRight: "4px" }}>✦</span>
                            {target}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="treatment-action">
                    <a
                      href={`https://m.me/61573448662954?text=${encodeURIComponent(`Hi! I'm interested in booking the ${current.msg} treatment and would love to consult with an expert.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="treatment-btn"
                    >
                      <span>Book {current.name}</span>
                      <span className="treatment-btn-icon">→</span>
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Mobile Accordion Layout (Visible only on mobile) */}
          <div className="treatment-accordion-list mobile-only-accordion reveal">
            {treatmentDetails.map((item) => {
              const isOpen = activeTab === item.id;
              return (
                <div key={item.id} className={`accordion-item ${isOpen ? "open" : ""}`}>
                  <button
                    className="accordion-header"
                    onClick={() => setActiveTab(isOpen ? "" : item.id)}
                  >
                    <span className="accordion-title">{item.name}</span>
                    <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div className="accordion-content">
                    <div className="accordion-content-inner">
                      <span className="treatment-tagline" style={{ display: "block", marginBottom: "1rem" }}>{item.tagline}</span>
                      
                      <div className="benefits-box">
                        <h4 className="benefits-title">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                          Clinical Benefits
                        </h4>
                        <p className="benefits-text">{item.benefits}</p>
                      </div>

                      <div className="targets-section">
                        <h4 className="targets-title">Target Areas &amp; Specific Treatments</h4>
                        <div className="targets-grid">
                          {item.targets.map((target, idx) => (
                            <span key={idx} className="target-badge">
                              <span style={{ color: "var(--gold)", marginRight: "4px" }}>✦</span>
                              {target}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="treatment-action">
                        <a
                          href={`https://m.me/61573448662954?text=${encodeURIComponent(`Hi! I'm interested in booking the ${item.msg} treatment and would love to consult with an expert.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="treatment-btn"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <span>Book {item.name}</span>
                          <span className="treatment-btn-icon">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contact">
        <p className="section-label reveal">Ready to Glow?</p>
        <h2 className="section-title reveal">
          Your <em>Transformation</em>
          <br />
          Starts Here
        </h2>
        <p className="cta-sub reveal">
          Book your complimentary consultation today.
        </p>
        <div className="reveal">
          <a href="https://m.me/61573448662954" target="_blank" rel="noopener noreferrer" className="btn-primary" id="cta-call">
            <span>Message Us</span>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="footer">
        <span className="footer-logo">Lux-Mi Skin Wellness Aesthetics</span>
        <div className="footer-location">
          <p>MK Lina Street Brgy.Uno</p>
          <p>Lipa City, Batangas</p>
          <p>(Near Redemptorist Church)</p>
        </div>
        <p>© {new Date().getFullYear()} Lux-Mi Skin Wellness Aesthetics. All rights reserved.</p>
      </footer>
    </>
  );
}
