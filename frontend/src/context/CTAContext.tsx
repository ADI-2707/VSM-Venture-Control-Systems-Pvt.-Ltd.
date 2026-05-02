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
    setActiveButton(buttonLabel);
    setIsGeneralOpen(true);
    trackClick(buttonLabel);
  };

  const openServiceModal = (buttonLabel: string, service?: string) => {
    setActiveButton(buttonLabel);
    setDefaultService(service || "");
    setIsServiceOpen(true);
    trackClick(buttonLabel);
  };

  return (
    <CTAContext.Provider value={{ openGeneralModal, openServiceModal, trackClick }}>
      {children}
      {/* Modals will be rendered here or in a separate component */}
      {isGeneralOpen && (
        <GeneralModal 
          onClose={() => setIsGeneralOpen(false)} 
          sourcePage={pathname}
        />
      )}
      {isServiceOpen && (
        <ServiceModal 
          onClose={() => setIsServiceOpen(false)} 
          sourcePage={pathname}
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

function GeneralModal({ onClose, sourcePage }: { onClose: () => void, sourcePage: string }) {
  const [formData, setFormData] = useState({ full_name: "", email: "", query: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/cta/enquiry", {
        type: "general",
        source_page: sourcePage,
        ...formData
      });
      alert("Your message has been sent. We'll get back to you soon!");
      onClose();
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cta-modal-overlay" onClick={onClose}>
      <div className="cta-modal-content" onClick={e => e.stopPropagation()}>
        <button className="cta-modal-close" onClick={onClose}>&times;</button>
        <h2>Ask a Query</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" required 
              value={formData.full_name} 
              onChange={e => setFormData({...formData, full_name: e.target.value})}
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
          <div className="form-group">
            <label>Your Message / Query</label>
            <textarea 
              required rows={4}
              value={formData.query} 
              onChange={e => setFormData({...formData, query: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
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
        }
        h2 { margin-bottom: 24px; font-weight: 700; }
        .form-group { margin-bottom: 16px; }
        label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; }
        input, textarea {
          width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;
          font-family: inherit;
        }
        button[type="submit"] {
          width: 100%; padding: 14px; background: #3b82f6; color: white;
          border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
          margin-top: 12px; transition: background 0.2s;
        }
        button[type="submit"]:hover { background: #2563eb; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

function ServiceModal({ onClose, sourcePage, defaultService }: { onClose: () => void, sourcePage: string, defaultService: string }) {
  const [formData, setFormData] = useState({ 
    organization_name: "", 
    email: "", 
    material_type: "", 
    line: "", 
    location: "", 
    service_name: defaultService || "" 
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/cta/enquiry", {
        type: "service",
        source_page: sourcePage,
        ...formData
      });
      alert("Enquiry submitted successfully! Our experts will contact you.");
      onClose();
    } catch (error) {
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cta-modal-overlay" onClick={onClose}>
      <div className="cta-modal-content" onClick={e => e.stopPropagation()}>
        <button className="cta-modal-close" onClick={onClose}>&times;</button>
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
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
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
        }
        h2 { margin-bottom: 24px; font-weight: 700; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 16px; }
        label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; }
        input {
          width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;
          font-family: inherit;
        }
        button[type="submit"] {
          width: 100%; padding: 14px; background: #10b981; color: white;
          border: none; border-radius: 8px; font-weight: 600; cursor: pointer;
          margin-top: 12px; transition: background 0.2s;
        }
        button[type="submit"]:hover { background: #059669; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
