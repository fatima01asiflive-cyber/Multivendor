# Multivendor Platform - Backend

Node.js + Express + MongoDB backend for the multivendor ecommerce platform.

## Getting Started

1. Copy `.env.example` to `.env` and configure it:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Project Structure

```
backend/
├── src/
│   ├── index.js           - Main server file
│   ├── models/            - Database models
│   ├── routes/            - API routes
│   ├── controllers/       - Route handlers
│   └── middleware/        - Custom middleware
├── .env.example           - Environment variables template
└── package.json
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Cookie handling
- **nodemailer** - Email service
- **dotenv** - Environment variables

## API Health Check

```bash
curl http://localhost:5000/api/health
```
