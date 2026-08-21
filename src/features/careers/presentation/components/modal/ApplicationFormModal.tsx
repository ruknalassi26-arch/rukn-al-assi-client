"use client";

import React from "react";
import { X } from "lucide-react";
import { JobApplicationSection } from "../detail/JobApplicationSection";

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobPostingId?: string | null;
  jobTitle?: string;
}

export function ApplicationFormModal({
  isOpen,
  onClose,
  jobPostingId = null,
  jobTitle,
}: ApplicationFormModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute end-5 top-5 z-20 p-2 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-1">
          <JobApplicationSection
            jobPostingId={jobPostingId}
            jobTitle={jobTitle}
            onSuccessCallback={onClose}
          />
        </div>
      </div>
    </div>
  );
}
