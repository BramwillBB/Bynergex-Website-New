import { ArrowRight, Download, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import './About.css';

const About = () => {
  // Use the exact images generated to ensure no placeholders or duplicates
  const heroImage = "/images/substation_hero.png";
  const bannerImage = "/images/solar_banner.png";

  return (
    <div className="about-page animate-fade-in">
      {/* Background Architectural Grid Lines */}
      <div className="layout-grid-lines">
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
      </div>

      {/* Top Header Area */}
      <section className="about-hero-section section-spacing-top">
        <div className="container">
          <div className="about-hero-title-wrap animate-slide-up">
            <div className="pre-section-title-wrap">
              <div className="pre-section-title-inner">
                <div className="pre-section-title-square"></div>
                <div className="pre-section-title">Who We Are</div>
              </div>
            </div>
            <h1 className="about-hero-title">About Us</h1>
          </div>

          <div className="about-hero-client-main animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="about-avatar-inner">
              <div className="experience-badge-mini">
                <span className="badge-number">26</span>
              </div>
              <div className="avatar-info-text">Years of rigorous engineering experience</div>
            </div>
            <div className="about-avatar-right-text">
              <div className="text" style={{ fontFamily: 'monospace', color: 'var(--clr-text-muted)' }}>33.9249° S, 18.4241° E</div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Image & Orange Block */}
      <div className="image-info-about">
        <div className="grid-hero-about">
          <div className="about-image-left">
            <img 
              src={heroImage} 
              alt="Electrical Substation" 
              className="about-image"
              onError={(e) => { e.target.src = '/images/plc_panel.png'; }}
            />
          </div>
          <div className="about-info-right bg-primary">
            <div className="about-hero-content">
              <p className="about-hero-description text-white">
                We are an independent electrical engineering consultancy that delivers meticulous analysis, rigorous compliance verification, and resilient power system design. Our practice is defined by technical precision, absolute independence, and a commitment to protecting our clients' operational continuity.
              </p>
              <div className="about-hero-button">
                <Link to="/contact" className="btn-dark">
                  Get in Touch
                  <span className="btn-arrow-icon"><ArrowRight size={18} /></span>
                </Link>
                <a href="/brochure.pdf" className="download-link text-white" target="_blank" rel="noreferrer">
                  <Download size={18} style={{ marginRight: '8px' }} /> Download Profile
                </a>
              </div>
            </div>
            <div className="about-hero-text-marquee">
              <div className="marquee-list">
                <h2 className="marquee-text">RIGOUR · INDEPENDENCE · CLARITY · ACCOUNTABILITY ·</h2>
                <h2 className="marquee-text">RIGOUR · INDEPENDENCE · CLARITY · ACCOUNTABILITY ·</h2>
                <h2 className="marquee-text">RIGOUR · INDEPENDENCE · CLARITY · ACCOUNTABILITY ·</h2>
                <h2 className="marquee-text">RIGOUR · INDEPENDENCE · CLARITY · ACCOUNTABILITY ·</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Practice Section */}
      <section className="about-three-section section-spacing">
        <div className="container">
          <div className="grid-about-three">
            <div className="pre-section-title-wrap">
              <div className="pre-section-title-inner">
                <div className="pre-section-title-square"></div>
                <div className="pre-section-title">Our Practice</div>
              </div>
            </div>
            <div className="about-three-info">
              <h2 className="section-title">
                Engineering trust and quality through 26 years of industrial experience
              </h2>
            </div>
          </div>

          <div className="grid-about-three-content">
            <div className="about-three-author">
              <div className="author-image-placeholder">
                <img 
                  src="/images/engineering_seal.png" 
                  alt="Professional Engineering Credentials" 
                  className="author-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="about-author-info">
                <h3 className="about-author-name">Principal Consultant</h3>
                <div className="about-author-job">Pr. Tech Eng. | ECSA Registered Professional</div>
              </div>
            </div>
            
            <div className="about-story-info">
              <div className="about-story-info-inner">
                <h3 className="about-story-title">Our Story</h3>
                <p className="about-story-description">
                  Bynergex Consulting was established to address a critical gap in South Africa's evolving energy and infrastructure landscape. Too many businesses make significant electrical infrastructure decisions based on proposals from parties with a commercial interest in the outcome. We started with a clear purpose: to provide truly independent, vendor-agnostic technical advisory that serves the client and nobody else.
                </p>
                <p className="about-story-description last">
                  With 26 years of experience spanning power systems, industrial automation, SCADA platforms, and critical infrastructure, we bring the depth of knowledge that complex projects demand. We do not sell equipment, we do not install, and we do not hold supplier relationships that could compromise our advice. Every deliverable we produce carries Pr. Tech Eng authority and the professional accountability that comes with it.
                </p>
              </div>

              <div className="service-info-three">
                <h3 className="about-service-title">Our Capabilities</h3>
                <div className="service-three-list">
                  {servicesData.slice(0, 4).map((service) => (
                    <Link to={`/services/${service.slug}`} className="service-link" key={service.id}>
                      <div className="service-name-three">{service.title}</div>
                      <ArrowRight className="service-link-arrow" size={18} />
                    </Link>
                  ))}
                </div>
                <div className="service-three-button">
                  <Link to="/services" className="btn-dark-outline">
                    View All Capabilities
                    <span className="btn-arrow-icon"><ArrowRight size={18} /></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="video-section">
        <div className="video-overlay"></div>
        <img src={bannerImage} className="video-bg-image" alt="Industrial Solar" />
        
        <div className="container">
          <div className="video-info-main">
            <div className="video-info">
              <div className="video-title-line"></div>
              <h3 className="video-title">Delivering compliant, resilient electrical infrastructure across industrial operations.</h3>
            </div>
            <div className="video-counter-info">
              <div className="inner-number text-white">
                <div className="count">100</div>
                <div className="counter-symbol text-linear-gradient">%</div>
              </div>
              <div className="number-text">Independent. Vendor-Agnostic.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
