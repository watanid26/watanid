# Watanid

Minimal brand hub and app showcase. Next.js App Router, JSON in `/data`, no database.

## Structure

- `app/` — routes (`/`, `/apps`, `/apps/[slug]`, `/about`, `/admin`, `/admin/login`)
- `components/` — UI primitives (`Container`, `Section`, `Button`, `AppCard`, …)
- `data/apps.json` — app records (`status: "published"` is public)
- `data/pages.json` — custom pages (`showInMenu` + `order` for nav)
- `lib/storage.ts` — production/dev storage abstraction (`@vercel/blob` vs `fs`)
- `data/site.json` — footer / about contact fields
- `middleware.ts` — protects `/admin` (cookie vs `ADMIN_TOKEN`)

## Setup

```bash
npm install
cp .env.example .env.local
```

Set `ADMIN_PASSWORD` (login form) and `ADMIN_TOKEN` (long random string; stored in HttpOnly cookie after login).

```bash
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin → redirects to `/admin/login` until signed in.

## Editing apps

Use **Admin** after login, or edit `data/apps.json` locally. Public pages only list apps where `status === "published"`.

## Deploy (e.g. Vercel)

Set `ADMIN_PASSWORD`, `ADMIN_TOKEN`, and `BLOB_READ_WRITE_TOKEN`.

- Development: JSON read/write uses local `fs` (`/data/*.json`).
- Production: JSON read/write uses Vercel Blob via `lib/storage.ts`.
