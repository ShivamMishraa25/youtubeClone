import React from 'react'
import '../css/videoPlayer.css'
import { useParams } from 'react-router-dom'

function VideoPlayer() {
    const { videoId } = useParams();

    const dummyVideo = {
        _id: "video123",
        title: "Learn React in 30 Minutes",
        description: "This is a beginner tutorial on React fundamentals.",
        videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
        thumbnail: "https://via.placeholder.com/360x202.png?text=React+Thumbnail",
        channel: {
            channelName: "Code with John",
            channelPic: "https://via.placeholder.com/50x50.png?text=John",
            channelBanner: "https://via.placeholder.com/300x100.png?text=Banner",
            subscribers: 5200
        },
        views: 15200,
        likes: 340,
        dislikes: 12,
        uploadDate: "2024-09-20",
        comments: [
            {
                _id: "c1",
                username: "Alice",
                avatar: "https://via.placeholder.com/40.png?text=A",
                text: "Great video! Helped a lot.",
                timestamp: "2024-09-21T08:30:00Z"
            },
            {
                _id: "c2",
                username: "Bob",
                avatar: "https://via.placeholder.com/40.png?text=B",
                text: "Nice explanation!",
                timestamp: "2024-09-21T10:15:00Z"
            }
        ]
    };

    return (
        <div className="video-player-page">
            <div className="video-player-main">
                <div className="video-player-container">
                    <video
                        className="video-player"
                        src={dummyVideo.videoLink}
                        poster={dummyVideo.thumbnail}
                        controls
                    />
                </div>
                <div className="video-player-title">{dummyVideo.title}</div>
                <div className="video-player-stats">
                    <span>{dummyVideo.views.toLocaleString()} views</span>
                    <span>•</span>
                    <span>{dummyVideo.uploadDate}</span>
                    <span>•</span>
                    <span>👍 {dummyVideo.likes}</span>
                    <span>👎 {dummyVideo.dislikes}</span>
                </div>
                <div className="video-player-channel-row">
                    <img src={dummyVideo.channel.channelPic} alt={dummyVideo.channel.channelName} className="video-player-channel-pic" />
                    <div className="video-player-channel-info">
                        <div className="video-player-channel-name">{dummyVideo.channel.channelName}</div>
                        <div className="video-player-subscribers">{dummyVideo.channel.subscribers.toLocaleString()} subscribers</div>
                    </div>
                </div>
                <div className="video-player-description">
                    {dummyVideo.description}
                </div>
                <div className="video-player-comments">
                    <div className="video-player-comments-title">
                        {dummyVideo.comments.length} Comments
                    </div>
                    <div className="video-player-comments-list">
                        {dummyVideo.comments.map(comment => (
                            <div className="video-player-comment" key={comment._id}>
                                <img src={comment.avatar} alt={comment.username} className="video-player-comment-avatar" />
                                <div className="video-player-comment-body">
                                    <div className="video-player-comment-header">
                                        <span className="video-player-comment-username">{comment.username}</span>
                                        <span className="video-player-comment-time">
                                            {new Date(comment.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="video-player-comment-text">{comment.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="video-player-sidebar">
                <div className="video-player-recommend-title">Up next</div>
                <div className="video-player-recommend-list">
                    {/* Placeholder for recommended videos */}
                    <div className="video-player-recommend-item">Recommended Video 1</div>
                    <div className="video-player-recommend-item">Recommended Video 2</div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer