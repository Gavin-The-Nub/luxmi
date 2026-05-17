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

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isMenuOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        treatment: "",
        message: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "nav-open" : ""}`} id="navbar">
        <TransitionLink href="/" className="nav-logo nav-logo-flex" id="nav-logo">
          <Image src="/logo.jpg" alt="Lux-Mi Logo" width={40} height={40} className="logo-img" />
          <span>Lux-Mi <span className="brand-name-extra">Skin Wellness Aesthetics</span></span>
        </TransitionLink>
        
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li><TransitionLink href="/about" id="nav-about">About</TransitionLink></li>
          <li><TransitionLink href="/services" id="nav-services">Treatments</TransitionLink></li>
          <li><TransitionLink href="/contact" id="nav-contact">Contact</TransitionLink></li>
          <li className="mobile-only">
            <a href="https://m.me/61573448662954" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '1rem' }}>
              <span>Message Us</span>
            </a>
          </li>
        </ul>
        <a href="https://m.me/61573448662954" target="_blank" rel="noopener noreferrer" className="nav-cta" id="nav-book">
          Message Us
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" style={{ height: "40vh", minHeight: "300px" }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/8.jpg')", opacity: 0.3 }} />
        <div className="hero-overlay" style={{ background: "rgba(26, 20, 16, 0.8)" }} />
        <div className="hero-content" style={{ paddingTop: "4rem", textAlign: "center", margin: "0 auto" }}>
          <h1 className="hero-title" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
            Contact <em>Us</em>
          </h1>
          <p className="hero-sub" style={{ margin: "0 auto", maxWidth: "600px" }}>
            We are here to answer your questions and help you on your skin wellness journey.
          </p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="contact-section" style={{ background: "var(--cream)", padding: "4rem 1.5rem" }}>
        <div className="contact-container">
          
          {/* Inquiry Form */}
          <div className="contact-form-wrapper contact-card reveal">
            <p className="section-label" style={{ textAlign: "left" }}>Inquiry</p>
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: "2.5rem" }}>Send Us a <em>Message</em></h2>
            
            {status === "success" ? (
              <div className="form-success-container" style={{
                background: "rgba(201, 147, 122, 0.08)",
                border: "1px solid rgba(201, 147, 122, 0.25)",
                borderRadius: "12px",
                padding: "2.5rem 2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem"
              }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(201, 147, 122, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--rose-dark, #A6755E)",
                  marginBottom: "0.5rem"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: "var(--charcoal, #1A1410)", fontWeight: "normal", fontStyle: "italic", margin: 0 }}>Message Sent Successfully</h3>
                <p style={{ color: "var(--charcoal)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0, maxWidth: "340px" }}>
                  Thank you for reaching out to Lux-Mi! We have received your inquiry and will respond to you shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="btn-primary" 
                  style={{ marginTop: "1rem" }}
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form className="inquiry-form" onSubmit={handleSubmit}>
                {status === "error" && (
                  <div style={{
                    background: "rgba(186, 45, 45, 0.08)",
                    border: "1px solid rgba(186, 45, 45, 0.2)",
                    borderRadius: "8px",
                    padding: "1rem 1.25rem",
                    color: "#ba2d2d",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem"
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    required 
                    disabled={status === "loading"}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email" 
                    required 
                    disabled={status === "loading"}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number" 
                    disabled={status === "loading"}
                  />
                </div>
                <div className="form-group">
                  <select 
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  >
                    <option value="">Select Treatment (Optional)</option>
                    {services.map((s) => (
                      <option key={s.num} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message" 
                    rows={4} 
                    required 
                    disabled={status === "loading"}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ alignSelf: "flex-start", marginTop: "1rem" }}
                  disabled={status === "loading"}
                >
                  <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Map & Info */}
          <div className="contact-info-wrapper contact-card reveal" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <div>
              <p className="section-label" style={{ textAlign: "left" }}>Visit Us</p>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "0.75rem" }}>Our <em>Location</em></h2>
              <p style={{ color: "var(--charcoal)", lineHeight: "1.8", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                MK Lina Street Brgy.Uno<br />
                Lipa City, Batangas<br />
                (Near Redemptorist Church)
              </p>
            </div>

            <div>
              <p className="section-label" style={{ textAlign: "left" }}>Connect</p>
              <p style={{ color: "var(--charcoal)", lineHeight: "1.8", fontSize: "0.95rem", letterSpacing: "0.02em", marginBottom: "1rem" }}>
                <strong>Phone:</strong> <a href="tel:+1234567890" style={{ color: "var(--rose-dark)", textDecoration: "none" }}>+123 456 7890</a><br />
                <strong>Email:</strong> <a href="mailto:info@luxmi.com" style={{ color: "var(--rose-dark)", textDecoration: "none" }}>info@luxmi.com</a>
              </p>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=61573448662954" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.28 5.45a7.19 7.19 0 0 0-5.21-1.26v8.27a3.13 3.13 0 0 1-3.13 3.13 3.13 3.13 0 0 1-3.13-3.13 3.13 3.13 0 0 1 3.13-3.13c.37 0 .72.07 1.05.19V5.45a7.21 7.21 0 0 0-1.05-.08A7.28 7.28 0 0 0 2 12.65a7.28 7.28 0 0 0 7.28 7.28c4 0 7.25-3.23 7.28-7.22v-3.8a7.14 7.14 0 0 0 4.14 1.32v-3.83a3.42 3.42 0 0 1-2.72-1.5z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="map-container reveal" style={{ width: "100%", height: "450px", margin: "2.5rem auto 0", border: "1px solid rgba(201, 147, 122, 0.15)", overflow: "hidden", borderRadius: "12px" }}>
          <iframe
            src="https://maps.google.com/maps?q=MK%20Lina%20Street%20Brgy.Uno%20Lipa%20City%20Batangas&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
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
