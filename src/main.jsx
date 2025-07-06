import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import VideoPlayer from './pages/VideoPlayer.jsx'
import Homepage from './pages/Homepage.jsx'
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Register from './pages/register.jsx'
import Login from './pages/login.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import Channel from './pages/Channel.jsx'
import Channels from './pages/Channels.jsx'

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
      },
      {
        path: "/createChannel",
        element: <CreateChannel />
      },
      {
        path: "/channel",
        element: <Channel />
      },
      {
        path: "/channels/:id",
        element: <Channels />
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
