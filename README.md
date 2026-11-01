# Ade Mulyana — Portfolio

Personal portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, in an "engineering blueprint" visual style.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Create `.env.local` with the variables listed under [Environment variables](#environment-variables) before using the contact form.

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |

### Environment variables

| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends contact form emails through [Resend](https://resend.com) |
| `CONTACT_EMAIL` | Inbox that receives contact form messages |

## Updating content

All portfolio content lives in **`src/lib/data.ts`**: profile copy, experience, projects (including case studies and system-flow diagrams), education, skills, achievements, and links. The portfolio assistant's answers are generated from the same file. Project screenshots go in `public/<project>/`, and the CV is `public/cv-ade-mulyana.pdf`.

## Project structure

```
src/
  app/              layout, page, and /api/contact route
  components/       Section, Reveal, Navbar, modal, assistant
    sections/       one component per page section
  hooks/            useContactForm, useTheme
  lib/
    data.ts         content (single source of truth)
    assistant.ts    keyword-based portfolio assistant
    services/       contact client, validation, rate limiting, email template
```
