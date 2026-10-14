"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Globe, Server, Database, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface DetectedService {
  id: string;
  name: string;
  url: string;
  type: "website" | "api" | "database";
  method: "GET" | "POST" | "HEAD";
  enabled: boolean;
  confidence: "high" | "medium" | "low";
  status?: "healthy" | "unhealthy" | "unknown";
}

interface BusinessInfo {
  name: string;
  type: string;
  website: string;
}

interface ServiceDiscoveryStepProps {
  businessInfo: BusinessInfo;
  services: DetectedService[];
  onUpdate: (services: DetectedService[]) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export function ServiceDiscoveryStep({
  businessInfo,
  services,
  onUpdate,
  onNext,
  onPrev,
  isLoading
}: ServiceDiscoveryStepProps) {
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'website': return Globe;
      case 'api': return Server;
      case 'database': return Database;
      default: return Server;
    }
  };

  const getConfidenceBadge = (confidence: string) => {
    const variants = {
      high: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    };
    return variants[confidence as keyof typeof variants] || variants.low;
  };

  const toggleService = (serviceId: string) => {
    const updated = services.map(service =>
      service.id === serviceId ? { ...service, enabled: !service.enabled } : service
    );
    onUpdate(updated);
  };

  // Mock detected services - in real implementation, this would come from API
  const mockServices: DetectedService[] = [
    {
      id: "1",
      name: "Main Website",
      url: businessInfo.website,
      type: "website",
      method: "GET",
      enabled: true,
      confidence: "high",
      status: "healthy"
    },
    {
      id: "2", 
      name: "API Service",
      url: `${businessInfo.website}/api/health`,
      type: "api",
      method: "GET", 
      enabled: true,
      confidence: "medium",
      status: "healthy"
    }
  ];

  // Use mock services if none provided
  const displayServices = services.length > 0 ? services : mockServices;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Server className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-2xl font-cal text-slate-900 dark:text-slate-100">
          Services found for monitoring
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We've detected these services to monitor. You can enable or disable any of them, or add additional services manually.
        </p>
      </div>

      {/* Detected Services */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {displayServices.map((service) => {
          const IconComponent = getServiceIcon(service.type);
          
          return (
            <Card key={service.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={service.enabled}
                        onCheckedChange={() => toggleService(service.id)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">
                          {service.name}
                        </h3>
                        {service.status === "healthy" && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {service.url}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {service.method}
                        </Badge>
                        <Badge className={`text-xs ${getConfidenceBadge(service.confidence)}`}>
                          {service.confidence} confidence
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {service.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add Manual Service Card */}
        <Card className="border-2 border-dashed border-slate-300 dark:border-slate-700">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Server className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                  Add Another Service
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Monitor additional APIs, databases, or services not automatically detected
                </p>
                <Button variant="outline" size="sm">
                  Add Service Manually
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="max-w-2xl mx-auto bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 text-center">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Ready to monitor {displayServices.filter(s => s.enabled).length} services
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            We'll check these services every 5 minutes and alert you if any go down.
          </p>
        </CardContent>
      </Card>

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
          onClick={onNext}
          disabled={isLoading || displayServices.filter(s => s.enabled).length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Setting up...
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