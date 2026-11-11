---
title: "eFinancials Core Banking: Loan Origination System"
company: "Scienter Technologies (Pte) Ltd"
employment: "Trainee Software Engineer, internship, hybrid"
client: "Scienter product (eFinancials)"
role: "Trainee software engineer in an 8-person team, front end and back end"
period: "August 2021 to March 2022"
summary: "Angular screens and C# .NET REST APIs for the loan origination module of a core banking product used by banks and finance companies."
tags: ["Angular", "TypeScript", "C#", ".NET Framework", "MS SQL Server"]
status: "Deployed to production"
links: {}
# Optional images. Put files in content/projects/images/loan-origination-system/
# cover: ./images/loan-origination-system/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/loan-origination-system/loan-form.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: false
order: 9
---

## Overview

eFinancials is Scienter's core banking product, used by banks and finance companies. It covers leasing, loans, recovery management, impairment, credit risk rating, scorecards, a recovery call centre and yard management.

I worked in the Loan module, on the Loan Origination System: the part of eFinancials that handles new loan applications.

## My role

Trainee software engineer in an 8-person team working on the Loan module, building both front end and back end. I started by implementing APIs specified by a senior developer, then moved on to designing and writing my own.

## What I built

- 10+ responsive Angular screens for the Loan Origination System.
- C# .NET Framework REST APIs for validated form submissions, first to senior developers' specifications and later independently.
- Secure file upload APIs that enforced file-type and file-size validation before storing data in SQL Server.
- SQL Server tables, stored procedures and queries to persist and retrieve loan application data.
- Worked against a copy of the production SQL Server database containing real banking data.

## Design decisions

- **Validate uploads on the server.** File type and size are checked before anything is persisted, so invalid or oversized files never reach the database.
- **Forms that work on any screen.** The Angular loan screens are responsive, so they work across different screen sizes.

## Outcome

- Loan forms I built were deployed to production in a core banking system used by banks and finance companies.
- Progressed from implementing APIs to a senior's specification to designing and writing my own within the internship.
