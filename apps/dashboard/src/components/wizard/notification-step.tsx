"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Mail, MessageSquare, Phone, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface NotificationConfig {
  email: boolean;
  emailAddress?: string;
  slack: boolean;
  slackChannel?: string;
  sms: boolean;
  smsNumber?: string;
}

interface NotificationStepProps {
  notifications: NotificationConfig;
  businessInfo: any;
  onUpdate: (notifications: NotificationConfig) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export function NotificationStep({
  notifications,
  onUpdate,
  onNext,
  onPrev,
  isLoading
}: NotificationStepProps) {
  const handleMethodChange = (method: string) => {
    onUpdate({
      ...notifications,
      email: method === "email",
      slack: method === "slack",
      sms: method === "sms"
    });
  };

  const getSelectedMethod = () => {
    if (notifications.slack) return "slack";
    if (notifications.sms) return "sms";
    return "email";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
          <MessageSquare className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        
        <h2 className="text-2xl font-cal text-slate-900 dark:text-slate-100">
          How should we notify you?
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Choose how you'd like to be alerted when your services go down or come back up.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <RadioGroup 
            value={getSelectedMethod()} 
            onValueChange={handleMethodChange}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="flex items-center gap-3 cursor-pointer flex-1">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Get alerts in your inbox</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <RadioGroupItem value="slack" id="slack" />
              <Label htmlFor="slack" className="flex items-center gap-3 cursor-pointer flex-1">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Slack notifications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Send alerts to your Slack workspace</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <RadioGroupItem value="sms" id="sms" />
              <Label htmlFor="sms" className="flex items-center gap-3 cursor-pointer flex-1">
                <Phone className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">SMS notifications</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Get instant text messages</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

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