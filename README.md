# Nuzio AI - Personalized News Application

Nuzio AI is a personalized news application that delivers news based on a user's preferences such as language, profession, interests, and preferred narrator voice.

The application provides a personalized onboarding experience and allows authenticated users to view and listen to news that matches their selected interests.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Protected API Routes
- Personalized User Preferences
- Language Selection
- Profession Selection
- Interest Selection
- Narrator Voice Selection
- Personalized News Feed
- Interest-Based News Filtering
- News Playback using Browser Text-to-Speech
- MongoDB Database Integration
- Responsive User Interface
- Automatic routing based on user preference completion

---

## Application Flow

The main user flow of the application is:

```text
Landing Page
      ↓
Register / Login
      ↓
Personalization
      ↓
Language Selection
      ↓
Profession Selection
      ↓
Interest Selection
      ↓
Narrator Voice Selection
      ↓
Personalized News
      ↓
Play News

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Browser API

- Web Speech API
- SpeechSynthesis API


## Project Structure

news_app/
│
├── README.md
│
├── nuzio-ai-frontend/
│   │
│   ├── app/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── register/
│   │   │   └── page.tsx
│   │   │
│   │   ├── onboarding/
│   │   │   └── page.tsx
│   │   │
│   │   ├── voice/
│   │   │   └── page.tsx
│   │   │
│   │   ├── home/
│   │   │   └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   └── lib/
│       └── api.ts
│
└── nuzio-ai-backend/
    │
    ├── src/
    │   │
    │   ├── config/
    │   │   └── db.ts
    │   │
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── preferenceController.ts
    │   │   └── newsController.ts
    │   │
    │   ├── middleware/
    │   │   └── authMiddleware.ts
    │   │
    │   ├── models/
    │   │   ├── User.ts
    │   │   └── News.ts
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── preferenceRoutes.ts
    │   │   └── newsRoutes.ts
    │   │
    │   └── server.ts
    │
    └── .env

    ---

## API Endpoints

### Authentication APIs

#### Register

```http
POST /api/auth/register

POST /api/auth/login

POST /api/preferences

GET /api/preferences

GET /api/news

---

## Database

The application uses MongoDB as the database with Mongoose for data modeling and database operations.

### Database Name
nuzio-ai

Collections

The application uses the following collections:

Users
News

User Model

The User collection stores authentication and personalization information.

The stored fields include:

Email
Hashed Password
Language
Profession
Interests
Narrator Voice
Created At
Updated At


News Model

The News collection stores the news content displayed to users.

The stored fields include:

Category
Title
Description
Source
Created At
Updated At

---

## Authentication & Security

The application uses JWT-based authentication to protect user-specific data and APIs.

### Registration

When a user registers:

1. The backend checks whether the email already exists.
2. The password is hashed using bcryptjs.
3. The user information is stored in MongoDB.
4. The password is never stored as plain text.

### Login

When a user logs in:

1. The backend verifies the user's email.
2. The password is compared with the stored hashed password.
3. A JWT token is generated after successful authentication.
4. The token is returned to the frontend.
5. The frontend stores the token for authenticated requests.

### Protected Routes

The following APIs require a valid JWT token:


POST /api/preferences
GET  /api/preferences
GET  /api/news


---

## Frontend Features

The frontend provides a simple and responsive user experience for authentication, personalization, and personalized news playback.

### Landing Page

The landing page provides:

- Nuzio AI introduction
- Get Started button
- Login button

Users can start the application from:
http://localhost:3000

---

## Installation and Setup

### Prerequisites

Before running the project, make sure the following are installed:

- Node.js
- npm
- MongoDB
- Git

---

## Backend Setup

Open a terminal and navigate to the backend folder:

cd nuzio-ai-backend

---

## Complete Demo Flow

The complete application can be tested using the following flow:

1. Open http://localhost:3000
        ↓
2. Click "Get Started"
        ↓
3. Create a new account
        ↓
4. Login
        ↓
5. Select Language
        ↓
6. Select Profession
        ↓
7. Select Interests
        ↓
8. Continue to Voice Selection
        ↓
9. Select Narrator Voice
        ↓
10. Continue to Personalized News
        ↓
11. View personalized news
        ↓
12. Click Play on a news article
        ↓
13. News is read using browser Text-to-Speech

---

## Assignment Scope

This project focuses on the important screens and core functionality required for the Nuzio AI assignment.

### Authentication

- User Registration
- User Login
- JWT-based authentication
- Protected API routes

### Personalization

- Language selection
- Profession selection
- Interest selection
- Narrator voice selection

### Personalized News

- Personalized news feed
- Interest-based news filtering
- News cards
- News playback using browser Text-to-Speech

The implementation focuses on the core user journey from authentication to personalized news playback.

---

## Important Notes

- The application uses sample news data stored in MongoDB.
- News is currently filtered based on the user's selected interests.
- News playback uses the browser's Web Speech API.
- Available speech voices depend on the user's browser and operating system.
- Google Sign-In is not enabled in this assignment demo.
- The `.env` file contains sensitive configuration and should not be committed to GitHub.
- The application is intended for technical assignment demonstration purposes.

---

## Future Improvements

Possible future improvements include:

- Google OAuth authentication
- Real-time news API integration
- AI-powered news summarization
- Advanced personalized recommendation system
- More narrator voice options
- News history
- Bookmark functionality
- Push notifications
- Admin news management
- Cloud deployment

---

## Author

**Janak Parmar**

Full Stack / MERN Stack Developer

---

## License

This project was developed as a technical assignment for demonstration and evaluation purposes.