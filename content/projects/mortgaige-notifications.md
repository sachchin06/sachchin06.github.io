---
title: "MortgAIge: Notification Module"
company: "Keture (Pvt) Ltd"
employment: "Software Engineer, freelance, remote"
client: "MortgAIge Inc"
role: "Sole developer of the module, back end only"
period: "July 2023 to present"
summary: "Email, in-app and push notifications for a multi-organisation mortgage-lending platform, built in NestJS and SQL Server."
tags: ["TypeScript", "NestJS", "MS SQL Server", "TypeORM", "OneSignal", "Resend", "Jest"]
status: "Delivered to the client as an MVP"
links: {}
# Optional images. Put files in content/projects/images/mortgaige-notifications/
# cover: ./images/mortgaige-notifications/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/mortgaige-notifications/inbox.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 4
---

## Overview

MortgAIge is a multi-organisation mortgage-lending platform. Borrowers are invited to loans and upload documents, which are checked by AI document extraction and a rule engine. Staff manage loans, loan products and organisations from an admin dashboard, and borrowers use web, iOS and Android apps.

I built the Notification module: the single layer the rest of the platform uses to reach users by email, in-app inbox and push.

## My role

Sole developer of the Notification module within the wider MVP team, working on the back end only. I designed the database tables, built the APIs and services, integrated the email and push providers, and wrote the unit tests.

## What I built

- 19 REST endpoints across 3 NestJS controllers, covering email, in-app and push notifications.
- An in-app inbox API with paging, unread-only filtering, unread counts, mark-as-read, mark-all-as-read and delete, with every query limited to the signed-in user's own records.
- Organisation-specific email templates with a three-level fallback (organisation, global, default), so admins brand invitation emails by setting parameters instead of editing HTML.
- A template-rendering service with variable substitution and conditional blocks, plus 3 responsive HTML invitation templates.
- Push notifications through OneSignal to individual borrowers and to all staff in an organisation, across web, iOS and Android.
- Alerts for missing document fields and manual document or loan reviews, finding recipients through TypeORM joins across up to 8 tables from a single document or loan ID.
- MS SQL Server tables and TypeORM entities with 9 indexes matched to the inbox and unread-count queries.
- 8 Jest test suites (49 test cases) covering the module's services, and Swagger documentation for all 19 endpoints.

## Design decisions

- **Vendors behind provider services.** Controllers stay thin and each vendor SDK sits behind its own provider service. When the client asked to move from SendGrid to Resend, nothing outside the provider layer had to change.
- **One notification path.** The module exports its services, so borrower onboarding, staff onboarding and document extraction all send through the same code instead of duplicating it.
- **Failures stay contained.** Push and in-app delivery errors are caught and logged, so a provider outage can't fail the document-extraction workflow that triggered the alert.
- **Tenant isolation from the token.** The organisation ID comes from the authenticated request, not the request body, and review alerts only go to staff in the same organisation.
- **Push linked to the inbox.** The in-app record is created first and the push carries its encrypted ID, so tapping a push opens the exact notification. Internal database IDs are never exposed to clients.
- **Runs without live credentials.** Integrations are config-driven and switch themselves off when keys are missing, so local and test environments work without live accounts.

## Outcome

- A complete three-channel notification system (email, in-app, push) used by the other platform modules.
- Delivered to the client as part of the MVP, serving web, iOS and Android clients.
- Email provider changed at the client's request with no changes outside the provider layer.
