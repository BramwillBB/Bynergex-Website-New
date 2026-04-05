const About = () => {
  return (
    <div className="about-page animate-fade-in">
      <section className="page-hero darker-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1>About Bynergex</h1>
            <p className="lead-text">
              A specialized electrical engineering consultancy built on decades of critical infrastructure experience.
            </p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '24px' }}>Our Expertise</h2>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: '16px' }}>
              Founded by an ECSA-registered Professional Engineer with over 26 years of industry experience, Bynergex Consulting was established to address the critical gaps in South Africa's evolving energy landscape.
            </p>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: '16px' }}>
              Our foundation lies in rigorous technical backgrounds, particularly within telecommunications sites, critical standby power (UPS/Generators), and facility maintenance. Today, we leverage this expertise to guide commercial and industrial clients through complex electrical infrastructure designs, renewable energy (Solar PV & BESS) adoption, and stringent compliance audits.
            </p>
            <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Our Values</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '24px', color: 'var(--clr-text-muted)' }}>
              <li style={{ marginBottom: '8px' }}><strong>Technical Integrity:</strong> Uncompromising adherence to SANS and international standards.</li>
              <li style={{ marginBottom: '8px' }}><strong>Agility & Precision:</strong> The responsiveness of a specialized consultancy with the rigour of a large enterprise.</li>
              <li style={{ marginBottom: '8px' }}><strong>Future-Focused:</strong> Leading the transition to resilient, renewable-integrated power systems.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
