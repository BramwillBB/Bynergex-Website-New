import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Building, BatteryCharging, ShieldCheck, Zap, Activity } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    id: 1,
    title: 'Renewable Energy & Solar PV',
    desc: 'Comprehensive solar PV feasibility, system design, and grid integration for commercial and industrial applications.',
    icon: <Sun size={32} />,
    slug: 'renewable-energy'
  },
  {
    id: 2,
    title: 'Building Services Engineering',
    desc: 'Complete MV & LV distribution, lighting design, and building management system integration.',
    icon: <Building size={32} />,
    slug: 'building-services'
  },
  {
    id: 3,
    title: 'Standby Power & UPS',
    desc: 'Specialized design for critical infrastructure including generators, UPS, and automatic transfer switches.',
    icon: <Zap size={32} />,
    slug: 'standby-power'
  },
  {
    id: 4,
    title: 'BESS Consulting',
    desc: 'Battery Energy Storage Systems performance modelling, lifecycle costing, and electrical integration.',
    icon: <BatteryCharging size={32} />,
    slug: 'bess-consulting'
  },
  {
    id: 5,
    title: 'Electrical Compliance & Audits',
    desc: 'SANS 10142 compliance inspections, OHS Act assessments, and rigorous safety auditing.',
    icon: <ShieldCheck size={32} />,
    slug: 'compliance-audits'
  },
  {
    id: 6,
    title: 'Asset Condition Assessments',
    desc: 'Electrical asset lifecycle evaluation, due diligence, and power quality analysis.',
    icon: <Activity size={32} />,
    slug: 'asset-assessments'
  }
];

const Services = () => {
  return (
    <div className="services-page animate-fade-in">
      <section className="page-hero darker-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1>Our Services</h1>
            <p className="lead-text">
              Expert electrical engineering consulting services powered by 26+ years of industry experience. Trusted by clients for critical infrastructure and renewable integration.
            </p>
          </div>
        </div>
      </section>

      <section className="section services-grid-section">
        <div className="container">
          <div className="services-grid">
            {servicesData.map((service, idx) => (
              <div className="service-card" key={service.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="service-icon-wrapper">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to={`/contact`} className="service-link">
                  <span className="link-text">Learn more</span>
                  <span className="link-arrow"><ArrowRight size={18} /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section dark-section">
        <div className="container text-center">
          <h2>Ready to start your next project?</h2>
          <p className="cta-desc">Partner with Bynergex Consulting to bring technical excellence to your infrastructure.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">Schedule Now</Link>
            <Link to="/about" className="btn btn-secondary">Learn About Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
