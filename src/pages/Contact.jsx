import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in">
      <section className="page-hero darker-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1>Get in Touch</h1>
            <p className="lead-text">
              Reach out to discuss how Bynergex Consulting can add value to your next electrical engineering project.
            </p>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container" style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ marginBottom: '24px' }}>Contact Details</h2>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: '32px' }}>
              Whether you need compliance audits, critical power infrastructure design, or renewable energy integration, we are here to help.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--clr-bg-light)', borderRadius: 'var(--radius-sm)', color: 'var(--clr-primary)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Headquarters</h4>
                  <p style={{ color: 'var(--clr-text-muted)', margin: 0 }}>Western Cape, South Africa</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--clr-bg-light)', borderRadius: 'var(--radius-sm)', color: 'var(--clr-primary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Phone</h4>
                  <p style={{ color: 'var(--clr-text-muted)', margin: 0 }}>+27 (0) 00 000 0000</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--clr-bg-light)', borderRadius: 'var(--radius-sm)', color: 'var(--clr-primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Email</h4>
                  <p style={{ color: 'var(--clr-text-muted)', margin: 0 }}>info@bynergex.co.za</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 500px', backgroundColor: 'var(--clr-bg-white)', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <h3 style={{ marginBottom: '24px' }}>Send a Message</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Project Details / Inquiry</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
