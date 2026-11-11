---
title: "SPC Data Sync Service"
company: "Boss Boleh Sdn. Bhd."
employment: "Developer, full-time contract, remote"
client: "Internal (Boss Boleh)"
role: "Sole developer, code reviewed by a senior developer"
period: "January 2024 to December 2024"
summary: "Rebuilt a 2,600-line procedural PHP script as a Laravel 10 service that syncs company records from MySQL to SQL Server. 18% faster, with no duplicates on re-runs."
tags: ["PHP", "Laravel", "MySQL", "MS SQL Server", "Eloquent", "DTO pattern"]
status: "Ran in production against 3,000+ real company records"
links: {}
# Optional images. Put files in content/projects/images/spc-data-sync/
# cover: ./images/spc-data-sync/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/spc-data-sync/architecture.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 2
---

## Overview

Boss Boleh's platform keeps company records in MySQL. A separate company-secretarial system, SPC, runs on Microsoft SQL Server. The sync service copies each company's records from Boss Boleh into SPC and maps them into SPC's schema: company profile, directors, individual and corporate shareholders, share certificates and totals, company secretary, and MSIC business-nature codes.

New records are inserted and existing ones are updated, so the sync can be run again safely. The original version was a single procedural PHP script (9 files, 2,617 lines) that mixed business logic, raw SQL strings and output, which made it hard to maintain. I rebuilt it as a Laravel 10 application. Syncs are triggered from the Boss Boleh admin panel and run either on a schedule or through an on-demand API.

## My role

Sole developer. I analysed the undocumented legacy script, designed the new structure and rebuilt the full sync in Laravel. All code was reviewed by a senior developer.

## What I built

- Split the 2,600-line procedural script into service classes, 20 single-purpose traits, 11 Eloquent models and one shared sync routine.
- MySQL and SQL Server connections configured side by side, reading from Boss Boleh and writing to SPC in the same run.
- 11 Eloquent models on SQL Server with custom primary keys and no timestamps, mapping Laravel onto SPC's existing schema without changing it.
- 11 DTO classes to standardise data mapping between the two databases, with validation and default values.
- A scheduled Artisan command that runs every five minutes, with a config switch to turn automatic syncing on or off.
- A MySQL sync-tracking table recording each company's status, last attempt and last success, so the scheduler only processes companies flagged from the admin panel.
- 7 REST endpoints, including an authenticated on-demand sync API with clear 400/404/500 responses and connection checks for both databases.
- Raw SQL rewritten as parameterised query builder queries with joins, soft-delete filters and pagination.
- Mapping logic for Malaysian identity data (three-part NRIC, passports, 24 race categories, citizenship flags, nationality-to-country lookups).
- Field-level validation on all 11 target models, so incomplete records are logged and skipped instead of written.
- Step-labelled Laravel logging in place of the legacy die()/echo error handling, so each failure can be traced to its table.

## Design decisions

- **One direction only.** Models are pinned to SQL Server and source queries to MySQL, so data can only flow one way and is never written to the wrong database.
- **Don't touch a schema you don't own.** Eloquent is configured for SPC's tables (custom keys, no auto-increment, no timestamps, explicit fillable fields), so SPC stays untouched.
- **Safe to re-run.** Records are matched on NRIC, passport and business registration numbers and then updated or created, so re-runs never duplicate people, directors or share certificates. Share totals are reset before members are re-applied, fixing the double-counting the legacy script had.
- **All or nothing per company.** Each company's sync runs in a database transaction, so a failure part-way through never leaves partial records in SPC.
- **One routine, two entry points.** The scheduled command and the API call the same sync routine, so automatic and on-demand syncs always follow the same logic.
- **A table as a work queue.** The sync-tracking table lets the admin panel request syncs without code changes.
- **Config over magic numbers.** Behaviour flags and fixed IDs moved into config, credentials into environment variables, and member roles into a PHP 8.1 backed enum. Syncing can be paused without a deploy.

## Outcome

- Sync ran 18% faster than the legacy script, measured by timed runs.
- Replaced a 2,617-line procedural script with a structured, maintainable Laravel application.
- Re-runnable syncs with no duplicate records and no double-counted share totals.
- Ran in production against a database of 3,000+ real company records across Malaysia.
- Delivered within 3 months.
