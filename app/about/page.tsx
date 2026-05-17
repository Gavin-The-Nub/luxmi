"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "../components/TransitionLink";

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

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
      <section className="hero" style={{ height: "60vh", minHeight: "400px" }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/about-us.png')", opacity: 0.5 }} />
        <div className="hero-overlay" style={{ background: "rgba(26, 20, 16, 0.6)" }} />
        <div className="hero-content" style={{ paddingTop: "4rem", textAlign: "center", margin: "0 auto" }}>
          <h1 className="hero-title no-wrap-desktop" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
            Our Story & <em>Vision</em>
          </h1>
          <p className="hero-sub">
            Learn more about our mission and the team behind Lux-Mi.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="section" style={{ background: "var(--white)", padding: "10rem 3rem 7rem 3rem" }}>
        <div className="about-container">
          <div className="about-content reveal">
            <p className="section-label" style={{ textAlign: "left" }}>The Vision</p>
            <h2 className="section-title" style={{ textAlign: "left" }}>
              Redefining <em>Skin</em> Wellness
            </h2>
            <div className="gold-rule" style={{ margin: "2rem 0 3rem 0", width: "100px" }} />
            <p className="about-text">
              Lux-Mi Skin Wellness Aesthetics was founded with a clear vision: to create a sanctuary where advanced science meets luxury care. We believe that true beauty is holistic, and our goal is to enhance your natural features while promoting overall skin health.
            </p>
            <p className="about-text">
              Our clinic is equipped with the latest FDA-cleared technologies and staffed by certified specialists who are passionate about delivering visible, long-lasting results. We take pride in our personalized approach, ensuring that every treatment plan is as unique as you are.
            </p>
          </div>
          <div className="about-image-wrapper reveal">
            <div className="about-image-bg" />
            <Image 
              src="/about-logo.jpg" 
              alt="Lux-Mi Wellness Wall" 
              width={600} 
              height={600} 
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <p className="section-label reveal">Our Principles</p>
        <h2 className="section-title reveal">
          Mission & <em>Values</em>
        </h2>
        <div className="gold-rule reveal" />

        <div className="why-grid" style={{ marginTop: "3rem" }}>
          <div className="why-item reveal">
            <div className="why-item-icon">✦</div>
            <h3 className="why-item-title" style={{ color: "var(--dark)" }}>Integrity</h3>
            <p className="why-item-text" style={{ color: "var(--charcoal)" }}>We recommend only what you need, prioritizing your long-term skin health.</p>
          </div>
          <div className="why-item reveal">
            <div className="why-item-icon">✦</div>
            <h3 className="why-item-title" style={{ color: "var(--dark)" }}>Innovation</h3>
            <p className="why-item-text" style={{ color: "var(--charcoal)" }}>We continuously invest in the latest technologies and training.</p>
          </div>
          <div className="why-item reveal">
            <div className="why-item-icon">✦</div>
            <h3 className="why-item-title" style={{ color: "var(--dark)" }}>Luxury</h3>
            <p className="why-item-text" style={{ color: "var(--charcoal)" }}>Every visit is designed to be a relaxing, premium experience.</p>
          </div>
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
