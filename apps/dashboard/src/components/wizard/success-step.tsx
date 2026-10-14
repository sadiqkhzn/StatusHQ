"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ExternalLink, Eye, Settings, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SuccessStepProps {
  statusPageUrl?: string;
  dashboardUrl?: string;
  businessName?: string;
}

export function SuccessStep({ 
  statusPageUrl = "status.your-company.statushq.com",
  dashboardUrl = "/monitors",
  businessName = "Your Company"
}: SuccessStepProps) {
  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-3xl font-cal text-slate-900 dark:text-slate-100">
          🎉 You're all set!
        </h2>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          StatusHQ is now monitoring your services. We'll alert you immediately if anything goes down.
        </p>
      </div>

      {/* Quick Stats */}
      <Card className="max-w-2xl mx-auto border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">2 min</div>
              <p className="text-sm text-green-600 dark:text-green-400">Setup time</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">5 min</div>
              <p className="text-sm text-green-600 dark:text-green-400">Check frequency</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">24/7</div>
              <p className="text-sm text-green-600 dark:text-green-400">Monitoring</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Status Page Card */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  View Your Status Page
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Share this public page with your customers to keep them informed about service status.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span>{statusPageUrl}</span>
                </div>
                <Button variant="outline" size="sm" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20" asChild>
                  <Link href={`https://${statusPageUrl}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Status Page
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Card */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Manage Your Monitors
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Add more services, configure notifications, view detailed uptime reports and analytics.
                </p>
                <Button variant="outline" size="sm" className="group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20" asChild>
                  <Link href={dashboardUrl}>
                    <Settings className="w-4 h-4 mr-2" />
                    View Monitors
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
            What happens next?
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  We're checking your services every 5 minutes
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You'll see real-time status updates in your dashboard
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Instant alerts if anything goes down
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You'll be notified via your chosen method immediately
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">
                  Your status page is live and ready
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Customers can check {statusPageUrl} anytime for updates
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center pt-8">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
          asChild
        >
          <Link href={dashboardUrl}>
            <Zap className="w-5 h-5 mr-2" />
            Start Monitoring
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          Welcome to {businessName} powered by StatusHQ
        </p>
      </div>
    </div>
  );
}