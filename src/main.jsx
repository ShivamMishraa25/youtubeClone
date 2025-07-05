import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VideoPlayer from './pages/VideoPlayer.jsx'
import Channel from './components/Channel.jsx'
import Homepage from './pages/Homepage.jsx'
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/channel",
        element: <Channel />
      },
      {
        path: "/video/:videoId",
        element: <VideoPlayer />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
