# Good Shop

A simple full‑stack e-commerce / blog demo with a Node/Express backend and a Next.js frontend.

## Repository layout

- `backend/` — Express API, MongoDB models, Cloudinary integration, and auth middleware.
- `frontend/` — Next.js (app router) frontend with pages/components and client API helpers.

Key backend files:

- `backend/server.js` — main server entry.
- `backend/src/models/` — Mongoose models (`User`, `Product`, `BlogPost`).
- `backend/src/routes/` — API routes (`authRoutes.js`, `productRoutes.js`, `blogRoutes.js`).
- `backend/.env.example` — example environment variables required by the backend.

Key frontend files:

- `frontend/src/app/` — Next.js app pages and admin area.
- `frontend/src/components/` — UI components.
- `frontend/src/lib/api.js` and `frontend/src/lib/secureApi.js` — client API helpers.
- `frontend/.env` — environment variables for the frontend (e.g. `NEXT_PUBLIC_API_URL`).

## Prerequisites

- Node.js (recommend v18 or later)
- npm (bundled with Node) or yarn
- MongoDB database (Atlas or local)
- A Cloudinary account if you want to use image uploads

## Environment variables

Backend: copy `backend/.env.example` to `backend/.env` and update values. Example keys found in the project:

```
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
JWT_SECRET=your_jwt_secret_here
MONGO_URI=mongodb+srv://<user>:<password>@your-cluster.mongodb.net/<dbname>
```

Frontend: `frontend/.env` currently contains:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Adjust `NEXT_PUBLIC_API_URL` to point to your running backend API.

## Install and run (development)

Open two terminals (one for backend, one for frontend):

Backend (from repo root):

```bash
cd backend
npm install
# create .env from example and edit values
cp .env.example .env
# start dev server (uses nodemon)
npm run dev
```

Notes:

- `npm run dev` in `backend` runs `nodemon server.js`.
- `npm.start` will run `node server.js` (for production/startup without nodemon).

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000` by default. It uses `NEXT_PUBLIC_API_URL` to talk to the backend.

## Build and run (production)

Backend: ensure `backend/.env` is set, then:

```bash
cd backend
npm install --production
npm start
```

Frontend: build and start Next.js:

```bash
cd frontend
npm install
npm run build
npm run start
```

## Common tasks & tips

- If you see CORS errors, verify backend CORS config and that `NEXT_PUBLIC_API_URL` matches the backend URL.
- If uploads fail, confirm `CLOUDINARY_URL` is set and valid.
- Check backend logs for MongoDB connection errors; ensure `MONGO_URI` is reachable.

## Where to look in the code

- Authentication logic: `backend/src/middleware/authMiddleware.js` and `backend/src/routes/authRoutes.js`.
- Cloudinary uploads: `backend/src/middleware/cloudinaryMiddleware.js` and usage in routes.
- Client API usage: `frontend/src/lib/api.js` and `frontend/src/lib/secureApi.js`.

## Next steps (optional)

- Add a process manager (pm2) for production backend deployment.
- Containerize the app with Docker for easier deployment.

---

If you want, I can also add a `contributing` section, Dockerfiles, or a single npm workspace script to start both services together.
