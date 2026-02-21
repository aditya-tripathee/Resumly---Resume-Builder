
# Resumly — Resume Builder

Resumly is a full-stack resume builder application. The project includes a React + Vite frontend and a Node.js backend (Express) that persists data to MongoDB.

## Table of contents

- Project overview
- Tech stack
- Repo structure
- Prerequisites
- Setup and running (backend & frontend)
- Environment variables
- Deployment
- Contributing
- License & contact

## Project overview

Resumly helps users create, preview and export professional resumes. The frontend contains forms and preview UIs while the backend exposes REST APIs to create and manage user resumes.

## Tech stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)

## Repo structure (high level)

- `backend/` — Express server, controllers, models, routes, upload handling
- `frontend/` — React + Vite app (UI, pages, components)
- `uploads/` — uploaded assets (images, user files)

See `frontend/README.md` for frontend-specific details: [frontend/README.md](frontend/README.md)

## Prerequisites

- Node.js 18+ (or compatible LTS)
- npm (or yarn)
- MongoDB instance or MongoDB Atlas cluster

## Backend — setup & run

1. Install dependencies

```bash
cd backend
npm install
```

2. Configure environment

Create a `.env` file in the `backend` directory with at least the following variables:

```
MONGODB_URI=mongodb://localhost:27017
PORT=5000
JWT_SECRET=your_jwt_secret
```

Notes:
- The backend `dbConnect` expects `MONGODB_URI` and will append the project database name `resumly` automatically.

3. Start the server (development)

```bash
npm run dev
```

4. Production

```bash
npm start
```

## Frontend — setup & run

Refer to the frontend README for full instructions: [frontend/README.md](frontend/README.md)

Quick start:

```bash
cd frontend
npm install
npm run dev
```

If the frontend needs to call the backend locally, set `VITE_API_BASE_URL` in `frontend/.env` (example):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Environment variables summary

- Backend (`backend/.env`)
	- `MONGODB_URI` — base connection string (no DB name required)
	- `PORT` — server port (default 5000)
	- `JWT_SECRET` — secret for signing auth tokens

- Frontend (`frontend/.env`)
	- `VITE_API_BASE_URL` — base URL for API calls (Vite requires `VITE_` prefix)

## Deployment

- Build the frontend with `cd frontend && npm run build` and deploy the `dist/` folder to static hosts (Vercel, Netlify, S3, etc.).
- Deploy the backend to any Node-friendly host (Heroku, Railway, Render, VPS) and ensure the `MONGODB_URI` points to a production-ready MongoDB instance.

## Contributing

- Fork the repo, create a branch, make changes, and open a pull request against `main`.
- Keep frontend and backend changes scoped to their respective folders.

## License & Contact

Include your preferred license here and contact info (email or GitHub handle) for contributors.

---
Generated README for the Resumly project. Customize details (license, contact, exact scripts) as needed.

Happy building! 👩‍💻👨‍💻
