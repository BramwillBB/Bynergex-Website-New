import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';

import { servicesData } from '../data/servicesData';

const Services = () => {
  return (
    <div className="services-page animate-fade-in">
      {/* Background Architectural Grid Lines */}
      <div className="layout-grid-lines">
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
      </div>
      <section className="service-inner-section section-spacing">
        <div className="container">
          <div className="service-inner-main">
            <div className="hero-simple-wrap">
              <div className="hero-inner-title-wrap">
                <h1 className="hero-inner-title">Our Services</h1>
                <p className="lead-text">
                  Independent electrical engineering advisory, design, and analysis services. Every deliverable is produced to professional standards and signed off with Pr. Tech Eng authority.
                </p>
              </div>
            </div>
            
            <div className="inner-service-info">
              <div className="inner-service-list-wrapper">
                <div className="inner-service-list">
                  {servicesData.map((service, idx) => (
                    <div className="service-item" key={service.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                      <Link to={`/services/${service.slug}`} className="inner-service-link">
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
                Ready to discuss your project?
              </h2>
              <div className="cta-button">
                <Link to="/contact" className="btn-premium">
                  Get in Touch
                  <span className="premium-arrow"><ArrowRight size={18} /></span>
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
