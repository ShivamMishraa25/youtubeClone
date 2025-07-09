import "./index.css";
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BsYoutube } from "react-icons/bs";
import NotFound from "./pages/notFound.jsx";
// import App from './App.jsx'
// import VideoPlayer from './pages/VideoPlayer.jsx'
// import Homepage from './pages/Homepage.jsx'
// import Register from './pages/register.jsx'
// import Login from './pages/login.jsx'
// import CreateChannel from './components/CreateChannel.jsx'
// import Channel from './pages/Channel.jsx'
// import Channels from './pages/Channels.jsx'

const App = lazy(() => import("./App.jsx"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer.jsx"));
const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const CreateChannel = lazy(() => import("./components/CreateChannel.jsx"));
const Channel = lazy(() => import("./pages/Channel.jsx"));
const Channels = lazy(() => import("./pages/Channels.jsx"));

const LoadingFallback = () => (
  <div style={{minHeight: "60vh",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",background: "#fff",}}>
    <div style={{display: "flex",alignItems: "center",marginBottom: 18,}}>
      <BsYoutube color="#FF0000" size={"3rem"} />
      <span style={{fontWeight: 700,fontSize: "2rem",color: "#222",letterSpacing: "-0.04em",fontFamily: "Arial, sans-serif",}}>
        YouTube
      </span>
    </div>
    <div style={{width: 120,height: 4,borderRadius: 2,background: "#e5e5e5",overflow: "hidden",position: "relative",}}>
      <div style={{width: 60,height: 4,background: "#FF0000",borderRadius: 2,position: "absolute",left: 0,top: 0,animation: "ytbar 1.2s cubic-bezier(.4,0,.2,1) infinite",}}/>
      <style>
        {`@keyframes ytbar {
          0% { left: -60px; width: 60px; }
          50% { left: 60px; width: 60px; }
          100% { left: 120px; width: 60px; }
        }`}
      </style>
    </div>
    <div style={{marginTop: 24,fontSize: "1.1rem",color: "#606060",fontWeight: 500,letterSpacing: "0.01em",}}>
      Loading...
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/video/:videoId",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VideoPlayer />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/createChannel",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <CreateChannel />
          </Suspense>
        ),
      },
      {
        path: "/channel",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "/channels/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Channels />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
