<div align="center">

# StatusHQ

**Synthetic monitoring, incident management, and status pages — in a single open-source platform.**

<sub>Built as a modern monorepo on top of Next.js, tRPC, Drizzle, Turbo, and a Go checker network.</sub>

</div>

---

## What is StatusHQ

StatusHQ is a self-hostable monitoring platform that unifies three capabilities most teams buy from three different vendors:

- **Synthetic monitoring.** HTTP, TCP, and multi-step checks executed from a global network of regions, with assertions, retries, and screenshotting.
- **Incident management.** Create, update, and resolve incidents with a timeline, affected components, and subscriber notifications.
- **Status pages.** Public and private status pages with theming, custom domains, and automatic uptime reporting.

The project started as a fork of [OpenStatus](https://github.com/openstatusHQ/openstatus) and has been extended with a workspace-based dashboard, incident workflow, invitations, maintenance windows, and a cleaner permission model.

## Why it exists

Most monitoring tools are either developer-first (powerful but hostile to non-engineers) or founder-first (friendly but shallow). StatusHQ is designed so a founder can wire up checks in a few minutes and an SRE can still assert on headers, timing, and status codes with precision.

## Features

- **Multi-region checker network** — Go-based agents execute checks and ship results back to the control plane.
- **End-to-end typesafe API** — tRPC routers shared across dashboard, status page, and marketing site.
- **Edge-ready UI** — Next.js 16 app directory with server components and streaming where it helps.
- **Pluggable notifications** — Email, Slack, Discord, PagerDuty, SMS, WhatsApp, OpsGenie, and generic webhook.
- **Incident workflow** — Draft, investigating, identified, monitoring, resolved — with history and subscriber updates.
- **Status pages** — Workspace-scoped, with custom branding and an uptime tracker widget.
- **Self-hostable** — Docker Compose config and env templates for a full local stack.
- **Workspace model** — Members, roles, invitations, and per-workspace billing hooks.

## Architecture

```
┌──────────────────────────┐      ┌──────────────────────────┐
│  apps/dashboard  (Next)  │◀────▶│    packages/api  (tRPC)  │
├──────────────────────────┤      ├──────────────────────────┤
│  apps/status-page (Next) │◀────▶│   packages/db  (Drizzle) │
├──────────────────────────┤      ├──────────────────────────┤
│  apps/web  (marketing)   │      │  packages/notifications  │
└──────────────────────────┘      └──────────────────────────┘
             ▲                                  ▲
             │                                  │
             ▼                                  ▼
   ┌─────────────────────┐          ┌──────────────────────┐
   │  apps/server (Hono) │          │ apps/workflows (jobs)│
   └─────────────────────┘          └──────────────────────┘
                        ▲
                        │ results
                        │
             ┌──────────────────────┐
             │  apps/checker  (Go)  │
             │   runs probes from   │
             │   multiple regions   │
             └──────────────────────┘
```

## Tech Stack

| Layer         | Choice                                       |
|---------------|----------------------------------------------|
| Framework     | Next.js 16, React 19                         |
| API           | tRPC, Hono                                   |
| Database      | LibSQL / Turso via Drizzle ORM               |
| Analytics     | Tinybird                                     |
| Checker       | Go workers, scheduled from TypeScript        |
| Styling       | Tailwind CSS, shadcn/ui                      |
| Auth          | Auth.js (NextAuth v5)                        |
| Email         | Resend + React Email                         |
| Build system  | Turbo, pnpm workspaces                       |
| Lint / format | Biome, oxlint                                |

## Repository Layout

```
.
├── apps/
│   ├── dashboard/          Authenticated workspace UI (monitors, incidents, settings)
│   ├── status-page/        Public status pages
│   ├── web/                Marketing site + blog
│   ├── docs/               Product documentation (Starlight)
│   ├── checker/            Go service that executes monitor checks
│   ├── server/             Hono API for public monitor ingestion
│   ├── workflows/          Scheduled jobs and alerting engine
│   ├── screenshot-service/ Chromium-based screenshot capture
│   ├── ssh-server/         SSH check runner
│   ├── railway-proxy/      Proxy for Railway integrations
│   └── private-location/   Agent for self-hosted check locations
│
├── packages/
│   ├── api/                tRPC routers (monitor, incident, workspace, ...)
│   ├── db/                 Drizzle schema + migrations (LibSQL / Turso)
│   ├── ui/                 shadcn-based component library
│   ├── emails/             React Email templates
│   ├── notifications/      Provider adapters (slack, discord, pagerduty, email, ...)
│   ├── assertions/         Assertion DSL for monitor checks
│   ├── tinybird/           Analytics pipes and datasources
│   ├── tracker/            Uptime calculation primitives
│   ├── regions/            Checker region metadata
│   └── analytics/          Shared analytics clients
│
├── infra/                  Deployment manifests
├── docker-compose.yaml
├── turbo.json
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- Node.js `>= 20`
- pnpm `>= 10`
- [Bun](https://bun.sh/) — a handful of scripts shell out to Bun
- [Turso CLI](https://docs.turso.tech/quickstart) — spins up a local LibSQL database

### Local development

```bash
# 1. Install dependencies
pnpm install

# 2. Create your local env files (not committed — populate as needed)
#    See each app's README for the variables it reads.

# 3. Start a local LibSQL database (keep this terminal running)
turso dev --db-file statushq-dev.db

# 4. In a second terminal, bootstrap the dev environment
pnpm dx
```

Then launch whichever app you want to work on:

```bash
pnpm dev:dashboard     # http://localhost:3002
pnpm dev:status-page   # http://localhost:3003
pnpm dev:web           # http://localhost:3000
```

### Docker

A full stack is defined in `docker-compose.yaml`. See [DOCKER.md](./DOCKER.md) for the walkthrough.

```bash
docker compose up -d
```

## Scripts

| Command                | What it does                                 |
|------------------------|----------------------------------------------|
| `pnpm dev`             | Run every app in dev mode via Turbo          |
| `pnpm dev:dashboard`   | Dashboard + db only                          |
| `pnpm dev:status-page` | Status page + db only                        |
| `pnpm dev:web`         | Marketing site + db only                     |
| `pnpm build`           | Production build of the whole monorepo       |
| `pnpm tsc`             | Typecheck across all packages                |
| `pnpm lint`            | Biome lint                                   |
| `pnpm format`          | Biome format + fix                           |
| `pnpm test`            | Run package tests via Turbo                  |

## Contributing

Contributions are welcome. See [CONTRIBUTING.MD](./CONTRIBUTING.MD) for coding standards, branching, and how to open a pull request. Please follow [SECURITY.md](./SECURITY.md) for responsible disclosure of security issues.

## License

StatusHQ is released under the terms of the [AGPL-3.0 license](./LICENSE), with portions originating from the OpenStatus project under the same license.

## Acknowledgements

StatusHQ builds on and extends [OpenStatus](https://github.com/openstatusHQ/openstatus). Huge thanks to its authors and contributors.
