# YouTube Clone (MERN Stack)

A full-stack YouTube-style video-sharing app built with **React**, **Node.js**, **Express**, and **MongoDB**.  
This project demonstrates user authentication, channel creation, video uploads, like/dislike functionality, comments, and a responsive UI — all styled to resemble the YouTube experience.

---

## Live Demo

- **Deployed App:** [https://shivammishraa25.github.io/youtubeClone/](https://shivammishraa25.github.io/youtubeClone/)
- **Deployed Backend** [https://youtube-backend-cx37.onrender.com](https://youtube-backend-cx37.onrender.com)
- **Demo Video:** [Watch on YouTube](https://www.youtube.com/watch?v=ya7_uGjJHDY)

---

## Repository (fullstack and backend)

- **GitHub:** [github.com/shivammishraa25/youtubeClone](https://github.com/shivammishraa25/youtubeClone)
- **Backend:** [github.com/shivammishraa25/youtube-backend](https://github.com/ShivamMishraa25/youtube-backend)

---

## Features

- **User Authentication:** Register, login, JWT-based authentication.
- **Channels:** Create, customize, and manage your own channel.
- **Video Upload:** Upload videos with title, description, thumbnail, and category.
- **Video Player:** Watch videos, see channel info, like/dislike, and comment.
- **Comments:** Add, edit, and delete comments on videos.
- **Responsive UI:** Works well on desktop and mobile, styled to resemble YouTube.
- **Sidebar & Header:** Collapsible sidebar, search, and user menu.
- **Recommended Videos:** "Up next" sidebar with recommended videos.
- **404 Page:** Custom not found page styled like YouTube.
- **Lazy Loading:** Components are lazy-loaded for faster initial load.
- **Custom Loading Screen:** YouTube-style loading animation for better UX.
- **upload date** formatted with `date-fns`

---

## Tech Stack

| Layer       | Tech Used                                 |
|-------------|-------------------------------------------|
| Frontend    | React 19, React Router v7, Axios, Vite    |
| Backend     | Node.js, Express 5, MongoDB, Mongoose     |
| Auth        | JWT, bcrypt                               |
| Styling     | Custom CSS (No frameworks)                |
| Utilities   | `date-fns` for formatting dates           |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (Atlas or local)
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/shivammishraa25/youtubeClone.git
cd youtubeClone
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Seed the database with realistic dummy data:

```bash
node seed.js
```

Start the server:

```bash
npm start
```

Backend will run at `http://localhost:5100`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`

---

## Usage Guide

1. **Register/Login** using the form. Avatar URL is optional (auto-generated if empty).
2. **Create Your Channel** – set channel name and picture.
3. **Upload Videos** with title, description, thumbnail URL, and category.
4. **Browse Videos** from homepage. Filter by category or search title.
5. **Watch Videos**, like/dislike, and **interact with comments**.
6. **Edit/Delete** your own comments.
7. **Navigate to Channels**, view uploaded videos.

---

## Project Structure

```
youtubeClone/
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── seed/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── css/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## Notes & Design Decisions

- **Educational Use Only:** This project is for learning and demo purposes. Do not use in production.
- **No Video Uploads:** Videos are referenced by URL; actual file uploads are not implemented.
- **No Payments/Monetization:** Subscriptions and memberships are UI only.
- **Security:** Basic JWT auth; not hardened for production.
- **API Endpoints:** All backend API endpoints are prefixed with `/api/`.
- **Error Handling:** User-friendly error messages for failed actions.
- **Accessibility:** Basic keyboard navigation and focus styles.

---

## Author

> Project by **Shivam Mishra**
> Inspired by YouTube's UI/UX

- GitHub: [@shivammishraa25](https://github.com/shivammishraa25)
- Project Repo: [youtubeClone](https://github.com/shivammishraa25/youtubeClone)

---

## License

This project is **open for educational purposes** only.  
Do not use in production without security upgrades.
