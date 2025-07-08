import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video from './Video.jsx';
import '../css/homePage.css';
import { useOutletContext } from 'react-router-dom';

function VideoList({ sidebarOpen }) {
    const categories = ["All", "Programming", "Tech", "Design", "AI", "Gaming", "Vlogs", "Music", "Education"];
    const [videos, setVideos] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const {
        searchedVal,
        setSearchedVal,
        searchActive,
        setSearchActive
    } = useOutletContext();

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

    // Handle category click: clear search and deactivate search
    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        setSearchedVal("");
        setSearchActive(false);
    };

    // If search is active, filter by search value (title, case-insensitive)
    let filteredVideos = videos;
    if (searchActive && searchedVal.trim()) {
        filteredVideos = videos.filter(v =>
            v.title?.toLowerCase().includes(searchedVal.trim().toLowerCase())
        );
    } else if (selectedCategory !== "All") {
        filteredVideos = videos.filter(v =>
            v.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
    }

    // If search is active, always show "All" as selected
    const effectiveCategory = searchActive ? "All" : selectedCategory;

    return (
        <div className='home-page'>
            <div className='filter-options'>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn${effectiveCategory === cat ? ' active' : ''}`}
                        onClick={() => handleCategoryClick(cat)}
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
