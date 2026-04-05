import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    id: 1,
    title: 'Power Systems Studies and Renewable Energy Grid Integration',
    desc: 'SSEG compliance, arc flash analysis, grid code compliance, network impact assessments for solar PV and BESS, Power Quality Assessments, and power factor correction.',
    image: '/images/solar.png',
    slug: 'power-systems'
  },
  {
    id: 2,
    title: 'Industrial Automation and SCADA Consulting',
    desc: 'SCADA architecture review, PLC and HMI functional design, control system audits, IT/OT network assessments, and OT cybersecurity gap analysis.',
    image: '/images/switchgear.png',
    slug: 'industrial-automation'
  },
  {
    id: 3,
    title: 'Critical Power and Data Centre Electrical Infrastructure',
    desc: 'UPS system design, generator sizing, ATS and synchronisation systems, data centre MV/LV distribution, tier classification consulting, and PUE optimisation.',
    image: '/images/ups.png',
    slug: 'critical-power'
  },
  {
    id: 4,
    title: 'Energy Efficiency Auditing and Demand-Side Management',
    desc: 'Energy audits (Level 1 to Level 3), power factor correction, tariff optimisation, SANS 204 compliance, M&V baselining, and carbon tax support.',
    image: '/images/compliance.png',
    slug: 'energy-efficiency'
  }
];

const Services = () => {
  return (
    <div className="services-page animate-fade-in">
      <section className="service-inner-section section-spacing">
        <div className="container">
          <div className="service-inner-main">
            <div className="hero-simple-wrap">
              <div className="hero-inner-title-wrap">
                <h1 className="hero-inner-title">Our Services</h1>
                <p className="lead-text">
                  Expert electrical engineering consulting services powered by 26+ years of industry experience. Let our expertise drive your infrastructure forward.
                </p>
              </div>
            </div>
            
            <div className="inner-service-info">
              <div className="inner-service-list-wrapper">
                <div className="inner-service-list">
                  {servicesData.map((service, idx) => (
                    <div className="service-item" key={service.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                      <Link to={`/contact`} className="inner-service-link">
                        <div className="inner-service-image-wrap">
                          <img src={service.image} alt={service.title} className="service-image-inner" />
                          <div className="service-hover">
                            <ArrowRight className="service-icon-inner" color="#ffffff" size={32} />
                          </div>
                        </div>
                        <div className="service-content">
                          <h2 className="service-title">{service.title}</h2>
                          <p className="service-description">{service.desc}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta-main dark-section">
        <div className="container">
          <div className="cta-info-wrapper">
            <div className="cta-info-inner">
              <h2 className="cta-text">
                Ready to start your<br />next project?
              </h2>
              <div className="cta-button">
                <Link to="/contact" className="btn-hero">
                  <span>Schedule Now</span>
                  <span className="btn-hero-arrow"><ArrowRight size={18} /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
