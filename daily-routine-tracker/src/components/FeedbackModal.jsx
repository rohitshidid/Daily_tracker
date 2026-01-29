import React from 'react';
import { X, Send, MessageSquarePlus } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // STOP: You must replace 'YOUR_FORM_ID' with your actual Formspree Form ID
    // Get one for free at https://formspree.io/
    const FORMSPREE_ID = "xreklzqv";

    const handleSubmit = (e) => {
        // We let the form submit naturally to Formspree
        // If you want an AJAX submission to avoid redirect, we can add that logic,
        // but the default redirect is simpler for basic setup.
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-scale-in">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <div className="flex items-center gap-2">
                        <MessageSquarePlus className="text-[var(--accent-primary)]" size={20} />
                        <h2 className="font-bold text-lg">Request Feature</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-[var(--bg-input)] rounded-lg transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    action={`https://formspree.io/f/${FORMSPREE_ID}`}
                    method="POST"
                    className="p-4 flex flex-col gap-4"
                >
                    {/* Helpful Note using GitHub Alert style */}
                    {FORMSPREE_ID === "YOUR_FORM_ID" && (
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-xs">
                            <strong>Setup Required:</strong> Please replace 'YOUR_FORM_ID' in FeedbackModal.jsx with your actual Formspree ID.
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            required
                            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Feature Request / Feedback</label>
                        <textarea
                            name="message"
                            rows="4"
                            required
                            placeholder="I wish the app could..."
                            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            <Send size={16} />
                            Submit Request
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default FeedbackModal;
