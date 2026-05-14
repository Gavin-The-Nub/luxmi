"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
  const navRef = useRef<HTMLElement>(null);

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

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar scrolled" ref={navRef} id="navbar">
        <a href="/" className="nav-logo nav-logo-flex" id="nav-logo">
          <Image src="/logo.jpg" alt="Lux-Mi Logo" width={40} height={40} className="logo-img" />
          <span>Lux-Mi Skin Wellness Aesthetics</span>
        </a>
        <ul className="nav-links">
          <li><a href="/about" id="nav-about">About</a></li>
          <li><a href="/services" id="nav-services">Treatments</a></li>
          <li><a href="/contact" id="nav-contact">Contact</a></li>
        </ul>
        <a href="/contact" className="nav-cta" id="nav-book">
          Book Now
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
      <section className="contact-section" style={{ background: "var(--cream)", padding: "6rem 1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5rem", maxWidth: "1100px", margin: "0 auto", justifyContent: "center" }}>
          
          {/* Inquiry Form */}
          <div className="contact-form-wrapper reveal" style={{ flex: "1 1 450px", maxWidth: "550px" }}>
            <p className="section-label" style={{ textAlign: "left" }}>Inquiry</p>
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: "2.5rem" }}>Send Us a <em>Message</em></h2>
            <form className="inquiry-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone Number" />
              </div>
              <div className="form-group">
                <select defaultValue="">
                  <option value="" disabled>Select Treatment (Optional)</option>
                  {services.map((s) => (
                    <option key={s.num} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows={4} required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Map & Info */}
          <div className="contact-info-wrapper reveal" style={{ flex: "1 1 350px", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <p className="section-label" style={{ textAlign: "left" }}>Visit Us</p>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem" }}>Our <em>Location</em></h2>
              <p style={{ color: "var(--charcoal)", lineHeight: "1.8", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                MK Lina Street Brgy.Uno<br />
                Lipa City, Batangas<br />
                (Near Redemptorist Church)
              </p>
            </div>

            <div>
              <p className="section-label" style={{ textAlign: "left" }}>Connect</p>
              <p style={{ color: "var(--charcoal)", lineHeight: "1.8", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                <strong>Phone:</strong> <a href="tel:+1234567890" style={{ color: "var(--rose-dark)", textDecoration: "none" }}>+123 456 7890</a><br />
                <strong>Email:</strong> <a href="mailto:info@luxmi.com" style={{ color: "var(--rose-dark)", textDecoration: "none" }}>info@luxmi.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="map-container reveal" style={{ width: "100%", height: "450px", margin: "4rem auto 0", border: "1px solid rgba(201, 147, 122, 0.15)", overflow: "hidden", borderRadius: "12px" }}>
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
