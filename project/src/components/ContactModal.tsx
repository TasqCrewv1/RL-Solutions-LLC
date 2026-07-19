import { useState, useEffect, useRef } from 'react';
import { X, Loader2, Check, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      lastFocused.current?.focus();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setError(null);
      setName(''); setEmail(''); setPhone(''); setSubject(''); setMessage(''); setHoneypot('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async () => {
    if (honeypot) return;
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert({
          name: name.trim(), email: email.trim(), phone: phone.trim() || null,
          subject: subject.trim() || null, message: message.trim(),
        });
      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div ref={modalRef} className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-scale-in">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close contact form"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <Check size={32} strokeWidth={2} />
            </div>
            <h2 id="contact-modal-title" className="mt-6 font-display text-2xl font-600 text-slate-900">Message sent</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 text-pretty">
              Thanks, {name.split(' ')[0]}. We'll get back to you shortly.
            </p>
            <button onClick={onClose} className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-slate-800">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="contact-modal-title" className="font-display text-2xl font-600 tracking-tight text-slate-900">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Got a question or not sure where to start? Tell us what's going on and we'll get back to you.
            </p>

            {/* Honeypot */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-label="Leave this field empty" />

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="modal-name" className="mb-1.5 block text-sm font-600 text-slate-700">
                  Name <span className="text-orange-500">*</span>
                </label>
                <input id="modal-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith" aria-required="true"
                  className="w-full rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="modal-email" className="mb-1.5 block text-sm font-600 text-slate-700">
                    Email <span className="text-orange-500">*</span>
                  </label>
                  <input id="modal-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@email.com" aria-required="true"
                    className="w-full rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="modal-phone" className="mb-1.5 block text-sm font-600 text-slate-700">Phone</label>
                  <input id="modal-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="(302) 555-1234"
                    className="w-full rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="modal-subject" className="mb-1.5 block text-sm font-600 text-slate-700">Subject</label>
                <input id="modal-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
                  placeholder="What's this about?"
                  className="w-full rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none" />
              </div>
              <div>
                <label htmlFor="modal-message" className="mb-1.5 block text-sm font-600 text-slate-700">
                  Message <span className="text-orange-500">*</span>
                </label>
                <textarea id="modal-message" value={message} onChange={(e) => setMessage(e.target.value)}
                  rows={4} placeholder="Tell us how we can help..." aria-required="true"
                  className="w-full resize-none rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-orange-500 focus:outline-none" />
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-500 text-red-700" role="alert">
                {error}
              </div>
            )}

            <button onClick={submit} disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3.5 text-base font-600 text-white shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
              {submitting ? (<><Loader2 size={18} className="animate-spin" /> Sending...</>) : (<><Send size={18} /> Send message</>)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
