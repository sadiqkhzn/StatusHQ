"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Globe, Loader2 } from "lucide-react";

interface StatusPageStepProps {
  statusPage: any;
  businessInfo: any;
  services: any[];
  onUpdate: (statusPage: any) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export function StatusPageStep({
  statusPage,
  businessInfo,
  onUpdate,
  onNext,
  onPrev,
  isLoading
}: StatusPageStepProps) {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({
      ...statusPage,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        
        <h2 className="text-2xl font-cal text-slate-900 dark:text-slate-100">
          Create your status page
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your customers can check this page to see if your services are running smoothly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Configuration */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label>Status Page URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-slate-50 dark:bg-slate-800 text-sm">
                  status.
                </span>
                <Input
                  value={statusPage.subdomain || ""}
                  onChange={(e) => handleInputChange("subdomain", e.target.value)}
                  placeholder="your-company"
                  className="rounded-l-none"
                />
                <span className="inline-flex items-center px-3 py-2 border border-l-0 rounded-r-md bg-slate-50 dark:bg-slate-800 text-sm">
                  .statushq.com
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input
                value={statusPage.title || `${businessInfo.name} Status`}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Your Company Status"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={statusPage.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Current status of our services"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-2 border-dashed border-slate-300 dark:border-slate-700">
          <CardContent className="p-8">
            <div className="space-y-4">
              <h3 className="font-medium text-slate-900 dark:text-slate-100">
                Preview
              </h3>
              <div className="bg-white dark:bg-slate-800 border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {statusPage.title || `${businessInfo.name} Status`}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {statusPage.description || "Current status of our services"}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="text-sm">Website</span>
                    <span className="text-xs text-green-600 dark:text-green-400">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <span className="text-sm">API</span>
                    <span className="text-xs text-green-600 dark:text-green-400">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between max-w-2xl mx-auto pt-8">
        <Button 
          variant="outline" 
          onClick={onPrev}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Create Status Page
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}