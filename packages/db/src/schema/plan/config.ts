import { AVAILABLE_REGIONS, FREE_FLY_REGIONS } from "@openstatus/regions";
import type { WorkspacePlan } from "../workspaces/validation";
import type { Addons, PlanLimits, Price } from "./schema";

type PlanConfig = {
  title: "Free" | "Starter" | "Professional" | "Enterprise";
  id: WorkspacePlan;
  description: string;
  price: Price;
  addons: Partial<Addons>;
  limits: PlanLimits;
};

// StatusHQ Plan Configuration
export const allPlans: Record<WorkspacePlan, PlanConfig> = {
  free: {
    title: "Free",
    id: "free",
    description: "Perfect for getting started with API monitoring",
    price: {
      USD: 0,
      EUR: 0,
      INR: 0,
    },
    addons: {},
    limits: {
      version: undefined,
      monitors: 3,
      "synthetic-checks": 30,
      periodicity: ["10m", "30m", "1h"],
      "multi-region": true,
      "max-regions": 6,
      "data-retention": "14 days",
      "status-pages": 1,
      maintenance: true,
      "monitor-values-visibility": true,
      "response-logs": false,
      screenshots: false,
      otel: false,
      "status-subscribers": false,
      "custom-domain": false,
      "password-protection": false,
      "email-domain-protection": false,
      "white-label": false,
      notifications: true,
      sms: false,
      "sms-limit": 0,
      pagerduty: false,
      opsgenie: false,
      whatsapp: false,
      "notification-channels": 1,
      members: 1,
      "audit-log": false,
      regions: [...FREE_FLY_REGIONS],
      "private-locations": false,
    },
  },
  starter: {
    title: "Starter",
    id: "starter",
    description: "Perfect for founders who need reliable monitoring",
    price: {
      USD: 149,
      EUR: 149,
      INR: 14900,
    },
    addons: {
      "email-domain-protection": {
        price: {
          USD: 100,
          EUR: 100,
          INR: 10_000,
        },
      },
    },
    limits: {
      version: undefined,
      monitors: 5,
      "synthetic-checks": 100,
      periodicity: ["1m", "5m", "10m", "30m", "1h"],
      "multi-region": true,
      "max-regions": 6,
      "data-retention": "3 months",
      "status-pages": 1,
      maintenance: true,
      "monitor-values-visibility": true,
      "response-logs": true,
      screenshots: true,
      otel: false,
      "status-subscribers": true,
      "custom-domain": true,
      "password-protection": true,
      "email-domain-protection": false,
      "white-label": false,
      notifications: true,
      pagerduty: true,
      opsgenie: true,
      whatsapp: true,
      sms: true,
      "sms-limit": 50,
      "notification-channels": 10,
      members: "Unlimited",
      "audit-log": false,
      regions: [...AVAILABLE_REGIONS],
      "private-locations": false,
    },
  },
  team: {
    title: "Professional",
    id: "team",
    description: "Perfect for growing businesses with advanced needs",
    price: {
      USD: 249,
      EUR: 249,
      INR: 24900,
    },
    addons: {
      "email-domain-protection": {
        price: {
          USD: 100,
          EUR: 100,
          INR: 10_000,
        },
      },
    },
    limits: {
      version: undefined,
      monitors: 25,
      "synthetic-checks": 300,
      periodicity: ["30s", "1m", "5m", "10m", "30m", "1h"],
      "multi-region": true,
      "max-regions": AVAILABLE_REGIONS.length,
      "data-retention": "12 months",
      "status-pages": 5,
      maintenance: true,
      "monitor-values-visibility": true,
      "response-logs": true,
      screenshots: true,
      otel: true,
      "status-subscribers": true,
      "custom-domain": true,
      "password-protection": true,
      "email-domain-protection": false,
      "white-label": false,
      notifications: true,
      sms: true,
      "sms-limit": 100,
      pagerduty: true,
      opsgenie: true,
      whatsapp: true,
      "notification-channels": 20,
      members: "Unlimited",
      "audit-log": true,
      regions: [...AVAILABLE_REGIONS],
      "private-locations": true,
    },
  },
};
