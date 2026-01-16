# Roxiler FullStack Intern Coding Challenge

This project is a role-based web application that allows users to submit and manage ratings for registered stores.  
The application supports three user roles: **System Administrator**, **Normal User**, and **Store Owner**, each with specific permissions and dashboards.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- cors for cross-origin communication

### Database
- SQLite (relational, file-based database)

### Frontend
- React.js
- Axios for API communication
- React Router DOM for routing
- Plain CSS for clean and simple UI

---

## User Roles & Functionalities

### System Administrator
- Add new users (Admin / Normal User / Store Owner)
- Add new stores
- View all users (name, email, address, role)
- View all stores (name, email, address, average rating)
- Access admin dashboard
- Logout

---

### Normal User
- Signup and login
- View all registered stores
- Search stores by name or address
- Submit ratings (1–5) for stores
- Update previously submitted ratings
- View personal rating per store
- Logout

---

### Store Owner
- Login to the platform
- View store dashboard
- See average store rating
- View users who have rated the store
- Logout

---

## Database Schema

### Users Table
- `id` (Primary Key)
- `name`
- `email` (unique)
- `password` (hashed)
- `address`
- `role` (`ADMIN`, `USER`, `STORE_OWNER`)

### Stores Table
- `id`
- `name`
- `email`
- `address`
- `owner_id` (Foreign Key → Users)

### Ratings Table
- `id`
- `user_id` (Foreign Key → Users)
- `store_id` (Foreign Key → Stores)
- `rating` (1–5)
- Unique constraint on `(user_id, store_id)`

---

## Authentication & Authorization

- JWT-based authentication
- Tokens passed via `Authorization: Bearer <token>`
- Role-based access enforced using middleware
- Passwords securely hashed using bcrypt

---

## API Endpoints Overview

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Admin
- `GET /api/admin/users`
- `GET /api/admin/stores`
- `POST /api/admin/users`
- `POST /api/admin/stores`

### Normal User
- `GET /api/stores`
- `POST /api/ratings`

### Store Owner
- `GET /api/store-owner/dashboard`

---

## Test Credentials

### Admin
Email: admin@test.com
Password: Admin@123

### Normal User
Email: user@test.com
Password: User@123

### Store Owner
Email: owner@test.com
Password: Owner@123


---

## Frontend Pages

- Login
- Signup
- Admin Dashboard (Users & Stores tables)
- User Dashboard (Store list with rating submission)
- Store Owner Dashboard (Ratings summary)

---

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000