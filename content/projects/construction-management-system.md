---
title: "Thushi CMS: Construction Management System"
company: "Keture (Pvt) Ltd"
employment: "Software Engineer, freelance, remote"
client: "Thushi Construction (Pvt) Ltd"
role: "Back-end developer in a team of 6"
period: "July 2023 to present"
summary: "Finance, task and permission APIs for a construction management system that replaced Thushi Construction's paper-based processes. In production and used daily."
tags: ["JavaScript", "Node.js", "Fastify", "MySQL", "Prisma", "AWS S3", "Firebase"]
status: "In production, private internal system"
links: {}
# Optional images. Put files in content/projects/images/construction-management-system/
# cover: ./images/construction-management-system/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/construction-management-system/invoices.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 6
---

## Overview

Thushi CMS is a construction management system that moved Thushi Construction's manual and paper-based operations into one platform. It covers construction sites, staff and labourers, labour teams, tasks, materials, purchase orders, suppliers, subcontractors and clients.

It tracks money in both directions: payments to suppliers, labour teams and subcontractors, and invoices raised to clients. It sends SMS, email and push notifications, and controls access through role-based permissions. The API is split into company-wide and site-scoped routes, so each construction site's records stay separate.

## My role

Back-end developer in a team of 6. I owned the finance modules (client invoicing, subcontractor payments, labour pay slips and parts of supplier payments), plus site drawings and documents, tasks, labour teams, roles and permissions, and reference data. I designed most of the related database tables and built the email and messaging plugins.

## What I built

- 70 REST endpoints across 15 modules in a Node.js and Fastify API.
- 18 MySQL tables and 28 reversible db-migrate migrations with foreign-key rules, kept in sync with the Prisma ORM schema.
- Client invoicing linked to site payment milestones, marking every linked milestone as paid when the invoice is settled.
- Subcontractor payments with cash and cheque splits and multiple cheques per payment, keeping contract instalment statuses and paid dates in step with each payment.
- Labour-team pay slips linked to work-history records, with SMS or email notifications to team leaders.
- Role and permission management that compares submitted and stored permission sets and revives removed permissions with upserts instead of creating duplicates.
- A task-creation endpoint that creates a task, its subtasks, material estimates and, for contract work, a subcontract with instalments, all from one validated request.
- Site-scoped drawings and documents with per-site title uniqueness, uploader tracking and activity logging.
- Paginated lists with date-range, status, multi-client and text-search filters, returning per-status counts in the same response.

## Design decisions

- **Transactions around money.** Payments with linked records and cheques, and tasks with subtasks and estimates, are written in a single transaction, so financial records are never half-saved.
- **Status flows down.** Creating a payment moves linked milestones or instalments to In Progress, and marking it paid moves them to Paid, so parent and child records always agree.
- **Diff, don't replace.** Edits to payments, teams and roles attach only new links and detach removed ones, rather than deleting and re-inserting, so link history is preserved.
- **Nothing is hard-deleted.** Soft deletes everywhere keep financial and audit history, and uniqueness checks ignore deleted rows so a name can be reused.
- **Notifications as plugins.** Email and SMS are Fastify plugins, so any route can send a notification without importing a provider SDK, and providers can be swapped in one place.
- **Fail at start-up.** SMS gateway credentials moved out of source code into validated environment configuration, with Firebase settings added to the start-up check, so a misconfigured deployment stops at boot.

## Outcome

- Replaced Thushi Construction's paper-based processes for client invoicing, cheque tracking, supplier and subcontractor payments, pay slips, and site drawings and documents.
- In production and used daily by the client.
- Delivered 70 endpoints, 18 tables and 28 migrations as part of a 6-person team.
