"use client";

import { SetupWizard } from "@/components/wizard/setup-wizard";

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SetupWizard />
    </div>
  );
}