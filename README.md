# EduAdmin | Student Management System

A premium, modular, and scalable student management application built with **Next.js 15**, **Prisma 7**, and **Supabase**.

## 🚀 Key Features

- **Persistent Storage:** Fully integrated with Supabase PostgreSQL.
- **Industry-Standard Architecture:** Modular service layer decoupled from API routes.
- **Modern UI:** Responsive dashboard design with sidebar navigation and mobile drawer.
- **Secure Data Handling:** Zod-validated schemas and proper error boundary management.

## 🛠️ Technology Stack

- **Frontend:** Next.js (App Router), React 19.
- **Backend:** Next.js API Routes.
- **Database:** Supabase (PostgreSQL).
- **ORM:** Prisma 7 with the new configuration pattern.
- **Icons:** React Icons (Lucide).
- **Validation:** Zod.

## 📦 Project Structure

```bash
src/
├── app/                  # Next.js App Router (Layouts, Pages, APIs)
├── components/           # Generic UI components
├── features/
│   └── students/         # Domain-driven student feature layer
│       ├── components/   # Feature-specific components (Sidebar, StudentTable, etc.)
│       ├── hooks/        # Custom React hooks (useStudents)
│       └── services/     # Client-side API services
├── lib/                  # Shared libraries (Prisma Client, StudentService)
└── styles/               # Global CSS and design tokens
```

## ⚙️ Setup & Configuration

### 1. Environment Variables
Create a `.env` file in the root directory:

```bash
# Supabase Connection (Direct for migrations, Port 5432)
DATABASE_URL="postgres://postgres:[PASSWORD]@[HOST]:5432/postgres"
DIRECT_URL="postgres://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase API
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON_KEY]"
```

### 2. Database Migration
```bash
npx prisma migrate dev --name init
```

### 3. Running Locally
```bash
npm install
npm run dev
```

## 📈 Scalability Note
The project uses **Prisma 7**'s latest configuration patterns and PostgreSQL adapters, making it ready for high-concurrency environments and serverless deployment. The modular `StudentService` allows for easy extension (e.g., adding caching, logging, or additional data features) without touching the core business logic.
