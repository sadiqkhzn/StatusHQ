"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Import wizard steps
import { WelcomeStep } from "./welcome-step";
import { BusinessContextStep } from "./business-context-step";
import { ServiceDiscoveryStep } from "./service-discovery-step";
import { NotificationStep } from "./notification-step";
import { StatusPageStep } from "./status-page-step";
import { SuccessStep } from "./success-step";

// Types
export interface WizardState {
  currentStep: number;
  businessInfo: {
    name: string;
    type: string;
    website: string;
  };
  services: DetectedService[];
  notifications: NotificationConfig;
  statusPage: StatusPageConfig;
  isCompleted: boolean;
}

export interface DetectedService {
  id: string;
  name: string;
  url: string;
  type: "website" | "api" | "database";
  method: "GET" | "POST" | "HEAD";
  enabled: boolean;
  confidence: "high" | "medium" | "low";
  status?: "healthy" | "unhealthy" | "unknown";
}

export interface NotificationConfig {
  email: boolean;
  emailAddress?: string;
  slack: boolean;
  slackChannel?: string;
  sms: boolean;
  smsNumber?: string;
}

export interface StatusPageConfig {
  subdomain: string;
  title: string;
  description: string;
  logo?: string;
  theme: "default" | "minimal" | "corporate";
}

const initialState: WizardState = {
  currentStep: 1,
  businessInfo: {
    name: "",
    type: "",
    website: ""
  },
  services: [],
  notifications: {
    email: true,
    slack: false,
    sms: false
  },
  statusPage: {
    subdomain: "",
    title: "",
    description: "",
    theme: "default"
  },
  isCompleted: false
};

const TOTAL_STEPS = 6;

const stepTitles = [
  "Welcome",
  "Business Info",
  "Discover Services", 
  "Notifications",
  "Status Page",
  "Success"
];

export function SetupWizard() {
  const [state, setState] = useState<WizardState>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => {
    setState(prev => ({ 
      ...prev, 
      currentStep: Math.min(prev.currentStep + 1, TOTAL_STEPS) 
    }));
  };

  const prevStep = () => {
    setState(prev => ({ 
      ...prev, 
      currentStep: Math.max(prev.currentStep - 1, 1) 
    }));
  };

  const updateState = (updates: Partial<WizardState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // Add any validation or API calls here
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      nextStep();
    } catch (error) {
      console.error("Error proceeding to next step:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((state.currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-cal text-slate-900 dark:text-slate-100">
              StatusHQ Setup Wizard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Get your API monitoring up and running in 2 minutes
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <Progress value={progress} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
              {stepTitles.map((title, index) => (
                <span
                  key={index}
                  className={cn(
                    "text-xs",
                    index + 1 === state.currentStep && "font-semibold text-blue-600 dark:text-blue-400",
                    index + 1 < state.currentStep && "text-green-600 dark:text-green-400"
                  )}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {/* Render Current Step */}
              {state.currentStep === 1 && (
                <WelcomeStep 
                  onNext={nextStep}
                />
              )}
              
              {state.currentStep === 2 && (
                <BusinessContextStep
                  businessInfo={state.businessInfo}
                  onUpdate={(businessInfo) => updateState({ businessInfo })}
                  onNext={handleNext}
                  onPrev={prevStep}
                  isLoading={isLoading}
                />
              )}
              
              {state.currentStep === 3 && (
                <ServiceDiscoveryStep
                  businessInfo={state.businessInfo}
                  services={state.services}
                  onUpdate={(services) => updateState({ services })}
                  onNext={handleNext}
                  onPrev={prevStep}
                  isLoading={isLoading}
                />
              )}
              
              {state.currentStep === 4 && (
                <NotificationStep
                  notifications={state.notifications}
                  businessInfo={state.businessInfo}
                  onUpdate={(notifications) => updateState({ notifications })}
                  onNext={handleNext}
                  onPrev={prevStep}
                  isLoading={isLoading}
                />
              )}
              
              {state.currentStep === 5 && (
                <StatusPageStep
                  statusPage={state.statusPage}
                  businessInfo={state.businessInfo}
                  services={state.services}
                  onUpdate={(statusPage) => updateState({ statusPage })}
                  onNext={handleNext}
                  onPrev={prevStep}
                  isLoading={isLoading}
                />
              )}
              
              {state.currentStep === 6 && (
                <SuccessStep
                  statusPageUrl={`status.${state.statusPage.subdomain || 'your-company'}.statushq.com`}
                  dashboardUrl="/monitors"
                  businessName={state.businessInfo.name}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Debug Info (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-sm text-yellow-800 dark:text-yellow-200">
                  Debug Info (Development Only)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-yellow-700 dark:text-yellow-300 overflow-auto">
                  {JSON.stringify(state, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}