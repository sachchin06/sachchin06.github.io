---
title: "E-Invoicing and Accounting Platform"
company: "Boss Boleh Sdn. Bhd."
employment: "Developer, full-time contract, remote"
client: "Boss Boleh (product)"
role: "Full-stack developer (Laravel and Vue 3) in a wider development team"
period: "January 2024 to December 2024"
summary: "Stripe payments, subscription tracking and marketing attribution for a multi-company invoicing app, including a fix for double payments on public invoices."
tags: ["PHP", "Laravel", "Vue 3", "MySQL", "Stripe", "Tailwind CSS"]
status: "In production"
links:
  live: "https://bossboleh.com/e-invoice"
# Optional images. Put files in content/projects/images/e-invoicing-platform/
# cover: ./images/e-invoicing-platform/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/e-invoicing-platform/invoice-payment.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 5
---

## Overview

Boss Boleh e-invoice is a multi-company invoicing and accounting web app for small businesses. A Laravel REST API with MySQL serves a Vue 3 single-page app. Users create and manage invoices and credit notes, take online payments through Stripe (card, e-wallet and FPX), manage their Boss Boleh subscription on monthly or yearly plans, and receive automated email reminders. The platform also integrates with Teachable for online courses.

## My role

Full-stack developer (Laravel and Vue 3) in a wider development team. I worked mainly on payments and subscriptions, extending the existing Stripe integration, and built marketing attribution, company-level tax rates and products, a comments feature and login auditing. Core checkout, subscription creation and renewals, email reminders and cloud storage were built by other developers.

## What I built

- A payment lock to fix a reported double-payment problem on public invoices, using Stripe PaymentIntents, three Laravel endpoints and Vue 3. A payment is marked in progress before confirmation, further attempts are blocked, and Stripe's webhook releases the lock.
- Failed-payment handling in the existing Stripe webhook handler, resetting the local payment record so customers can retry.
- Stripe subscription status tracking, updated from the subscription created, updated, deleted and checkout-completed webhooks, plus a batched backfill for existing subscriptions.
- A polymorphic UTM tracking table recording campaign data against both user registrations and Stripe Checkout subscriptions, used by the marketing team for campaign reporting.
- UTM-based post-payment redirects backed by a database mapping table, with developer alerts for unknown terms.
- Automatic course enrolment through the Teachable API for subscribers from matching campaigns.
- Company-scoped REST APIs for tax rates and products, with four default SST tax rates seeded for every new company by a model observer.
- Comments on invoices and credit notes: 5 Laravel endpoints, polymorphic comment and read-tracking tables, author-only edit and delete through a Laravel Policy, and Vue 3 components.
- Login auditing with an event listener recording IP address and user agent, and a weekly scheduled command that deletes logs past a configurable retention period.
- Part of Stripe Connect onboarding automated by creating each company's Stripe bank record inside a database transaction, without duplicates.

## Design decisions

- **The webhook is the source of truth.** The browser can't be trusted to report the final payment result, and a tab closed mid-payment must not lead to a second charge.
- **Block on the server, not the button.** Payment state is checked on the server before confirming, which stops second attempts from another tab or device, not just double clicks.
- **Either order works.** Stripe's Checkout redirect and its checkout-completed webhook can arrive in any order, so UTM data is cached for five minutes keyed by checkout session and attribution is kept whichever arrives first.
- **Tenant isolation from the session.** Tax rate and product APIs take the company from the signed-in user rather than the request, closing a gap where changing an ID exposed another company's records. Other companies' records return 403.
- **Backfill without skipping rows.** The status backfill uses chunkById because the column being updated was also the filter, and failures are logged per record without stopping the run.
- **One table for any model.** UTM data and comments use polymorphic tables rather than a table per model, with polymorphic types whitelisted so arbitrary class names can't reach queries.
- **Marketing changes without a release.** Post-payment redirects live in a database table with a config fallback.

## Outcome

- Stopped a reported double-payment problem on public invoice payments.
- Gave the marketing team UTM attribution across registrations and subscriptions, used for campaign reporting.
- Closed a tenant isolation gap in the tax rate and product APIs.
- Kept campaign attribution reliable regardless of the order Stripe's redirect and webhook arrived in.
