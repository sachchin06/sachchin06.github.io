---
title: "Deals and Product-Listing Platform API"
company: "Keture (Pvt) Ltd"
employment: "Software Engineer, freelance, remote"
client: "Not named"
role: "Sole back-end developer"
period: "July 2023 to present"
summary: "The complete back end for a deals and product-listing platform: 100 endpoints and 16 tables, built solo in Fastify and MySQL."
tags: ["JavaScript", "Node.js", "Fastify", "MySQL", "Prisma", "AWS S3", "JWT", "OpenAPI"]
status: "Ran in production until the client closed the business"
links: {}
# Optional images. Put files in content/projects/images/deals-platform-api/
# cover: ./images/deals-platform-api/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/deals-platform-api/swagger.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: false
order: 8
---

## Overview

An online deals and product-listing platform. The API served two audiences: an admin dashboard for managing the product catalogue, site content, admin users, reviews and contact messages, with summary statistics; and a customer-facing website for browsing the catalogue with filtering and sorting, and submitting reviews and contact forms.

Products had LKR and USD prices, discounts, time-limited hot deals, images, features, properties and embedded HTML, organised in a three-level category tree.

## My role

Sole back-end developer. I designed and built the entire API, data model and integrations. A DevOps engineer handled deployment.

## What I built

- A 100-endpoint REST API in Node.js and Fastify, split into versioned admin, public and authentication areas across 28 route modules.
- A 16-table MySQL schema with 20 migrations and a Prisma ORM layer, using indexed foreign keys, cascade rules and unique constraints.
- Passwordless admin sign-in with emailed one-time passwords via Resend and JWTs, with a 5-minute code expiry and a limit of 5 requests per hour.
- A public product search API with 11 filters (price range, LKR/USD pricing, discounts, hot deals, sold status, multi-category selection) and 4 sort orders.
- Create, edit and delete flows that handle an item together with its properties, features, images and embeds in one request.
- Image uploads to AWS S3 using multipart uploads, stored under timestamped keys.
- Review moderation (submit, approve, reject, one review per email) with a public summary of approved-review count and average rating.
- A dashboard endpoint returning 10 statistics in one response by running count queries in parallel.
- JSON Schema validation on every endpoint, with the OpenAPI documentation generated from the same schemas.

## Design decisions

- **Split by audience.** Admin, public and auth routes are versioned separately under /v1, so the admin and public contracts can change independently.
- **One schema, two jobs.** Each route's JSON Schema drives both request validation and the Swagger docs, so the documentation always matches what the API accepts.
- **Thin route handlers.** Database, email, storage, JWT and OTP services are Fastify plugins, and file-system routing means a new module is just a new folder with no central route table.
- **Atomic item writes.** An item and its child records are created, updated or deleted in one Prisma transaction, avoiding partial saves.
- **Inherited visibility.** Disabling a category hides every product beneath it without touching item rows.
- **Recoverable content.** Soft delete plus a separate enable/disable flag on every content table, so admins can hide content temporarily or remove it without losing records.
- **Fail fast.** Required configuration is validated at start-up, so a misconfigured deployment stops immediately rather than on the first request.

## Outcome

- Delivered the complete back end as sole developer: 100 endpoints, 16 tables and 2 third-party integrations.
- Ran in production, powering both the admin dashboard and the customer-facing website, until the client closed the business.
- Admins could manage the full catalogue and site content without developer involvement.
