"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Zap, Clock, Users } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-3xl font-cal text-slate-900 dark:text-slate-100">
          Let's protect your business in 2 minutes
        </h2>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We'll set up monitoring for your website and APIs so you know immediately 
          when something goes wrong—no technical expertise required.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-6 my-12">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Instant Alerts
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get notified via email, Slack, or SMS the moment your site goes down
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Professional Status Page
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Keep customers informed with a beautiful, public status page
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              2-Minute Setup
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              No technical knowledge required—we'll guide you through everything
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What We'll Set Up */}
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="p-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
            What we'll set up together:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Monitor your website
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We'll check if your main website is accessible
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Find your APIs
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We'll automatically detect services to monitor
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Setup notifications
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choose how you want to be alerted when issues occur
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Create status page
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Share uptime info with your customers professionally
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="pt-8">
        <Button
          onClick={onNext}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
        >
          Start Protecting My Business
          <Zap className="w-5 h-5 ml-2" />
        </Button>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          Takes about 2 minutes • No credit card required • Cancel anytime
        </p>
      </div>
    </div>
  );
}