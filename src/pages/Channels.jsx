import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../css/channel.css'
import { BsThreeDotsVertical } from "react-icons/bs";

function Channels() {
    const { id } = useParams();

    // Dummy data for demonstration
    const channel = {
        _id: "channel02",
        channelName: "Tech Explained",
        description: "Explaining tech simply. Lörem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        channelPic: "https://placehold.co/100x100.png?text=TE",
        channelBanner: "https://placehold.co/600x150.png?text=Tech+Explained",
        owner: "user02",
        subscribers: 980,
        videos: [
            {
                _id: "video456",
                title: "JavaScript in 10 Minutes",
                videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                thumbnail: "https://placehold.co/150x100.png?text=JS",
                description: "Fast-paced JS tutorial.",
                views: 4200,
                likes: 210,
                dislikes: 7,
                uploadDate: "2024-09-25"
            },
            {
                _id: "video457",
                title: "What is the Cloud?",
                videoLink: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
                thumbnail: "https://placehold.co/150x100.png?text=Cloud",
                description: "Explaining cloud computing in layman's terms.",
                views: 6700,
                likes: 330,
                dislikes: 12,
                uploadDate: "2024-09-26"
            }
        ]
    };

    const [descExpanded, setDescExpanded] = useState(false);
    const descLimit = 180;
    const showMore = channel.description.length > descLimit;
    const descToShow = descExpanded ? channel.description : channel.description.slice(0, descLimit);

    return (
        <div className="channel-page" style={{ flex: 1 }}>
            <div className="channel-banner-container">
                <img
                    className="channel-banner"
                    src={channel.channelBanner}
                    alt="Channel banner"
                />
            </div>
            <div className="channel-header">
                <img className="channel-avatar" src={channel.channelPic} alt={channel.channelName} />
                <div className="channel-info">
                    <div className="channel-title">{channel.channelName}</div>
                    <div className="channel-meta">
                        <span className="channel-handle">@{channel.channelName.toLowerCase().replace(/\s/g, '')}-ic4ou</span>
                        <span className="channel-dot">·</span>
                        <span className="channel-subs">{channel.subscribers} subscribers</span>
                        <span className="channel-dot">·</span>
                        <span className="channel-videos">{channel.videos.length} videos</span>
                    </div>
                    <div className="channel-desc">
                        {descToShow}
                        {showMore && !descExpanded && (
                            <span className="desc-more" onClick={() => setDescExpanded(true)}>...more</span>
                        )}
                        {showMore && descExpanded && (
                            <span className="desc-less" onClick={() => setDescExpanded(false)}> Show less</span>
                        )}
                    </div>
                    <div className="channel-actions">
                        <button className="channel-btn subscribe">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="channel-tabs">
                <div className="channel-tab">Home</div>
                <div className="channel-tab active">Videos</div>
                <div className="channel-tab">Shorts</div>
                <div className="channel-tab">Playlists</div>
                <div className="channel-tab">Posts</div>
            </div>
            <div className="channel-videos-list">
                {channel.videos.map(video => (
                    <div className="channel-video-card" key={video._id}>
                        <Link to={`/video/${video._id}`}>
                            <img className="channel-video-thumb" src={video.thumbnail} alt={video.title} />
                        </Link>
                        <div className="channel-video-info">
                            <div className="channel-video-title">{video.title}</div>
                            <div className="channel-video-meta">
                                <span>{video.views} views</span>
                                <span className="channel-dot">·</span>
                                <span>{video.uploadDate}</span>
                            </div>
                        </div>
                        <div className="channel-video-actions">
                            <span className="channel-video-meatball" tabIndex={0}>
                                <BsThreeDotsVertical />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Channels