import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sun, Building, Zap, BatteryCharging, ShieldCheck, Activity, Check, Star, Award, Users, Cpu } from 'lucide-react';
import { useState } from 'react';
import './Home.css';

const Home = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const industries = [
    {
      name: 'Commercial & Industrial',
      icon: <Building size={24} />,
      desc: 'Full-scope electrical design for commercial developments, industrial facilities, and mixed-use properties across the Western Cape.',
      features: ['MV/LV reticulation design', 'Power factor correction', 'Building Management Systems'],
      image: '/images/switchgear.png'
    },
    {
      name: 'Renewable Energy',
      icon: <Sun size={24} />,
      desc: 'Solar PV feasibility, SSEG applications, and grid-tie system design for businesses transitioning to clean energy.',
      features: ['Solar PV system design', 'Grid connection applications', 'Energy yield analysis'],
      image: '/images/solar.png'
    },
    {
      name: 'Critical Infrastructure',
      icon: <Zap size={24} />,
      desc: 'Specialized power system design for data centres, telecommunications, and mission-critical facilities.',
      features: ['UPS & generator sizing', 'Redundancy design (N+1)', 'Commissioning management'],
      image: '/images/ups.png'
    },
    {
      name: 'Energy Storage',
      icon: <BatteryCharging size={24} />,
      desc: 'BESS consulting from feasibility through commissioning, helping clients integrate battery storage for grid resilience.',
      features: ['Technology selection', 'Performance modelling', 'Lifecycle cost analysis'],
      image: '/images/bess.png'
    },
    {
      name: 'Compliance & Safety',
      icon: <ShieldCheck size={24} />,
      desc: 'Rigorous electrical compliance inspections and auditing services aligned with SANS 10142 and OHS Act requirements.',
      features: ['Certificates of Compliance', 'OHS Act assessments', 'Hazardous area classification'],
      image: '/images/compliance.png'
    }
  ];

  const services = [
    {
      num: '01',
      title: 'Renewable Energy & Solar PV',
      features: ['Solar PV feasibility studies', 'SSEG municipal applications', 'Grid-tie system design', 'Performance monitoring'],
      image: '/images/solar.png'
    },
    {
      num: '02',
      title: 'Building Services Engineering',
      features: ['MV & LV distribution design', 'Lighting design (Relux/Dialux)', 'Fire detection systems', 'BMS integration'],
      image: '/images/switchgear.png'
    },
    {
      num: '03',
      title: 'Standby Power & Critical Systems',
      features: ['Generator & UPS sizing', 'ATS synchronisation design', 'Telecoms site power', 'Data centre infrastructure'],
      image: '/images/ups.png'
    },
    {
      num: '04',
      title: 'BESS Consulting',
      features: ['Technology selection advisory', 'Electrical integration design', 'Grid interconnection studies', 'Lifecycle cost modelling'],
      image: '/images/bess.png'
    },
    {
      num: '05',
      title: 'Compliance & Technical Auditing',
      features: ['SANS 10142 inspections', 'OHS Act Section 44 audits', 'Electrical CoC issuance', 'Condition assessments'],
      image: '/images/compliance.png'
    },
    {
      num: '06',
      title: 'MV/LV Infrastructure Design',
      features: ['Substation design', 'Protection coordination', 'Earthing & lightning protection', 'Municipal applications'],
      image: '/images/switchgear.png'
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
              <span>Trusted Engineering Partner</span>
            </div>
            <h1 className="hero-title">
              From concept <span className="accent-text">to commissioning</span> with confidence
            </h1>
          </div>
          <div className="hero-right">
            <p className="hero-since">// ESTABLISHED - 2026 //</p>
            <p className="hero-desc">
              From feasibility to final commissioning, we deliver precision-engineered electrical solutions—scalable, compliant, and tailored to your operational requirements.
            </p>
            <Link to="/services" className="btn-hero">
              <span>Explore Our Services</span>
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
              <img src="/images/engineer.png" alt="Bramwill Bruinders - Principal Engineer" />
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
                <p className="quote-author-name">Bramwill Bruinders</p>
                <p className="quote-author-title">Principal Engineer &amp; Founder</p>
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
              Driven by technology, backed by experience, focused on <span className="accent-text">engineering excellence</span>
            </h2>
            <p className="about-body">
              Bynergex Consulting is a specialist electrical engineering consultancy founded on 26+ years of hands-on industry experience. From telecommunications critical power systems to renewable energy integration, we deliver the technical rigour of a large firm with the agility of a focused practice.
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

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: IMPACT STATS
      ═══════════════════════════════════════════════════════ */}
      <section className="stats-section" id="stats">
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><Award size={28} /></div>
            <h3 className="stat-number">26+</h3>
            <p className="stat-label">Years of Experience</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Users size={28} /></div>
            <h3 className="stat-number">100+</h3>
            <p className="stat-label">Projects Delivered</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Star size={28} /></div>
            <h3 className="stat-number">ECSA</h3>
            <p className="stat-label">Registered Pr. Eng</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Cpu size={28} /></div>
            <h3 className="stat-number">6</h3>
            <p className="stat-label">Core Service Lines</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: SERVICE CAPABILITIES (Horizontal Cards)
      ═══════════════════════════════════════════════════════ */}
      <section className="capabilities-section section" id="capabilities">
        <div className="container">
          <div className="capabilities-header">
            <h2 className="section-heading">
              Scalable <span className="accent-text">capabilities</span> for every challenge
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
          SECTION 6: DARK SHOWCASE / PRODUCTS
      ═══════════════════════════════════════════════════════ */}
      <section className="showcase-section dark-section" id="showcase">
        <div className="container">
          <div className="showcase-top">
            <h2 className="showcase-counter">50,000+</h2>
            <p className="showcase-subtitle">Critical installations designed, audited, and commissioned across South Africa.</p>
          </div>
          <div className="showcase-grid">
            <div className="showcase-card">
              <h4>MV/LV Substation Design</h4>
              <img src="/images/switchgear.png" alt="MV/LV Substation" />
              <p>Protection-coordinated substation designs for industrial and commercial applications.</p>
            </div>
            <div className="showcase-card">
              <h4>Solar PV Integration</h4>
              <img src="/images/solar.png" alt="Solar PV systems" />
              <p>Grid-tie and off-grid solar PV system design with SSEG compliance.</p>
            </div>
            <div className="showcase-card">
              <h4>UPS & Critical Power</h4>
              <img src="/images/ups.png" alt="UPS room" />
              <p>Redundant power architectures for data centres and telecom facilities.</p>
            </div>
            <div className="showcase-card">
              <h4>BESS Solutions</h4>
              <img src="/images/bess.png" alt="Battery energy storage" />
              <p>Battery energy storage integration for grid resilience and peak shaving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: INDUSTRIES WE SERVE (Tab Selector)
      ═══════════════════════════════════════════════════════ */}
      <section className="industries-section section" id="industries">
        <div className="container">
          <p className="section-tag text-center-tag">Industries</p>
          <h2 className="section-heading text-center-heading">
            Engineering solutions for <span className="accent-text">every industry</span>
          </h2>

          <div className="industries-layout">
            <div className="industries-tabs">
              {industries.map((ind, idx) => (
                <button
                  key={idx}
                  className={`industry-tab ${activeIndustry === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndustry(idx)}
                >
                  {ind.name}
                </button>
              ))}
            </div>
            <div className="industry-detail">
              <div className="industry-image-wrapper">
                <img src={industries[activeIndustry].image} alt={industries[activeIndustry].name} />
              </div>
              <div className="industry-info">
                <div className="industry-icon-badge">{industries[activeIndustry].icon}</div>
                <h3>{industries[activeIndustry].name}</h3>
                <p>{industries[activeIndustry].desc}</p>
                <ul className="industry-features">
                  {industries[activeIndustry].features.map((f, i) => (
                    <li key={i}><Check size={16} className="check-icon" /> {f}</li>
                  ))}
                </ul>
              </div>
            </div>
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
            <h2>Ready to start your next project?</h2>
            <ul className="cta-checklist">
              <li><Check size={16} className="check-icon-cta" /> ECSA-registered professional engineer</li>
              <li><Check size={16} className="check-icon-cta" /> 26+ years of hands-on experience</li>
              <li><Check size={16} className="check-icon-cta" /> Client-centric approach</li>
            </ul>
            <Link to="/contact" className="btn-cta-primary">
              <span>Schedule a Consultation</span>
              <span className="btn-hero-arrow"><ArrowRight size={18} /></span>
            </Link>
            <div className="cta-social-proof">
              <div className="cta-avatars">
                <img src="/images/engineer.png" alt="Client" className="cta-avatar" />
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
