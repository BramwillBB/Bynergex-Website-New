import React from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page-v2">
            <div className="contact-header-spacer"></div>
            {/* Background Architectural Grid Lines */}
            <div className="layout-grid-lines">
                <div className="layout-grid-line"></div>
                <div className="layout-grid-line"></div>
                <div className="layout-grid-line"></div>
                <div className="layout-grid-line"></div>
                <div className="layout-grid-line"></div>
            </div>

            <section className="contact-hero-v2">
                <div className="container contact-grid-v2">
                    {/* Left Column: Text Content */}
                    <div className="contact-info-col">
                        <div className="hero-tag-v2">
                            <span className="tag-dot"></span>
                            WHO WE ARE
                        </div>
                        <h1 className="contact-title-v2">
                            We’re <span className="accent-text">ready</span> to listen
                        </h1>
                        <p className="contact-subtitle-v2">
                            Got questions or need assistance? Reach out to us anytime — our 
                            team is ready to provide the support and guidance you need.
                        </p>

                        <div className="contact-action-v2">
                            <button className="btn-black-premium">
                                Download Profile
                                <span className="btn-accent-icon"><ArrowRight size={18} /></span>
                            </button>
                        </div>

                        <div className="contact-details-grid-v2">
                            <div className="contact-detail-group">
                                <h3 className="detail-label">// Contact us on //</h3>
                                <p className="detail-value">+27 66 252 2655</p>
                                <p className="detail-value">consultant@bynergex.com</p>
                            </div>
                            <div className="contact-detail-group">
                                <h3 className="detail-label">// Find us //</h3>
                                <p className="detail-value">Haasendal Estate, Kuils River,</p>
                                <p className="detail-value">Cape Town, 7580</p>
                                <p className="detail-value">33.9249° S, 18.4241° E</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form Card */}
                    <div className="contact-form-col">
                        <div className="contact-form-card">
                            <form className="premium-form-v2" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-row-v2">
                                    <div className="form-group-v2">
                                        <label>First name *</label>
                                        <input type="text" placeholder="" required />
                                    </div>
                                    <div className="form-group-v2">
                                        <label>Last name *</label>
                                        <input type="text" placeholder="" required />
                                    </div>
                                </div>

                                <div className="form-row-v2">
                                    <div className="form-group-v2">
                                        <label>Email address *</label>
                                        <input type="email" placeholder="" required />
                                    </div>
                                    <div className="form-group-v2">
                                        <label>Phone number</label>
                                        <input type="tel" placeholder="" />
                                    </div>
                                </div>

                                <div className="form-group-v2">
                                    <label>Subject</label>
                                    <input type="text" placeholder="" />
                                </div>

                                <div className="form-group-v2">
                                    <label>Message</label>
                                    <textarea placeholder="" rows="4"></textarea>
                                </div>

                                <button type="submit" className="btn-submit-v2">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Services Marquee Section */}
            <section className="logo-marquee-v2">
                <div className="marquee-outer">
                    <div className="marquee-content">
                        <span>POWER SYSTEMS</span> <span className="marquee-dot"></span>
                        <span>SCADA</span> <span className="marquee-dot"></span>
                        <span>CRITICAL POWER</span> <span className="marquee-dot"></span>
                        <span>ENERGY EFFICIENCY</span> <span className="marquee-dot"></span>
                        <span>GRID INTEGRATION</span> <span className="marquee-dot"></span>
                        <span>DATA CENTRES</span> <span className="marquee-dot"></span>
                        <span>OT CYBERSECURITY</span> <span className="marquee-dot"></span>
                        <span>PROTECTION COORDINATION</span> <span className="marquee-dot"></span>
                        {/* Duplicate for infinite effect */}
                        <span>POWER SYSTEMS</span> <span className="marquee-dot"></span>
                        <span>SCADA</span> <span className="marquee-dot"></span>
                        <span>CRITICAL POWER</span> <span className="marquee-dot"></span>
                        <span>ENERGY EFFICIENCY</span> <span className="marquee-dot"></span>
                        <span>GRID INTEGRATION</span> <span className="marquee-dot"></span>
                        <span>DATA CENTRES</span> <span className="marquee-dot"></span>
                        <span>OT CYBERSECURITY</span> <span className="marquee-dot"></span>
                        <span>PROTECTION COORDINATION</span> <span className="marquee-dot"></span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
