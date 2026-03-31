# 📝 Simple Fullstack Board App

A beginner-friendly fullstack application demonstrating CRUD operations with React, Express, Node.js, and MySQL.

![Tech Stack](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-18-blue) ![MySQL](https://img.shields.io/badge/MySQL-8+-orange)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MySQL 8+ installed and running

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the schema (copy content from backend/schema.sql)
source backend/schema.sql

# Or paste the SQL commands directly in MySQL Workbench/CLI
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy and edit environment file
cp ../.env.example .env
# Edit .env with your MySQL password

npm start
# Server runs on http://localhost:3001
```

### 3. Frontend Setup

```bash
# In a new terminal
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

## 📁 Project Structure

```
simple-board/
├── backend/
│   ├── server.js       # Express API server
│   ├── db.js           # MySQL connection
│   ├── schema.sql      # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx     # Main React component
│   │   └── main.jsx    # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env.example        # Environment template
├── .gitignore
├── README.md
└── DATA_FLOW.md        # Data flow documentation (Korean)
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| POST | `/posts` | Create a new post |
| DELETE | `/posts/:id` | Delete a post by ID |

### Request/Response Examples

**Create Post**
```bash
curl -X POST http://localhost:3001/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"World","author":"John"}'
```

**Get All Posts**
```bash
curl http://localhost:3001/posts
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite |
| Backend | Node.js, Express |
| Database | MySQL |
| HTTP Client | Fetch API |

## 📚 Learning Topics

This project demonstrates:
- Frontend ↔ Backend communication via REST API
- Express routing (GET, POST, DELETE)
- MySQL CRUD operations
- React state management (useState, useEffect)
- JSON data format for client-server communication

## ⚠️ Common Issues

### `Cannot connect to MySQL`
1. Check MySQL is running: `net start mysql`
2. Verify password in `.env`
3. Ensure database `simple_app` exists

### CORS Error
- Make sure backend is running on port 3001
- Check `API_URL` in `frontend/src/App.jsx`

### Port Already in Use
- Change port in `backend/server.js` or `frontend/vite.config.js`

## 📄 License

MIT
