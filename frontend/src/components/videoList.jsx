import React, { useState } from 'react'
import Video from './Video.jsx'
import '../css/homePage.css'
import { Link } from 'react-router-dom'

function VideoList({ sidebarOpen }) {
    const categories = ["All", "Programming", "Tech", "Gaming", "Vlogs", "Music", "Design", "AI", "Education"];

    // Example video data
    const videos = [
        {
            _id: 1,
            title: "React Tutorial for Beginners",
            channel: {
                _id: "channel04",
                channelName: "Code Academy",
                channelPic: "https://placehold.co/100x100.png?text=Code A",
            },
            views: "1.2M",
            thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            category: "programming"
        },
        {
            _id: 2,
            title: "Learn JavaScript in 1 Hour",
            channel: {
                _id: "channel05",
                channelName: "JS Mastery",
                channelPic: "https://placehold.co/100x100.png?text=JS",
            },
            views: "900K",
            thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            category: "Tech"
        },
        {
            _id: 3,
            title: "CSS Flexbox Guide",
            channel: {
                _id: "channel03",
                channelName: "Design Course",
                channelPic: "https://placehold.co/100x100.png?text=Design c",
            },
            views: "500K",
            thumbnail: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            category: "Gaming"
        },
        {
            _id: 4,
            title: "React Tutorial for Beginners",
            channel: {
                _id: "channel04",
                channelName: "Code Academy",
                channelPic: "https://placehold.co/100x100.png?text=Code A",
            },
            views: "1.2M",
            thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            category: "design"
        },
        {
            _id: 5,
            title: "Learn JavaScript in 1 Hour",
            channel: {
                _id: "channel05",
                channelName: "JS Mastery",
                channelPic: "https://placehold.co/100x100.png?text=JS",
            },
            views: "900K",
            thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            category: "AI"
        },
        {
            _id: 6,
            title: "CSS Flexbox Guide",
            channel: {
                _id: "channel03",
                channelName: "Design Course",
                channelPic: "https://placehold.co/100x100.png?text=Design c",
            },
            views: "500K",
            thumbnail: "https://i.ytimg.com/vi/JJSoEo8JSnc/hqdefault.jpg",
            videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
            category: "education"
        },
        // ...add more as needed
    ]

    const [selectedCategory, setSelectedCategory] = useState("All");

    // Filter videos by category (if not "All")
    const filteredVideos = selectedCategory === "All"
        ? videos
        : videos.filter(v =>
            v.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

    return (
        <div className='home-page'>
            <div className='filter-options'>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn${selectedCategory === cat ? ' active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className='videoList'>
                {filteredVideos.map((video, i) => (
                    <Video {...video} key={i}/>
                ))}
            </div>
        </div>
    )
}

export default VideoList
