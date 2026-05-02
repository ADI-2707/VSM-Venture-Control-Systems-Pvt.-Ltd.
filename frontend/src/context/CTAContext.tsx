"use client";

import React, { createContext, useContext, useState } from "react";
import api from "@/utils/axios";
import { usePathname } from "next/navigation";

interface CTAContextType {
  openGeneralModal: (buttonLabel: string) => void;
  openServiceModal: (buttonLabel: string, defaultService?: string) => void;
  trackClick: (buttonLabel: string) => Promise<void>;
}

const CTAContext = createContext<CTAContextType | undefined>(undefined);

export function CTAProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isGeneralOpen, setIsGeneralOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [defaultService, setDefaultService] = useState("");

  const trackClick = async (buttonLabel: string) => {
    try {
      await api.post("/cta/click", {
        button_label: buttonLabel,
        page_path: pathname,
      });
    } catch (error) {
      console.error("Failed to track CTA click:", error);
    }
  };

  const openGeneralModal = (buttonLabel: string) => {
  const openGeneralModal = (buttonLabel: string, customSource?: string) => {
    const page = customSource || pathname;
    setSourcePage(page);
    setActiveButton(buttonLabel);
    setGeneralOpen(true);
    trackClick(buttonLabel, page);
  };

  const openServiceModal = (buttonLabel: string, serviceName: string = "", customSource?: string) => {
    const page = customSource || pathname;
    setSourcePage(page);
    setActiveButton(buttonLabel);
    setDefaultService(serviceName);
    setServiceOpen(true);
    trackClick(buttonLabel, page);
  };

  return (
    <CTAContext.Provider value={{ openGeneralModal, openServiceModal }}>
      {children}
      {generalOpen && (
        <GeneralModal 
          onClose={() => setGeneralOpen(false)} 
          sourcePage={sourcePage} 
          buttonLabel={activeButton}
        />
      )}
      {serviceOpen && (
        <ServiceModal 
          onClose={() => setServiceOpen(false)} 
          sourcePage={sourcePage} 
          buttonLabel={activeButton}
          defaultService={defaultService} 
        />
      )}
    </CTAContext.Provider>
  );
}

export function useCTA() {
  const context = useContext(CTAContext);
  if (!context) throw new Error("useCTA must be used within CTAProvider");
  return context;
}

function GeneralModal({ onClose, sourcePage, buttonLabel }: { onClose: () => void, sourcePage: string, buttonLabel: string }) {
  const [formData, setFormData] = useState({ full_name: "", email: "", query: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const MAX_CHARS = 500;

  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (success) return;
    setShaking(true);
    setShowError(true);
    setTimeout(() => {
      setShaking(false);
      setShowError(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/cta/enquiry", {
        type: "general",
        source_page: sourcePage,
        button_label: buttonLabel,
        ...formData
      });
      setSuccess(true);
      setTimeout(onClose, 3000);
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cta-modal-overlay" onClick={handleOutsideClick}>
      <div className={`cta-modal-content ${shaking ? "shake" : ""}`} onClick={e => e.stopPropagation()}>
        <button className={`cta-modal-close ${showError ? "error" : ""}`} onClick={onClose}>&times;</button>
        
        {success ? (
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
            <button className="done-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2>Ask a Query</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" required 
                  value={formData.full_name} 
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" required 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <div className="label-row">
                  <label>Your Message / Query</label>
                  <span className={`char-count ${formData.query.length >= MAX_CHARS ? 'limit' : ''}`}>
                    {formData.query.length}/{MAX_CHARS}
                  </span>
                </div>
                <textarea 
                  required rows={4}
                  maxLength={MAX_CHARS}
                  value={formData.query} 
                  onChange={e => setFormData({...formData, query: e.target.value})}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <div className="button-wrapper">
                <button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style jsx>{`
        .cta-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(4px);
        }
        .cta-modal-content {
          background: white;
          padding: 32px;
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .cta-modal-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; font-size: 24px; cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
        }
        .cta-modal-close.error {
          color: #ef4444;
          transform: scale(1.2);
        }
        h2 { margin-bottom: 24px; font-weight: 700; color: #0f172a; }
        .form-group { margin-bottom: 16px; }
        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        label { font-size: 14px; font-weight: 600; color: #475569; }
        .char-count { font-size: 12px; color: #94a3b8; }
        .char-count.limit { color: #ef4444; font-weight: 700; }
        input, textarea {
          width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;
          font-family: inherit; font-size: 14px; transition: all 0.2s;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #1f8acb;
          box-shadow: 0 0 0 3px rgba(31, 138, 203, 0.1);
        }
        .button-wrapper {
          display: flex;
          justify-content: flex-start;
          margin-top: 24px;
        }
        button[type="submit"], .done-btn {
          padding: 14px 32px; 
          background: #1f8acb; 
          color: white;
          border: none; border-radius: 8px; font-weight: 700; cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(31, 138, 203, 0.2);
        }
        button[type="submit"]:hover, .done-btn:hover { 
          background: #1777af;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(31, 138, 203, 0.3);
        }
        button:disabled { opacity: 0.6; cursor: not-allowed; }

        .success-content {
          text-align: center;
          padding: 20px 0;
        }
        .success-icon {
          width: 64px; height: 64px;
          background: #10b981;
          color: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px;
          margin: 0 auto 24px;
          animation: scaleIn 0.3s ease-out;
        }
        .success-content h2 { margin-bottom: 12px; }
        .success-content p { color: #475569; margin-bottom: 32px; }

        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-8px); }
        }
        .shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}

function ServiceModal({ onClose, sourcePage, buttonLabel, defaultService }: { onClose: () => void, sourcePage: string, buttonLabel: string, defaultService: string }) {
  const [formData, setFormData] = useState({ 
    organization_name: "", 
    email: "", 
    material_type: "", 
    line: "", 
    location: "", 
    service_name: defaultService || "" 
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service_name: defaultService }));
    }
  }, [defaultService]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (success) return;
    setShaking(true);
    setShowError(true);
    setTimeout(() => {
      setShaking(false);
      setShowError(false);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/cta/enquiry", {
        type: "service",
        source_page: sourcePage,
        button_label: buttonLabel,
        ...formData
      });
      setSuccess(true);
      setTimeout(onClose, 3000);
    } catch (error) {
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cta-modal-overlay" onClick={handleOutsideClick}>
      <div className={`cta-modal-content ${shaking ? "shake" : ""}`} onClick={e => e.stopPropagation()}>
        <button className={`cta-modal-close ${showError ? "error" : ""}`} onClick={onClose}>&times;</button>
        
        {success ? (
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Enquiry Submitted!</h2>
            <p>Thank you for your interest. Our experts will review your request and contact you shortly.</p>
            <button className="done-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2>Service Enquiry</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid">
                <div className="form-group">
                  <label>Organization Name</label>
                  <input 
                    type="text" required 
                    value={formData.organization_name} 
                    onChange={e => setFormData({...formData, organization_name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid">
                <div className="form-group">
                  <label>Material Type</label>
                  <input 
                    type="text" required 
                    value={formData.material_type} 
                    onChange={e => setFormData({...formData, material_type: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Line</label>
                  <input 
                    type="text" required 
                    value={formData.line} 
                    onChange={e => setFormData({...formData, line: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Service Required</label>
                <input 
                  type="text" required 
                  value={formData.service_name} 
                  onChange={e => setFormData({...formData, service_name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Location (Optional)</label>
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="button-wrapper">
                <button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style jsx>{`
        .cta-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(4px);
        }
        .cta-modal-content {
          background: white;
          padding: 32px;
          border-radius: 16px;
          width: 100%;
          max-width: 600px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .cta-modal-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; font-size: 24px; cursor: pointer;
          transition: all 0.2s;
          color: #64748b;
        }
        .cta-modal-close.error {
          color: #ef4444;
          transform: scale(1.2);
        }
        h2 { margin-bottom: 24px; font-weight: 700; color: #0f172a; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 16px; }
        label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 600; color: #475569; }
        input {
          width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;
          font-family: inherit; font-size: 14px; transition: all 0.2s;
        }
        input:focus {
          outline: none;
          border-color: #1f8acb;
          box-shadow: 0 0 0 3px rgba(31, 138, 203, 0.1);
        }
        .button-wrapper {
          display: flex;
          justify-content: flex-start;
          margin-top: 24px;
        }
        button[type="submit"], .done-btn {
          padding: 14px 32px; 
          background: #1f8acb; 
          color: white;
          border: none; border-radius: 8px; font-weight: 700; cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(31, 138, 203, 0.2);
        }
        button[type="submit"]:hover, .done-btn:hover { 
          background: #1777af;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(31, 138, 203, 0.3);
        }
        button:disabled { opacity: 0.6; cursor: not-allowed; }

        .success-content {
          text-align: center;
          padding: 20px 0;
        }
        .success-icon {
          width: 64px; height: 64px;
          background: #10b981;
          color: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px;
          margin: 0 auto 24px;
          animation: scaleIn 0.3s ease-out;
        }
        .success-content h2 { margin-bottom: 12px; }
        .success-content p { color: #475569; margin-bottom: 32px; }

        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-8px); }
        }
        .shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
