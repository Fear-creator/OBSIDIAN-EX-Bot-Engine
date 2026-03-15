# obsidian-ex-dashboard

Full-stack admin dashboard for managing users, licenses, sessions, and bot activity.

## Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express
- **Database**: MongoDB + Mongoose

## Project structure

```text
dashboard/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Licenses.jsx
│   │   │   ├── Sessions.jsx
│   │   │   └── Logs.jsx
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Table.jsx
│   │   └── App.jsx
└── backend/
    ├── server.js
    └── routes/
        ├── users.js
        ├── licenses.js
        ├── sessions.js
        └── logs.js
```

## Features

- Bot status and usage metrics panel
- Active users table + **ban user** action
- License manager with expiration support + create/disable flows
- Session manager + **restart session** action
- Command logs view
- MongoDB persistence for users, licenses, sessions, and logs

## Run locally

### 1) Backend setup

```bash
cd dashboard/backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:4000` and exposes API routes under `/api`.

### 2) Frontend setup

```bash
cd dashboard/frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and talks to backend at `http://localhost:4000/api` by default.

Optional custom API URL:

```bash
# dashboard/frontend/.env
VITE_API_BASE_URL=http://localhost:4000/api
```

## API summary

- `GET /api/stats`
- `GET /api/users`
- `PATCH /api/users/:id/ban`
- `GET /api/licenses`
- `POST /api/licenses`
- `PATCH /api/licenses/:id/disable`
- `GET /api/sessions`
- `PATCH /api/sessions/:id/restart`
- `GET /api/logs`

## Example license object

```json
{
  "key": "EX-92X1-AZ",
  "expires": "2026-09-01",
  "active": true
}
```
