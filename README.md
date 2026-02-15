# ERP Dashboard (ByteForge)

Minimal ERP/Admin dashboard to view operational data from the Voice Assistant backend:
- Reservations
- Calls (call logs + transcripts)
- Customers (search + history)
- FAQs
- Analytics overview

Frontend: **Next.js (App Router) + TypeScript**  
State management: **Zustand** (UI state only: filters/sort/selected row)  
Backend: Separate service (Node/Express) running locally at **http://localhost:3001**  
ERP uses a **BFF proxy** inside Next.js to call backend APIs without CORS issues.

---

## Architecture

Browser → Next.js UI (Server Components + Client Components)  
→ Next.js BFF Proxy (`/api/backend/*`)  
→ Backend API (`http://localhost:3001/api/...`)  
→ Database (Postgres) / cache (Redis) in backend

Why BFF proxy?
- Hide backend URL from the browser
- Avoid CORS issues
- One place to add authentication later
- Normalize API responses for UI

---

## Requirements

- Node.js 18+ (or 20)
- Backend running locally:
  - Base URL: `http://localhost:3001`
  - Health: `GET /api/health`

---

## Environment Variables

Create `.env.local`:

```env
BACKEND_BASE_URL=http://localhost:3001



---

# ✅ API Checklist (what you have now + what you’ll likely need later)

## A) APIs you have now (✅)
### Health & Status
- ✅ GET `/`
- ✅ GET `/api/health`

### Reservations
- ✅ GET `/api/reservations`
- ✅ GET `/api/reservations/:id`
- ✅ PATCH `/api/reservations/:id`
- ✅ DELETE `/api/reservations/:id`

### Customers
- ✅ GET `/api/customers/search?q=`
- ✅ GET `/api/customers/:id` (with history)

### Call Logs
- ✅ GET `/api/calls`
- ✅ GET `/api/calls/:callSid`

### Analytics
- ✅ GET `/api/analytics/overview`
- ✅ GET `/api/analytics/intents`
- ✅ GET `/api/analytics/hourly`

### FAQs
- ✅ GET `/api/faqs`
- ✅ POST `/api/faqs`
- ✅ PATCH `/api/faqs/:id`
- ✅ DELETE `/api/faqs/:id` (deactivate)

---

## B) APIs missing (add later if needed) ⚠️
These are not required for Plan A UI to *view data*, but they **are needed** to fully support your AI “function actions” and future ERP operations.

### Required for AI booking tools (from your table)
1) **check_availability**
- ❌ Suggested: `GET /api/availability?date=YYYY-MM-DD&duration=30&department=...&provider=...`
  - Or: `GET /api/slots?...`

2) **create_reservation**
- ❌ You do NOT currently list a POST reservation endpoint.
- ❌ Suggested: `POST /api/reservations` (create)

3) **get_customer_reservations**
- ✅ Could be covered by `GET /api/customers/:id` (if it includes reservations)
- If not included:
  - ❌ Suggested: `GET /api/customers/:id/reservations`

4) **update_customer_name**
- ❌ Suggested: `PATCH /api/customers/:id` (update profile fields)

5) **answer_faq**
- ✅ `GET /api/faqs` works, but for direct lookup during call:
  - Optional: ❌ `GET /api/faqs/search?q=...&category=...` (faster)

6) **transfer_to_human**
- Usually not an HTTP API; it’s a Twilio action + logging
- Optional: ❌ `POST /api/calls/:callSid/transfer` (log transfer event)

7) **end_call**
- Usually Twilio action; optional logging endpoint:
  - ❌ `POST /api/calls/:callSid/end`

### Recommended for ERP quality (not mandatory day 1)
- ❌ Pagination + filters on list endpoints:
  - `/api/reservations?from=&to=&status=&page=&pageSize=`
  - `/api/calls?from=&to=&outcome=&page=&pageSize=`
- ❌ Export:
  - `/api/reservations/export.csv`
  - `/api/calls/export.csv`

---

# Next Steps (Plan A ERP build order)

### Step 1 — Confirm ERP talks to backend (BFF proxy)
- [ ] Add `.env.local` with `BACKEND_BASE_URL=http://localhost:3001`
- [ ] Implement Next.js proxy route: `app/api/backend/[...path]/route.ts`
- [ ] Test: open `/api/backend/api/health` in browser

### Step 2 — Build pages (minimal UI)
- [ ] Dashboard: overview + hourly + intents
- [ ] Reservations list + detail
- [ ] Calls list + detail (transcript view)
- [ ] FAQs list + create/edit/deactivate

### Step 3 — Add Zustand UI state
- [ ] date range filter (UI only)
- [ ] sort field + direction
- [ ] selected row state (optional)

### Step 4 — Harden
- [ ] Loading + empty states
- [ ] Basic error panels
- [ ] Normalize time to US Pacific in UI display

---

## Quick ask (so I can align UI routes perfectly)
For each of these endpoints, tell me the **exact JSON response shape** (one example object is enough):
- `GET /api/reservations`
- `GET /api/calls`
- `GET /api/analytics/overview`

If you paste the sample JSON, I’ll generate the exact TypeScript types and the exact tables (columns) without guessing.

If you prefer, you can also just paste your backend’s swagger/postman export or route file snippet.
::contentReference[oaicite:0]{index=0}
