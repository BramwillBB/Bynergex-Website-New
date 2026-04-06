import React, { useState } from 'react';
import { Download, X, ArrowRight } from 'lucide-react';
import './LeadMagnetBanner.css';

const LeadMagnetBanner = ({ heading, title, description, buttonText, downloadUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: reset form on close
    // setFormData({ name: '', email: '', company: '' });
    // setIsSubmitted(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setIsSubmitted(true);
  };

  return (
    <>
      <section className="lead-magnet-banner">
        <div className="container banner-grid">
          <div className="banner-left">
            <span className="banner-tag">{heading}</span>
            <h3 className="banner-title">{title}</h3>
          </div>
          <div className="banner-center">
            <p className="banner-desc">{description}</p>
          </div>
          <div className="banner-right">
            <button className="btn-magnet" onClick={handleOpenModal}>
              {buttonText}
              <Download size={18} className="magnet-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal / Inline expansion logic */}
      {isModalOpen && (
        <div className="magnet-modal-overlay" onClick={handleCloseModal}>
          <div className="magnet-modal-content" onClick={e => e.stopPropagation()}>
            <button className="magnet-modal-close" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            
            <div className="magnet-modal-header">
              <h4>Get Your {heading}</h4>
              <p>Please enter your details to access the document instantly.</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="magnet-form">
                <div className="magnet-form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="magnet-form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    required 
                    value={formData.company} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="magnet-form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                <button type="submit" className="btn-magnet btn-magnet-submit">
                  Access Document Now <ArrowRight size={18} className="magnet-icon" />
                </button>
              </form>
            ) : (
              <div className="magnet-success">
                <div className="success-icon">✓</div>
                <h4>Thank You!</h4>
                <p>Your document is ready for download.</p>
                <a href={downloadUrl} download className="btn-magnet btn-magnet-submit btn-download-direct">
                  Download PDF Now <Download size={18} className="magnet-icon" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LeadMagnetBanner;
