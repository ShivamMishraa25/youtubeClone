# YouTube Clone (MERN Stack)

A full-stack YouTube clone built with React, Node.js, Express, and MongoDB.  
This project is for educational purposes and demonstrates a modern video-sharing platform with authentication, channels, video upload, comments, likes/dislikes, and responsive UI.

---

## Live Demo

- **Deployed App:** [http://shivammishraa25.github.io/youtubeClone/](http://shivammishraa25.github.io/youtubeClone/)
- **Demo Video:** [Watch on YouTube](https://youtu.be/your-demo-video-id)

---

## Repository

- **GitHub:** [https://github.com/shivammishraa25/youtubeClone](https://github.com/shivammishraa25/youtubeClone)

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

---

## Tech Stack

- **Frontend:** React 19, React Router v7, Axios, React Icons, Vite
- **Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, bcrypt
- **Styling:** Custom CSS (no frameworks)
- **Other:** Date-fns for date formatting

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with:

  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

- Start the backend server:

  ```bash
  npm start
  ```

  The backend runs on [http://localhost:5100](http://localhost:5100).

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Start the frontend dev server:

  ```bash
  npm run dev
  ```

  The frontend runs on [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

- **Register** a new account or **login**.
- **Create your channel** after logging in.
- **Upload videos** from your channel page or the upload icon in the header.
- **Watch videos**, like/dislike, and comment.
- **Edit your channel** details and manage your videos.
- **Browse other channels** and subscribe (UI only).
- **Search** for videos by title.
- **404 Not Found** page for invalid routes.

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
│   ├── .env.example
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

## Notes

- **Educational Use Only:** This project is for learning and demo purposes. Do not use in production.
- **No Video Uploads:** Videos are referenced by URL; actual file uploads are not implemented.
- **No Payments/Monetization:** Subscriptions and memberships are UI only.
- **Security:** Basic JWT auth; not hardened for production.
- **API Endpoints:** All backend API endpoints are prefixed with `/api/`.
- **Error Handling:** User-friendly error messages for failed actions.
- **Accessibility:** Basic keyboard navigation and focus styles.

---

## Credits

- Project by **Shivam Mishra**
- Inspired by YouTube's UI/UX

---

## License

This project is licensed for **educational use only.**
