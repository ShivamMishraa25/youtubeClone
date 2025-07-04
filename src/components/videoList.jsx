import React from 'react'
import Video from './Video.jsx'
import '../css/homePage.css'

function VideoList({ sidebarOpen }) {
    // Example video data
    const videos = [
        {
            title: "React Tutorial for Beginners",
            channel: "CodeAcademy",
            views: "1.2M",
            thumb: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg"
        },
        {
            title: "Learn JavaScript in 1 Hour",
            channel: "JS Mastery",
            views: "900K",
            thumb: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg"
        },
        {
            title: "CSS Flexbox Guide",
            channel: "DesignCourse",
            views: "500K",
            thumb: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg"
        },
        // ...add more as needed
    ]

    return (
        <div
            className='videoList'
            style={sidebarOpen
                ? { marginLeft: 220 }
                : { marginLeft: 0 }
            }
        >
            {videos.map((v, i) => (
                <Video key={i} {...v} />
            ))}
        </div>
    )
}

export default VideoList
