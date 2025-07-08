import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video from './Video.jsx';
import '../css/homePage.css';

function VideoList({ sidebarOpen }) {
    const categories = ["All", "Programming", "Tech", "Gaming", "Vlogs", "Music", "Design", "AI", "Education"];
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await axios.get("http://localhost:5100/api/videos");
                setVideos(data);
            } catch (err) {
                console.error("Failed to load videos:", err);
            }
        };
        fetchVideos();
    }, []);
    console.log(videos);

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
                {filteredVideos.map((video) => (
                    <Video {...video} key={video._id} />
                ))}
            </div>
        </div>
    );
}

export default VideoList;
