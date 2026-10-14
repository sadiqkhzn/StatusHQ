"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Globe, Loader2, Sparkles } from "lucide-react";

interface BusinessInfo {
  name: string;
  type: string;
  website: string;
}

interface BusinessContextStepProps {
  businessInfo: BusinessInfo;
  onUpdate: (info: BusinessInfo) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

const BUSINESS_TYPES = [
  { value: "saas", label: "SaaS / Web App" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "blog", label: "Blog / Content Site" },
  { value: "api", label: "API Service" },
  { value: "marketing", label: "Marketing Site" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "other", label: "Other" }
];

export function BusinessContextStep({ 
  businessInfo, 
  onUpdate, 
  onNext, 
  onPrev, 
  isLoading 
}: BusinessContextStepProps) {
  const [errors, setErrors] = useState<Partial<BusinessInfo>>({});
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);

  const handleInputChange = (field: keyof BusinessInfo, value: string) => {
    const updated = { ...businessInfo, [field]: value };
    onUpdate(updated);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BusinessInfo> = {};
    
    if (!businessInfo.name.trim()) {
      newErrors.name = "Business name is required";
    }
    
    if (!businessInfo.website.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!isValidUrl(businessInfo.website)) {
      newErrors.website = "Please enter a valid website URL";
    }

    if (!businessInfo.type) {
      newErrors.type = "Please select your business type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleAutoDetect = async () => {
    if (!businessInfo.website.trim()) {
      setErrors(prev => ({ ...prev, website: "Please enter your website URL first" }));
      return;
    }

    setIsAutoDetecting(true);
    try {
      // Simulate auto-detection API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here we would call the actual auto-detection service
      // For now, we'll just proceed to next step
      handleNext();
    } catch (error) {
      console.error("Auto-detection failed:", error);
    } finally {
      setIsAutoDetecting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        
        <h2 className="text-2xl font-cal text-slate-900 dark:text-slate-100">
          Tell us about your business
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We'll use this information to customize your monitoring setup and create your status page.
        </p>
      </div>

      {/* Form */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              What's your business name? *
            </Label>
            <Input
              id="businessName"
              placeholder="e.g., Acme Corp"
              value={businessInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? "border-red-300 focus-visible:ring-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This will appear on your status page and in notifications
            </p>
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              What type of business is this? *
            </Label>
            <Select 
              value={businessInfo.type} 
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger className={errors.type ? "border-red-300 focus:ring-red-500" : ""}>
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.type}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This helps us provide relevant monitoring recommendations
            </p>
          </div>

          {/* Website URL */}
          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Your main website URL *
            </Label>
            <Input
              id="website"
              placeholder="https://your-website.com"
              value={businessInfo.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className={errors.website ? "border-red-300 focus-visible:ring-red-500" : ""}
            />
            {errors.website && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.website}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We'll use this to automatically discover services to monitor
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Auto-detect Section */}
      {businessInfo.website && isValidUrl(businessInfo.website) && (
        <Card className="max-w-2xl mx-auto border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Ready for automatic detection?
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  We can scan your website and automatically find services to monitor. This usually takes just a few seconds.
                </p>
                <Button
                  onClick={handleAutoDetect}
                  disabled={isAutoDetecting}
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                >
                  {isAutoDetecting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Auto-detect Services
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
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
          onClick={handleNext}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}