"use client";

import { useEffect, useRef } from "react";
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

export default function ServicesPage() {
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
        <TransitionLink href="/" className="nav-logo nav-logo-flex" id="nav-logo">
          <Image src="/logo.jpg" alt="Lux-Mi Logo" width={40} height={40} className="logo-img" />
          <span>Lux-Mi Skin Wellness Aesthetics</span>
        </TransitionLink>
        <ul className="nav-links">
          <li><TransitionLink href="/about" id="nav-about">About</TransitionLink></li>
          <li><TransitionLink href="/services" id="nav-services">Treatments</TransitionLink></li>
          <li><TransitionLink href="/contact" id="nav-contact">Contact</TransitionLink></li>
        </ul>
        <TransitionLink href="/contact" className="nav-cta" id="nav-book">
          Book Now
        </TransitionLink>
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
            <article
              key={s.num}
              className="service-card reveal"
              id={`service-${s.num}`}
              style={{ transitionDelay: `${(i % 4) * 0.05}s` }}
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
            </article>
          ))}
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
          <a href="tel:+1234567890" className="btn-primary" id="cta-call">
            <span>Get in Touch</span>
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
