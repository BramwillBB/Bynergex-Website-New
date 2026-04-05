import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, Check, Star, Award, MapPin } from 'lucide-react';
import { useState } from 'react';
import './Home.css';

const Home = () => {
  const services = [
    {
      num: '01',
      title: 'Power Systems Studies and Renewable Energy Grid Integration',
      features: ['SSEG compliance', 'Arc flash analysis', 'Grid code compliance', 'Network impact assessments for solar PV and BESS', 'Power Quality Assessments', 'Power factor correction'],
      image: '/images/solar.png'
    },
    {
      num: '02',
      title: 'Industrial Automation and SCADA Consulting',
      features: ['SCADA architecture review', 'PLC and HMI functional design', 'Control system audits', 'IT/OT network assessments', 'OT cybersecurity gap analysis'],
      image: '/images/switchgear.png'
    },
    {
      num: '03',
      title: 'Critical Power and Data Centre Electrical Infrastructure',
      features: ['UPS system design', 'Generator sizing', 'ATS and synchronisation systems', 'Data centre MV/LV distribution', 'Tier classification consulting', 'PUE optimisation'],
      image: '/images/ups.png'
    },
    {
      num: '04',
      title: 'Energy Efficiency Auditing and Demand-Side Management',
      features: ['Energy audits (Level 1 to Level 3)', 'Power factor correction', 'Tariff optimisation', 'SANS 204 compliance', 'M&V baselining', 'Carbon tax support'],
      image: '/images/compliance.png'
    }
  ];

  return (
    <div className="home-page">

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="hero-section" id="hero">
        <div className="hero-video-wrapper">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero.png"
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="hero-tag">
              <span className="tag-icon"></span>
              <span>Professional Engineering Practice</span>
            </div>
            <h1 className="hero-title" style={{ color: '#fff', maxWidth: '800px' }}>
              <span className="accent-text">Independent</span> Electrical Engineering Consulting
            </h1>
          </div>
          <div className="hero-right">
            <p className="hero-since">// ESTABLISHED - 2026 //</p>
            <p className="hero-desc">
              Specialist advisory, design, and analysis services for industrial, commercial, and municipal clients across South Africa.
            </p>
            <Link to="/services" className="btn-hero">
              <span>View Our Services</span>
              <span className="btn-hero-arrow"><ArrowRight size={18} /></span>
            </Link>
          </div>
        </div>
        <div className="hero-bottom-bar container">
          <span className="hero-meta">Based in: Western Cape, South Africa</span>
          <span className="hero-scroll"><ChevronDown size={16} /> SCROLL DOWN</span>
          <span className="hero-meta">ECSA Registered Pr. Eng</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: CEO VISION / QUOTE
      ═══════════════════════════════════════════════════════ */}
      <section className="quote-section" id="vision">
        <div className="container quote-grid">
          <div className="quote-portrait-col">
            <div className="quote-portrait">
              <img src="/images/switchgear.png" alt="Electrical Switchgear" />
            </div>
            <div className="quote-portrait-accent"></div>
          </div>
          <div className="quote-text-col">
            <div className="quote-accent-line"></div>
            <blockquote className="quote-text">
              "In electrical engineering, there is no room for compromise. Every connection, every protection device, every cable route must perform with <em>absolute reliability</em> — because lives and livelihoods depend on it."
            </blockquote>
            <div className="quote-author-row">
              <div className="quote-author-info">
                <p className="quote-author-name">Principal Engineer</p>
                <p className="quote-author-title">Founder</p>
              </div>
              <div className="quote-rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#E55225" color="#E55225" />)}
                <span className="quote-rating-text">26+ years trusted expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: WHO WE ARE
      ═══════════════════════════════════════════════════════ */}
      <section className="about-section section" id="about-preview">
        <div className="container about-grid">
          <div className="about-image-col">
            <img src="/images/switchgear.png" alt="Modern electrical switchgear panel" className="about-main-image" />
          </div>
          <div className="about-text-col">
            <p className="section-tag">Who We Are</p>
            <h2 className="section-heading">
              Engineering Expertise <span className="accent-text">You Can Trust</span>
            </h2>
            <p className="about-body">
              Bynergex Consulting delivers independent electrical engineering advisory, design, and analysis services. With 26 years of professional experience across power systems, industrial automation, SCADA platforms, and critical infrastructure, we provide the technical rigour that complex projects demand. We are a consulting-only practice. We do not install. Our recommendations serve one interest: the client.
            </p>
            <div className="about-actions">
              <Link to="/about" className="btn-hero">
                <span>Learn More About Us</span>
                <span className="btn-hero-arrow"><ArrowRight size={18} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION REMOVED */}

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: SERVICE CAPABILITIES (Horizontal Cards)
      ═══════════════════════════════════════════════════════ */}
      <section className="capabilities-section section" id="capabilities">
        <div className="container">
          <div className="capabilities-header">
            <h2 className="section-heading">
              Our <span className="accent-text">Services</span>
            </h2>
            <Link to="/services" className="btn-hero">
              <span>Explore All Capabilities</span>
              <span className="btn-hero-arrow"><ArrowRight size={18} /></span>
            </Link>
          </div>

          <div className="capabilities-list">
            {services.map((svc) => (
              <div className="capability-row" key={svc.num}>
                <div className="cap-num">{svc.num}</div>
                <div className="cap-image-wrapper">
                  <img src={svc.image} alt={svc.title} />
                </div>
                <h3 className="cap-title">{svc.title}</h3>
                <div className="cap-features">
                  <p className="cap-features-label">Features</p>
                  <ul>
                    {svc.features.map((f, i) => (
                      <li key={i}><Check size={14} className="check-icon" /> {f}</li>
                    ))}
                  </ul>
                </div>
                <Link to="/services" className="cap-arrow-btn" aria-label={`View ${svc.title}`}>
                  <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: WHY BYNERGEX
      ═══════════════════════════════════════════════════════ */}
      <section className="showcase-section dark-section" id="why-bynergex">
        <div className="container">
          <div className="showcase-top">
            <h2 className="section-heading text-center-heading" style={{color: '#fff'}}>Why Bynergex</h2>
            <p className="showcase-subtitle">Independent expertise mapped to your critical project requirements.</p>
          </div>
          <div className="showcase-grid">
            <div className="showcase-card no-image-card">
              <Award size={40} color="var(--clr-primary)" className="card-icon" />
              <h4>26 Years of Experience</h4>
              <p>Deep expertise in power systems, industrial automation, SCADA, and critical infrastructure across municipal, telecoms, and industrial sectors.</p>
            </div>
            <div className="showcase-card no-image-card">
              <ShieldCheck size={40} color="var(--clr-primary)" className="card-icon" />
              <h4>ECSA Registered Pr. Tech Eng</h4>
              <p>Professional sign-off authority meeting ECSA Identification of Engineering Work requirements.</p>
            </div>
            <div className="showcase-card no-image-card">
              <Star size={40} color="var(--clr-primary)" className="card-icon" />
              <h4>Independent and Impartial</h4>
              <p>Consulting-only. No installation, no product supply, no contractor relationships. Our advice is unconflicted.</p>
            </div>
            <div className="showcase-card no-image-card">
              <MapPin size={40} color="var(--clr-primary)" className="card-icon" />
              <h4>Western Cape Based, Nationally Available</h4>
              <p>Headquartered in Cape Town. Delivering projects across South Africa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: LEAD MAGNET
      ═══════════════════════════════════════════════════════ */}
      <section className="resource-banner-section section" id="lead-magnet" style={{ backgroundColor: 'var(--clr-bg-alt)' }}>
        <div className="container resource-grid" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="resource-text" style={{ flex: '1 1 500px' }}>
            <p className="section-tag">Free Resource</p>
            <h2 className="section-heading">Planning a Solar PV or Battery Storage Investment?</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'var(--clr-text-light)' }}>
              Download our free guide: 10 technical questions to answer before you invest. Independent advice from an ECSA-registered Professional Engineering Technologist.
            </p>
            <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
              Download Free Guide <ArrowRight size={20} />
            </button>
          </div>
          <div className="resource-image" style={{ flex: '1 1 400px', borderRadius: '1rem', overflow: 'hidden' }}>
            <img src="/images/bess.png" alt="Battery Storage Guide" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="cta-banner-section" id="cta">
        <div className="cta-banner-bg">
          <img src="/images/hero.png" alt="Electrical infrastructure" />
          <div className="cta-banner-overlay"></div>
        </div>
        <div className="container cta-banner-content">
          <div className="cta-banner-left">
            <h2>Let us discuss your project.</h2>
            <p className="cta-desc" style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.6' }}>
              We welcome enquiries from industrial, commercial, and municipal clients. Whether you need a power systems study, a SCADA audit, a critical power review, or an energy efficiency assessment, the conversation starts here.
            </p>
            <Link to="/contact" className="btn-cta-primary">
              <span>Get in Touch</span>
              <span className="btn-hero-arrow"><ArrowRight size={18} /></span>
            </Link>
            <div className="cta-social-proof" style={{ marginTop: '3rem' }}>
              <div className="cta-avatars">
                <img src="/images/switchgear.png" alt="Electrical Infrastructure" className="cta-avatar" />
              </div>
              <div className="cta-stars">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#E55225" color="#E55225" />)}
                </div>
                <span>Trusted by clients across South Africa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
