---
title: "Code Share: Internal Knowledge-Sharing Platform"
company: "YYC taxPOD"
employment: "Junior Developer, full-time contract, remote"
client: "Internal (YYC taxPOD development team)"
role: "Sole developer, code reviewed by a senior developer"
period: "May 2023 to December 2023"
summary: "An internal documentation platform in Laravel and MySQL with nested documents, full-text search, Markdown editing and revision history. Used by 25+ developers."
tags: ["PHP", "Laravel", "MySQL", "SAML 2.0", "Azure AD", "Bootstrap 5", "GitHub Actions"]
status: "Ran in production, used by 25+ developers"
links: {}
# Optional images. Put files in content/projects/images/code-share/
# cover: ./images/code-share/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/code-share/document-tree.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 7
---

## Overview

Code Share is an internal documentation platform for YYC's developers, built to cut down repeated problem-solving across the team. Developers used it to share common code and best practices, write up notes when they learned something useful to others, and record lessons from bug fixes and past work.

Documents form an unlimited-depth parent/child tree that users can browse, search, reorder by drag and drop, edit in Markdown and roll back through a revision history. Admins manage user accounts. Users first signed in through Microsoft Azure AD, and later through the central SSO server I built.

## My role

Sole developer. I built the whole application: data model, document, revision and admin modules, search, role-based access, Azure AD SAML sign-in, the front end, database seeders and the deployment workflow. All code was reviewed and merged by a senior developer. The DevOps team handled server hosting.

## What I built

- A Laravel 10 and MySQL documentation platform where documents sit in an unlimited-depth tree with breadcrumb navigation.
- MySQL full-text search across document content alongside title filtering, so developers could find existing notes and fixes quickly.
- A two-way Markdown pipeline (league/html-to-markdown and league/commonmark with GitHub Flavoured Markdown), so authors edit in Markdown while pages are stored and shown as HTML, including tables, code blocks and task lists.
- A revision history that saves a numbered snapshot of each document before every edit, with list and detail views for earlier versions.
- SAML 2.0 single sign-on with Microsoft Azure AD for the first release, later migrated to the company's central SSO server, registering each new account there before creating the local record.
- Role-based access control with a roles table, custom middleware on the admin area and a custom 403 page.
- Admin user management with a paginated list, create, edit and delete.
- Drag-and-drop reordering with jQuery UI Sortable and an AJAX endpoint that sends only changed positions, protected by Laravel's CSRF token.
- Soft deletion that cascades to all sub-pages, so removed documents can be recovered.
- 3 new tables, 6 relationships and UUID document keys through Eloquent migrations, with seeders for roles, the admin account and a Markdown reference document.
- A GitHub Actions workflow that deploys each push to main over SSH, running Composer install, migrations and Laravel optimisation.
- 14 Blade views with Bootstrap 5 and jQuery, including a shared layout, flash messages and custom 403/404 pages.

## Design decisions

- **A tree without extra tables.** A self-referencing parent_id and a sort column support unlimited nesting and custom ordering.
- **Unguessable URLs.** Each document has a UUID alongside its numeric ID, so parent references in URLs can't be guessed.
- **Write in Markdown, store as HTML.** Pages render without converting on every read, while authors still write plain Markdown.
- **History without changing the live document.** A snapshot is saved before every edit, giving full numbered history while the live document keeps its structure.
- **Recoverable deletes.** Soft deletes cascade down the tree, so a removed page and its sub-pages are hidden but can be restored.
- **Never out of step with SSO.** Local accounts are created only after the SSO server accepts the registration.
- **Access declared once.** Role checks run as middleware on route groups, validation lives in Form Request classes, and repeated query conditions are Eloquent scopes, keeping controllers short.
- **No manual deploys.** Every merge to main updates the server, including migrations.

## Outcome

- Used in production by 25+ developers as the team's shared knowledge base.
- Gave the team one searchable place for code practices, fixes, notes and lessons, cutting down repeated problem-solving.
- Connected to the company's SSO server, so developers used one set of credentials across internal tools.
