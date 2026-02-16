# Resumly

> ⚙️ A full-stack resume builder application with React/Vite on the frontend and an Express/MongoDB API on the backend.

This repository contains two separate projects—`frontend` and `backend`—that work together to let users create, save, and preview resumes. The backend handles user authentication and data storage, while the frontend provides a responsive UI for building and viewing resumes.

---

## 🗂 Project Structure

```
/resumly
├── backend          # Express API
│   ├── config       # DB connection
│   ├── controllers  # Route handlers
│   ├── middlewares  # Auth middleware
│   ├── models       # Mongoose schemas
│   ├── routes       # Express routers
│   ├── index.js     # Entry point
│   └── package.json
├── frontend         # React + Vite app
│   ├── public
│   ├── src          # components, pages, assets
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md        # <-- you are here
```

---

## 🚀 Getting Started

You can run the backend and frontend independently. Open two terminals (or tabs) and follow the instructions below.

### 🧩 Prerequisites

- Node.js 18+ and npm or yarn
- MongoDB instance (local or cloud)

### 🔧 Environment Variables

Create a `.env` file in the `backend` folder with the following keys:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET_KEY=your_secret_key
```

The frontend currently uses hardcoded dummy data and will later call the backend API at `http://localhost:3000` by default. Adjust `proxy` or `API` URL in the React code if needed.

---

## 📁 Backend (API)

### 🛠 Installation

```bash
cd backend
npm install          # or yarn
```

### ▶️ Start Server

```bash
npm run dev          # if using nodemon or node index.js
# or
node index.js
```

The server listens on `PORT` (3000 by default) and connects to MongoDB using `MONGODB_URI`.<br/>
You can verify it with a GET request to `/`.

### 🔌 Endpoints

| Method | Path               | Description                      | Auth required |
|--------|--------------------|----------------------------------|---------------|
| POST   | `/api/users/register` | Register a new user             | No            |
| GET    | `/api/users/login`    | Log in an existing user (email & password in request body) | No            |
| GET    | `/api/users/data`     | Fetch current user’s profile    | Yes (Bearer token)

> **Note:** Tokens are JWTs signed with `JWT_SECRET_KEY` and expire in 7 days.

### 🗃 Database Models

- **User**: stores `name`, `email`, and hashed `password`.<br/>
  The schema also contains a method `comparePassword` for authentication.

- **Resume**: _(currently empty)_ intended to hold resume data per user.

---

## 🎨 Frontend (React + Vite)

### 🛠 Installation

```bash
cd frontend
npm install          # or yarn
```

### ▶️ Start Development Server

```bash
npm run dev          # launches vite dev server at http://localhost:5173
```

### 🧱 Features & Pages

- **Home**: marketing landing page with banner, features, testimonials, etc.
- **Login / Register**: forms for user authentication (backend integration pending).
- **Dashboard**: list of saved resumes (uses dummy data currently).
- **Resume Builder**: interactive form (personal info, experience, education, etc.) with live preview.
- **Preview**: view a finished resume.

### 🗂 Notable Components

- `Navbar.jsx`, `PersonalInfoForm.jsx`, layout components, and various home page widgets.
- `Banner`, `Hero`, `Features`, etc. under `frontend/src/components/home`.

> The frontend currently fetches demo data from `src/assets/assetsFile.js`. Real API calls to the backend can be added by replacing these with `fetch`/`axios` requests and updating state accordingly.

---

## 🧪 Testing

_No dedicated tests are included yet._ You can add Jest/React Testing Library for the frontend and Jest/Mocha for the backend in future updates.

---

## 📦 Scripts Summary

```bash
# backend (in backend/)
npm install      # install dependencies
npm run dev       # start with nodemon (if configured)
node index.js     # start normally

# frontend (in frontend/)
npm install      # install dependencies
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # serve the production build
```

---

## 💡 Tips

- Keep the backend server running when developing the frontend to enable API integration.
- Use tools like Postman or cURL to test backend routes manually.
- Update CORS settings in `backend/index.js` if you host frontend separately.

---

## 📄 License

This project is open-source. Feel free to use and modify it!

---

Happy building! 👩‍💻👨‍💻
