import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import './ServiceDetail.css';

import LeadMagnetBanner from '../components/LeadMagnetBanner';

const leadMagnets = {
  'power-systems': {
    heading: 'Free Guide',
    title: '10 Technical Questions to Answer Before Investing in Solar PV or Battery Storage',
    description: 'An independent guide for South African business owners evaluating solar PV and BESS proposals. Written by an ECSA-registered Professional Engineering Technologist with 26 years of experience.',
    buttonText: 'Download Free Guide',
    downloadUrl: '/downloads/bynergex-solar-pv-bess-guide.pdf'
  },
  'industrial-automation': {
    heading: 'Free Checklist',
    title: 'Is Your SCADA System a Liability? A 15-Point Security and Health Check',
    description: 'A self-assessment checklist covering system documentation, network security, hardware lifecycle, and operational effectiveness. Score your control system and identify the gaps that matter most.',
    buttonText: 'Download Free Checklist',
    downloadUrl: '/downloads/bynergex-scada-health-check.pdf'
  },
  'critical-power': {
    heading: 'Free Checklist',
    title: '12 Questions to Assess Your Critical Power Infrastructure',
    description: 'A structured self-assessment for facility managers covering UPS systems, standby generation, transfer switching, and power distribution. Identify single points of failure before they cause an outage.',
    buttonText: 'Download Free Checklist',
    downloadUrl: '/downloads/bynergex-critical-power-checklist.pdf'
  },
  'energy-efficiency': {
    heading: 'Free Guide',
    title: '5 Ways South African Businesses Overpay for Electricity Without Knowing It',
    description: 'A practical guide covering power factor penalties, wrong tariff structures, oversized motors, inefficient lighting, and unmanaged demand peaks. Includes cost impact estimates for a typical R100,000 monthly bill.',
    buttonText: 'Download Free Guide',
    downloadUrl: '/downloads/bynergex-electricity-overpayment-guide.pdf'
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [activeFaq, setActiveFaq] = useState(null);

  // Scroll to top when specific service is opened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="container" style={{ padding: '20vh 0', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <Link to="/services" className="btn btn-primary mt-4">Return to Services</Link>
      </div>
    );
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="service-detail-page animate-fade-in">
      {/* Background Architectural Grid Lines */}
      <div className="layout-grid-lines">
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
      </div>
      {/* Top Details & Image */}
      <section className="service-details-section section-spacing-top">
        <div className="container service-details-top">
          <div className="service-detail-main animate-slide-up">
            <h1 className="service-detail-name">{service.title}</h1>
            <p className="service-detail-description">{service.detailHeroDesc}</p>
              <Link to="/contact" className="btn-premium">
                Get a Quote
                <span className="premium-arrow"><ArrowRight size={18} /></span>
              </Link>
          </div>
        </div>

        <img src={service.image} alt={service.title} className="service-detail-image" />

        <div className="service-more-info section-spacing-bottom">
          <div className="container">
            <div className="more-info-inner">
              <div className="service-detail-content">
                <div className="pre-section-title-wrap">
                  <div className="pre-section-title-inner">
                    <div className="pre-section-title-square"></div>
                    <div className="pre-section-title">Why choose us</div>
                  </div>
                </div>
                <div 
                  className="service-info-description w-richtext" 
                  dangerouslySetInnerHTML={{ __html: service.detailBody }} 
                />
              </div>

              <div className="service-feature-info">
                <div className="grid-feature">
                  {service.features.map((feat) => (
                    <div className="feature-main" key={feat.id}>
                      <div className="feature-icon-wrap">
                        {feat.icon}
                      </div>
                      <h2 className="feature-name">{feat.title}</h2>
                      <p className="feature-description">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="service-category-section">
        <div className="container">
          <div className="service-category-main section-spacing">
            <div className="service-category-inner">
              <div className="grid-category-title">
                <div className="title-grid-left">
                  <div className="pre-section-title-wrap bg-dark">
                    <div className="pre-section-title-inner">
                      <div className="pre-section-title-square"></div>
                      <div className="pre-section-title bg-dark">Capabilities & Features</div>
                    </div>
                  </div>
                </div>
                <div className="title-grid-right">
                  <h2 className="category-title">{service.title}</h2>
                </div>
              </div>

              <div className="category-content-wrap">
                <div className="grid-category-inner">
                  <div className="category-inner-left">
                    <div className="category-text">Category</div>
                  </div>
                  <div className="category-inner-right">
                    <div className="category-text">Details</div>
                  </div>
                </div>

                {service.capabilities.map((cap, idx) => (
                  <div className={`grid-category-info ${idx === service.capabilities.length - 1 ? 'last' : ''}`} key={idx}>
                    <div className="category-name-wrap">
                      <div className="category-name">{cap.name}</div>
                    </div>
                    <div className="category-details-wrap">
                      <div className="category-details w-richtext">
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {cap.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Lead Magnet Banner */}
      {leadMagnets[slug] && (
        <LeadMagnetBanner 
          heading={leadMagnets[slug].heading}
          title={leadMagnets[slug].title}
          description={leadMagnets[slug].description}
          buttonText={leadMagnets[slug].buttonText}
          downloadUrl={leadMagnets[slug].downloadUrl}
        />
      )}

      {/* Workflow Section */}
      <section className="service-step-section">
        <div className="container">
          <div className="service-step-main section-spacing">
            <div className="grid-step">
              <div className="step-title">
                <div className="step-title-inner">
                  <div className="pre-section-title-wrap">
                    <div className="pre-section-title-inner">
                      <div className="pre-section-title-square"></div>
                      <div className="pre-section-title">Simple & Transparent</div>
                    </div>
                  </div>
                  <h2 className="section-title">Our <span className="text-linear-gradient">proven</span> engineering path</h2>
                </div>
                <div className="step-button">
                  <Link to="/contact" className="btn-premium">
                    Request Assessment
                    <span className="premium-arrow"><ArrowRight size={18} /></span>
                  </Link>
                </div>
              </div>

              <div className="step-right-info">
                {service.workflow.map((stepData, idx) => {
                  let clsName = "step-info-inner";
                  if (idx === 0) clsName += " bg-primary text-white";
                  if (idx === 1) clsName += " bg-white text-primary";

                  return (
                    <div className={clsName} key={idx}>
                      <div className="step-title-wrap">
                        <div className={`step-number ${idx === 0 || idx === 2 ? 'text-white' : ''}`}>{stepData.step}</div>
                        <h3 className={`step-title-one ${idx === 0 || idx === 2 ? 'text-white' : 'text-primary'}`}>{stepData.title}</h3>
                        {stepData.desc && (
                          <p className="step-description" style={{ marginTop: '0.8rem', fontSize: '1rem', color: idx === 1 ? 'var(--clr-text-muted)' : 'rgba(255,255,255,0.85)', lineHeight: '1.5' }}>
                            {stepData.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="service-faq-section section-spacing">
        <div className="container-small">
          <div className="service-faq-main">
            <div className="section-title-center">
              <div className="pre-section-title-wrap">
                <div className="pre-section-title-inner">
                  <div className="pre-section-title-square"></div>
                  <div className="pre-section-title">Common questions</div>
                </div>
              </div>
              <h2 className="section-title title-center">{service.title} FAQs</h2>
            </div>

            <div className="faqs-wrap">
              {service.faqs.map((faq, idx) => (
                <div className={`accordion-item ${activeFaq === idx ? 'expanded' : ''}`} key={idx}>
                  <div className="accordion-heading" onClick={() => toggleFaq(idx)}>
                    <h3 className="accordion-title">{faq.q}</h3>
                    <div className="accordion-icon-bg">
                      <Plus className="plus-icon" size={24} style={{ transform: activeFaq === idx ? 'rotate(45deg)' : 'rotate(0)' }} />
                    </div>
                  </div>
                  <div className="accordion-content" style={{ display: activeFaq === idx ? 'block' : 'none' }}>
                    <div className="accordion-description w-richtext">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section dark-section">
        <div className="container">
          <div className="cta-info text-center" style={{ padding: '1.2rem 0' }}>
            <h2 className="cta-text section-title title-center text-white" style={{ marginBottom: '2rem' }}>
              Start your <span className="text-linear-gradient">engineering</span> project with us
            </h2>
            <div className="cta-button" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/contact" className="btn-premium">
                Get in touch
                <span className="premium-arrow"><ArrowRight size={18} /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
