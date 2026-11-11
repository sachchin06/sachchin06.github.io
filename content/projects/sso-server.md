---
title: "Central Single Sign-On (SSO) Server"
company: "YYC taxPOD"
employment: "Junior Developer, full-time contract, remote"
client: "Internal (YYC taxPOD)"
role: "Sole developer, code reviewed by a senior developer"
period: "May 2023 to December 2023"
summary: "An OAuth 2.0 single sign-on server in Laravel and Passport that replaced separate logins across four internal applications, serving 100+ users."
tags: ["PHP", "Laravel", "Laravel Passport", "OAuth 2.0", "MySQL", "Livewire"]
status: "Ran in production across four internal applications"
links: {}
# Optional images. Put files in content/projects/images/sso-server/
# cover: ./images/sso-server/cover.png
# coverAlt: "Describe the image"
screenshots: []
# screenshots:
#   - src: ./images/sso-server/login-flow.png
#     alt: "Describe what the screenshot shows"
#     caption: "Optional caption"
featured: true
order: 3
---

## Overview

Before this project, each of YYC's internal applications had its own login, so users kept separate credentials for each app and admins managed accounts in several places.

I built a central single sign-on server in Laravel 10. Users sign in once on a shared login page, and the server issues an OAuth 2.0 access token through Laravel Passport and sends them back to the application they came from. Client applications call a JSON API to identify the signed-in user and read user and role data. Admins use the same server as a dashboard to manage users and roles in one place.

## My role

Sole developer. I built the SSO server end to end (login and redirect flow, token and cookie handling, client API, admin dashboard, database schema and seeders) and the token-handling login endpoints in the client applications. All code was reviewed by a senior developer. The DevOps team handled hosting.

## What I built

- A central SSO server in Laravel 10 and Laravel Passport that signs users in once and returns them to four internal applications with an OAuth 2.0 access token.
- A login flow that keeps the calling application's URL in the session, so one login page serves the admin dashboard and every client application. I also fixed a stale-redirect bug by clearing it after use.
- Token-handling login endpoints in each client application, so they accept the SSO token and sign the user in locally.
- 7 REST API endpoints for client applications to fetch the signed-in user by bearer token or cookie, list users and roles, register client sites and record site logins.
- 6 Laravel migrations adding role, user-role pivot, client site and site login tables with foreign keys and cascading deletes.
- An admin dashboard in Blade, Bootstrap 5 and Livewire for paginated user and role management, including role assignment, soft-deleted roles and slugs generated as the admin types.
- A custom CORS middleware with an origin allowlist, allowing cookie-based requests only from approved client applications.
- Passport token lifetimes and cross-site secure cookies (SameSite=None) to share login state between the SSO server and client applications.
- Form Request classes and API Resources to keep validation out of controllers and return only selected user and role fields, never passwords.
- Role and admin seeders with setup documentation, so a new environment can run migrations, generate Passport keys and get a working admin account.

## Design decisions

- **The right guard for each caller.** The dashboard uses Laravel's session guard and client applications use the Passport API guard.
- **One login page for every app.** The calling application's URL is held in the session between the login page and the form post, so users always return to the app they came from.
- **Safe to repeat.** Check-then-create writes run in transactions with retries, with upserts, so repeated or simultaneous API calls never create duplicate site or login records.
- **Named origins, not a wildcard.** Browsers only allow credentialed cross-origin calls from a named origin, so CORS uses an explicit allowlist.
- **Only chosen fields leave the server.** API Resources control the JSON output and flatten roles to simple slugs for client apps.
- **Room to grow.** Controller namespaces are versioned (V1), so a V2 can be added without breaking existing clients.
- **Roles without orphans.** Roles are many-to-many through a pivot with cascading deletes, and soft-deleted so a removed role can be restored.

## Outcome

- Replaced separate logins in four internal applications with one sign-in, serving 100+ users.
- Gave admins one place to manage users and roles across all connected applications.
- Became the sign-in for Code Share, replacing its earlier Azure AD set-up.
