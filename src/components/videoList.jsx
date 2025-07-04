import React from 'react'
import Video from './Video.jsx'
import '../css/homePage.css'
import { Link } from 'react-router-dom'

function VideoList({ sidebarOpen }) {
    // Example video data
    const videos = [
        {
            id: 1,
            title: "React Tutorial for Beginners",
            channel: "CodeAcademy",
            views: "1.2M",
            thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        },
        {
            id: 2,
            title: "Learn JavaScript in 1 Hour",
            channel: "JS Mastery",
            views: "900K",
            thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        },
        {
            id: 3,
            title: "CSS Flexbox Guide",
            channel: "DesignCourse",
            views: "500K",
            thumbnail: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        },
        // ...add more as needed
    ]

    return (
        <div className='videoList'>
            {videos.map((video, i) => (
                <Link to={`/Video/${video.id}`}>
                    <Video key={i} {...video} />
                </Link>
            ))}
        </div>
    )
}

export default VideoList
