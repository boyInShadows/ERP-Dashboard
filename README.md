# ERP Dashboard

Next.js frontend for the ERP Dashboard.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set your backend URL:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set `BACKEND_BASE_URL` (e.g. `http://localhost:3001`).

## Run

- **Development:** `npm run dev` — app at [http://localhost:3000](http://localhost:3000)
- **Build:** `npm run build`
- **Production:** `npm run start`

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zustand
