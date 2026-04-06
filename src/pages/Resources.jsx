import React from 'react';
import { Download } from 'lucide-react';
import './Resources.css';

const resourcesData = [
  {
    tag: 'Guide',
    title: '10 Technical Questions to Answer Before Investing in Solar PV or Battery Storage',
    description: 'An independent guide covering grid compliance, protection coordination, system sizing, tariff modelling, and professional liability. Essential reading before committing capital.',
    button: 'Download Guide',
    link: '/downloads/bynergex-solar-pv-bess-guide.pdf'
  },
  {
    tag: 'Checklist',
    title: 'Is Your SCADA System a Liability? A 15-Point Security and Health Check',
    description: 'Score your control system across documentation, network security, hardware lifecycle, and operational effectiveness. Identify the gaps before they become incidents.',
    button: 'Download Checklist',
    link: '/downloads/bynergex-scada-health-check.pdf'
  },
  {
    tag: 'Checklist',
    title: '12 Questions to Assess Your Critical Power Infrastructure',
    description: 'Evaluate your UPS systems, standby generators, transfer switches, and power distribution. A structured self-assessment for facility managers and operations teams.',
    button: 'Download Checklist',
    link: '/downloads/bynergex-critical-power-checklist.pdf'
  },
  {
    tag: 'Guide',
    title: '5 Ways South African Businesses Overpay for Electricity Without Knowing It',
    description: 'Covers power factor penalties, wrong tariffs, oversized motors, inefficient lighting, and demand peaks. Includes savings estimates for a typical R100,000 monthly electricity bill.',
    button: 'Download Guide',
    link: '/downloads/bynergex-electricity-overpayment-guide.pdf'
  }
];

const Resources = () => {
  return (
    <div className="resources-page section-spacing-top">
      {/* Background Architectural Grid Lines */}
      <div className="layout-grid-lines">
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
        <div className="layout-grid-line"></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="resources-header animate-slide-up">
          <div className="pre-section-title-wrap">
            <div className="pre-section-title-inner">
              <div className="pre-section-title-square"></div>
              <div className="pre-section-title">Knowledge Library</div>
            </div>
          </div>
          <h1 className="resources-title">Resources</h1>
          <p className="resources-subtitle">Independent engineering guides and self-assessment tools for South African businesses.</p>
        </div>

        <div className="resources-grid section-spacing-bottom">
          {resourcesData.map((item, idx) => (
            <div className="resource-card" key={idx}>
              <span className="resource-tag">{item.tag}</span>
              <h3 className="resource-card-title">{item.title}</h3>
              <p className="resource-card-desc">{item.description}</p>
              <a href={item.link} download className="btn-magnet resource-btn">
                {item.button}
                <Download size={18} className="magnet-icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
