export const statusPages = [
  {
    id: 1,
    name: "StatusHQ Status",
    description: "See our uptime history and status reports.",
    slug: "status",
    favicon: "https://statushq.com/favicon.ico",
    domain: "status.statushq.com",
    protected: true,
    showValues: false,
    // NOTE: the worst status of a report
    status: "degraded" as const,
    monitors: [],
  },
];

export type StatusPage = (typeof statusPages)[number];
