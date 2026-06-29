# ModuleWings User App

A responsive, highly optimized Next.js landing page and contact portal designed for content creators. 

This application serves as the primary entry point for users to learn about ModuleWings and submit their inquiries via a robust, rate-limited contact form.

## Overview
- **Frontend**: Next.js 16 (App Router), TailwindCSS, and custom typography.
- **Backend API**: Secure POST endpoints (`/api/contact`) backed by Zod validation.
- **Email System**: Automated routing via Nodemailer with active DNS MX record verification to prevent spam.
- **Rate Limiting**: Edge-level API protection using Upstash Redis (max 5 requests/min) to prevent abuse.

## Folder Structure
- `app/`: Contains the main Next.js routes (`page.js` for the landing page, `success/page.js` for the confirmation screen).
- `app/api/`: Holds the backend API routes, specifically the `contact` endpoint for form submissions.
- `lib/`: Shared utility files (e.g., `schema.js` for Zod rules, `smtp.js` for mail configuration).
- `public/`: Static assets such as custom fonts (`/fonts`), SVG icons (`/icons`), and branding images (`/images`).
- `middleware.js`: Next.js middleware that intercepts API requests and applies Redis rate-limiting.
