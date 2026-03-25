# Productivity App

A full-stack, multi-tenant productivity web application designed to help users manage tasks, schedule calendar events, maintain focus using the Pomodoro technique, and interact with a seamlessly integrated AI assistant.

## Features

1. **Multi-Tenant Authentication**: Secure user registration and login system utilizing JSON Web Tokens (JWT) and bcrypt. All user data (tasks, events) is strictly isolated and protected.
2. **Interactive Dashboard**: A unified command center providing a daily overview of pending tasks, today's schedule, and a dynamic SVG productivity progress ring based on task completion percentage.
3. **Task Management**: Comprehensive CRUD operations for tasks, featuring a drag-and-drop interface for priority reordering and visual status toggles.
4. **Calendar System**: Event scheduling and visualization for daily planning.
5. **Pomodoro Timer**: A stateful focus timer supporting standard intervals (work sessions, short breaks, and long breaks) to improve time management.
6. **AI Assistant**: A conversational interface powered by the Llama-3.3-70b model (via Groq API) to assist users with productivity advice and data organization.

## Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios (with JWT Interceptors)
- **Utilities**: `date-fns` for date manipulation, `react-icons` for iconography
- **State Management**: React Context API (`AuthContext`, `PomodoroContext`)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT (JSON Web Tokens) for endpoint protection, bcryptjs for password hashing
- **External API**: Groq Cloud API for LLM processing

## Project Architecture

The project is structured as a Monorepo containing independent `front` and `back` directories.

### Frontend Routes Mapping

The frontend utilizes a strict layout wrapper. All core features are shielded behind a `<ProtectedRoute>` component that verifies the presence of a valid JWT token.

*   **Public Routes**
    *   `/login` - User authentication and session instantiation
    *   `/register` - New user account creation
*   **Protected Routes (Main Layout)**
    *   `/dashboard` - Productivity aggregate view
    *   `/tasks` - Advanced to-do list manager
    *   `/calendar` - Event scheduler
    *   `/pomodoro` - Focus timer module
    *   `/assistant` - Llama 3.3 AI Chat interface
    *   `/settings` - Application parameters

### Backend API Routes Mapping

All core data endpoints require an `Authorization: Bearer <token>` header, parsed by the `authMiddleware`.

*   **Authentication (`/api/auth`)**
    *   `POST /register` - Hashes password and registers a new User attached to a JWT
    *   `POST /login` - Validates credentials and returns a JWT
    *   `GET /me` - Returns current authorized user payload (Protected)
*   **Tasks (`/api/tasks`)** *(Protected)*
    *   `GET /` - Retrieve all tasks belonging to the authorized user
    *   `POST /` - Create a new task tied to `req.user.id`
    *   `PUT /:id` - Update a specific task properties
    *   `DELETE /:id` - Delete a specific task
    *   `PUT /reorder` - Bulk write operation to update task indexing/ordering
*   **Events (`/api/events`)** *(Protected)*
    *   `GET /` - Retrieve all events belonging to the authorized user
    *   `POST /` - Create a new event tied to `req.user.id`
    *   `PUT /:id` - Update a specific event
    *   `DELETE /:id` - Delete a specific event
*   **System (`/api/health`)**
    *   `GET /` - Unprotected endpoint for API connectivity checks

## Local Development Setup

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd back
npm install
```

Create a `.env` file in the `back/` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```

Start the backend development server:
```bash
npm run dev
```

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd front
npm install
```

Create a `.env.local` file in the `front/` directory with your Groq API key:
```env
VITE_GROQ_API_KEY=your_groq_api_token
```

Start the frontend development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.
