---
title: "Stripe Subscription & Billing API"
company: "Personal project"
employment: "Personal project"
client: "Personal project"
role: "Built solo"
period: ""
summary: "A Laravel 12 REST API for SaaS subscription billing on Stripe, with idempotent, order-safe webhook handling, 148 tests and CI."
tags: ["PHP", "Laravel", "Stripe", "MySQL", "Pest", "GitHub Actions", "OpenAPI"]
status: "Open source"
links:
  repo: "https://github.com/sachchin06/laravel-stripe-subscription-api"
# Optional images. Put files in content/projects/images/stripe-billing-api/
# cover: ./images/stripe-billing-api/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/stripe-billing-api/swagger.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 1
---

## Overview

A REST API for SaaS subscription billing on Stripe, built with Laravel 12. Users sign up, pick a plan and pay through Stripe Checkout. The API keeps a local copy of each subscription in step with Stripe and uses it to decide which features a user may access and how much they may use.

The core challenge is keeping that local copy correct. Stripe delivers webhooks at least once and in no guaranteed order, so the same event can arrive twice and an old event can arrive after a newer one.

## My role

Personal project, built solo. I audited my first version against its README, fixed the correctness and security issues I found, added a full test suite and CI, and rewrote the documentation.

## What I built

- A 20-endpoint Laravel REST API for Stripe billing: Checkout, cancel at period end, resume, plan changes with proration, invoice history, upcoming-invoice preview and Billing Portal sessions.
- Idempotent webhook processing with a stripe_events table and a unique index on the event ID, plus a unique index on the Stripe subscription ID so concurrent workers can't create duplicate subscriptions.
- Out-of-order safety: each event is used only to identify the subscription, then its current state is fetched from Stripe, which also syncs plan changes made in the Billing Portal.
- Webhooks processed in queued jobs with retries, returning 400 for bad signatures (not retried by Stripe) and 5xx for server faults (retried).
- Idempotency keys and network retries on every Stripe create call, with Stripe calls moved out of database transactions, so failures can be retried without duplicate customers, products or prices.
- The Stripe API version pinned on every client and the code migrated to 2025-10-29.clover, fixing two broken endpoints.
- One active subscription per user: a second checkout returns 409 and the customer's other open Checkout sessions are expired, so two browser tabs can't both be paid.
- Soft archiving for plans with subscribers, keeping existing subscriptions working while closing the plan to new customers.
- Plan-based feature gating and monthly usage limits as declarative middleware (403 for missing features, 429 over the limit), with safe free-tier defaults for unconfigured plans.
- Security: an admin Gate on product management, rate limiting on login and registration, expiring Sanctum tokens, an allow-list for Billing Portal return URLs, and centralised error handling that never leaks internal errors.
- Seeders and a two-way stripe:sync command that create the plans in any Stripe account, so the project can be cloned and run.
- 148 Pest tests (76% coverage) with Stripe mocked behind a single service wrapper, real signature verification in webhook tests, and a fake HTTP client to check SDK request headers and pagination.
- GitHub Actions CI on PHP 8.3 and 8.4 with Pint style checks and a 75% coverage gate.
- OpenAPI/Swagger docs and a README covering design decisions, set-up, limitations and roadmap.

## Design decisions

- **Subscriptions come from webhooks only.** They're never created from the Checkout redirect, so local state always follows confirmed payments.
- **Let the database enforce idempotency.** Unique indexes stop duplicates, because a check in application code can't stop two concurrent requests.
- **Webhooks are notifications, not the truth.** Current state is re-fetched from Stripe, so delivery order doesn't matter.
- **No HTTP calls inside transactions.** A rollback can't undo an HTTP call, so Stripe calls sit outside transactions and idempotency keys make retries safe.
- **One door to Stripe.** All Stripe access goes through one service class, which makes it easy to mock in tests and pins the API version in one place.
- **Money as integers.** Amounts are stored as integer cents, with enums for statuses and intervals instead of repeated strings.
- **Plan rules in config, not controllers.** Middleware applies them, and unconfigured plans default to the most restrictive tier rather than unlimited.

## Outcome

- 148 tests at 76% coverage, enforced in CI on every push and pull request.
- Fixed duplicate-event, out-of-order, authorisation and API-version bugs found in my own audit of the first version.
- Fully clonable: a reviewer can set it up against their own Stripe test account in a few commands.
