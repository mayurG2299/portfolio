"use client";

import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Simple validation
    const newErrors: Record<string, boolean> = {};
    ["name", "email", "subject", "message"].forEach((field) => {
      if (!formData.get(field)) newErrors[field] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch(portfolioData.contact.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const getBorderColor = (field: string) => 
    errors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent)]/20";

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 mb-12">
      <AnimatedSection id="contact">
        <div className="max-w-2xl mx-auto">
          <SectionHeading>Get In Touch</SectionHeading>
          
          <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed font-body">
            I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-heading font-bold text-[var(--text)] mb-2">Message Sent!</h3>
                <p className="text-[var(--text-muted)]">Thanks, I&apos;ll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded hover:bg-[var(--bg-card-hover)] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[var(--text-muted)]">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={() => setErrors(prev => ({...prev, name: false}))}
                      className={`w-full px-4 py-3 bg-[var(--bg-card)] text-[var(--text)] border rounded-md focus:outline-none focus:ring-2 transition-colors ${getBorderColor("name")}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--text-muted)]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={() => setErrors(prev => ({...prev, email: false}))}
                      className={`w-full px-4 py-3 bg-[var(--bg-card)] text-[var(--text)] border rounded-md focus:outline-none focus:ring-2 transition-colors ${getBorderColor("email")}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[var(--text-muted)]">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    onChange={() => setErrors(prev => ({...prev, subject: false}))}
                    className={`w-full px-4 py-3 bg-[var(--bg-card)] text-[var(--text)] border rounded-md focus:outline-none focus:ring-2 transition-colors ${getBorderColor("subject")}`}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--text-muted)]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    onChange={() => setErrors(prev => ({...prev, message: false}))}
                    className={`w-full px-4 py-3 bg-[var(--bg-card)] text-[var(--text)] border rounded-md focus:outline-none focus:ring-2 transition-colors resize-y ${getBorderColor("message")}`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again later.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-8 py-3 bg-[var(--accent)] text-white font-medium rounded-sm hover:bg-amber-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>
    </div>
  );
}
