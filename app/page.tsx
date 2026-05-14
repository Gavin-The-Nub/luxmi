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

const whyItems = [
  { icon: "✦", title: "Expert Hands", text: "Certified specialists with years of clinical excellence." },
  { icon: "✦", title: "Safe Technology", text: "FDA-cleared devices, clinical-grade products." },
  { icon: "✦", title: "Tailored Results", text: "Every treatment plan is uniquely yours." },
  { icon: "✦", title: "Luxe Environment", text: "A sanctuary designed for your comfort." },
];

export default function Home() {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero bg zoom-in on load
    const timer = setTimeout(() => {
      heroBgRef.current?.classList.add("loaded");
    }, 100);

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
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar" ref={navRef} id="navbar">
        <a href="#" className="nav-logo nav-logo-flex" id="nav-logo">
          <Image src="/logo.jpg" alt="Lux-Mi Logo" width={40} height={40} className="logo-img" />
          <span>Lux-Mi Skin Wellness Aesthetics</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services" id="nav-services">Services</a></li>
          <li><a href="/about" id="nav-about">About</a></li>
          <li><a href="#why" id="nav-why">Why Us</a></li>
          <li><a href="#contact" id="nav-contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta" id="nav-book">
          Book Now
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-overlay" />

        {/* Floating particles */}
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                animationDuration: `${8 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <span className="hero-tag">Skin Wellness Aesthetics</span>
          <h1 className="hero-title">
            Where Beauty
            <br />
            <em>Meets Science</em>
          </h1>
          <p className="hero-sub">
            Precision treatments. Radiant results.
          </p>
          <div className="hero-actions">
            <a href="#services" className="btn-primary" id="hero-explore">
              <span>Explore Services</span>
            </a>
            <a href="#contact" className="btn-outline" id="hero-book">
              Book a Session
            </a>
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-content reveal">
            <p className="section-label" style={{ textAlign: 'left' }}>Our Story</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Elevating Your <em>Natural</em> Beauty
            </h2>
            <div className="gold-rule" style={{ margin: '1.5rem 0' }} />
            <p className="about-text">
              At Lux-Mi Skin Wellness Aesthetics, we believe that skincare is not just about looking good, but feeling confident in your own skin. Our clinic combines advanced medical aesthetics with a holistic approach to wellness.
            </p>
            <p className="about-text">
              Founded on the principles of precision, safety, and luxury, we offer bespoke treatments tailored to your unique skin needs. Our team of experts is dedicated to guiding you on your journey to radiant, healthy skin.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <a href="/about" className="btn-outline" style={{ color: 'var(--dark)', borderColor: 'var(--rose)' }}>
                Learn More About Us
              </a>
            </div>
          </div>
          <div className="about-image-wrapper reveal">
            <div className="about-image-bg" />
            <Image 
              src="/about-us.png" 
              alt="About Lux-Mi" 
              width={600} 
              height={600} 
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services-section" id="services">
        <p className="section-label reveal">What We Offer</p>
        <h2 className="section-title reveal">
          Our <em>Treatments</em>
        </h2>
        <div className="gold-rule reveal" />

        <div className="services-grid">
          {services.map((s, i) => (
            <article
              key={s.num}
              className="service-card reveal"
              id={`service-${s.num}`}
              style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
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

      {/* ── Why Us ── */}
      <section className="why-section" id="why">
        <p className="section-label reveal" style={{ color: "var(--gold-light)" }}>
          The Lux-Mi Skin Wellness Aesthetics Promise
        </p>
        <h2 className="section-title reveal">
          Why Choose <em>Us</em>
        </h2>
        <div
          className="gold-rule reveal"
          style={{ background: "var(--gold)", opacity: 0.4 }}
        />

        <div className="why-grid">
          {whyItems.map((item, i) => (
            <div
              key={i}
              className="why-item reveal"
              id={`why-item-${i + 1}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="why-item-icon">{item.icon}</div>
              <h3 className="why-item-title">{item.title}</h3>
              <p className="why-item-text">{item.text}</p>
            </div>
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
