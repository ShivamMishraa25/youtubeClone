import React, { useState } from 'react'
import '../css/videoPlayer.css'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

function VideoPlayer() {
    const { videoId } = useParams();
    // const isLiked = user?.likedVideos?.includes(videoId); // this will be used later

    const video = {
        _id: "video123",
        title: "Learn React in 30 Minutes",
        description: `This is a beginner tutorial on React fundamentals. Lörem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lörem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
        videoLink: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
        thumbnail: "https://placehold.co/360x202.png?text=React+Thumbnail",
        channel: {
            _id: "channel01",
            channelName: "Code with John",
            channelPic: "https://placehold.co/50x50.png?text=John",
            channelBanner: "https://placehold.co/300x100.png?text=Banner",
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
                avatar: "https://placehold.co/40x40.png?text=A",
                text: "Great video! Helped a lot.",
                timestamp: "2024-09-21T08:30:00Z"
            },
            {
                _id: "c2",
                username: "Bob",
                avatar: "https://placehold.co/40x40.png?text=B",
                text: "Nice explanation!",
                timestamp: "2024-09-21T10:15:00Z"
            }
        ]
    };

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(video.likes);
    const [dislikeCount, setDislikeCount] = useState(video.dislikes);
    const [descExpanded, setDescExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(video.comments);
    const [menuOpen, setMenuOpen] = useState(null); // comment id for open menu
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    // Simulate current user
    const currentUser = {
        username: "You",
        avatar: "https://placehold.co/40.png?text=Y"
    };

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            setLiked(true);
            setLikeCount(likeCount + 1);
            if (disliked) {
                setDisliked(false);
                setDislikeCount(dislikeCount - 1);
            }
        }
    };

    const handleDislike = () => {
        if (disliked) {
            setDisliked(false);
            setDislikeCount(dislikeCount - 1);
        } else {
            setDisliked(true);
            setDislikeCount(dislikeCount + 1);
            if (liked) {
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        }
    };

    const handleComment = () => {
        if (comment.trim()) {
            setComments([
                {
                    _id: Date.now().toString(),
                    username: currentUser.username,
                    avatar: currentUser.avatar,
                    text: comment,
                    timestamp: new Date().toISOString()
                },
                ...comments
            ]);
            setComment("");
        }
    };

    const handleEdit = (comment) => {
        setEditId(comment._id);
        setEditText(comment.text);
        setMenuOpen(null);
    };

    const handleEditSave = (id) => {
        setComments(comments =>
            comments.map(c =>
                c._id === id ? { ...c, text: editText } : c
            )
        );
        setEditId(null);
        setEditText("");
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditText("");
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this comment?")) {
            setComments(comments => comments.filter(c => c._id !== id));
            setMenuOpen(null);
        }
    };

    // Description logic
    const descLimit = 180;
    const showMore = video.description.length > descLimit;
    const descToShow = descExpanded ? video.description : video.description.slice(0, descLimit);

    return (
        <div className="video-player-page light">
            <div className="video-player-main">
                <div className="video-player-container">
                    <video
                        className="video-player"
                        src={video.videoLink}
                        poster={video.thumbnail}
                        controls
                    />
                </div>
                <div className="video-player-title">{video.title}</div>
                <div className="video-player-row">
                    <div className="video-player-channel-row">
                        <Link to={`/channels/:${video?.channel?._id}`}>
                            <img src={video.channel.channelPic} alt={video.channel.channelName} className="video-player-channel-pic" />
                        </Link>
                        <Link to={`/channels/:${video?.channel?._id}`}>
                            <div className="video-player-channel-info">
                                <div className="video-player-channel-name">{video.channel.channelName}</div>
                                <div className="video-player-subscribers">{video.channel.subscribers.toLocaleString()} subscribers</div>
                            </div>
                        </Link>
                        <button className="video-player-subscribe-btn">Subscribe</button>
                    </div>
                    <div className="video-player-actions">
                        <button
                            className={`video-player-action-btn${liked ? ' active' : ''}`}
                            onClick={handleLike}
                        >
                            {liked ? <AiFillLike /> : <AiOutlineLike />}
                            <span>{likeCount}</span>
                        </button>
                        <button
                            className={`video-player-action-btn${disliked ? ' active' : ''}`}
                            onClick={handleDislike}
                        >
                            {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                            <span>{dislikeCount}</span>
                        </button>
                        <button className="video-player-action-btn static-btn">
                            <IoMdShare />
                            <span>Share</span>
                        </button>
                        <button className="video-player-action-btn static-btn">
                            <MdDownload />
                            <span>Download</span>
                        </button>
                        <button className="video-player-action-btn static-btn">
                            <BsThreeDotsVertical />
                        </button>
                    </div>
                </div>
                <div className="video-player-description">
                    <div className="video-player-desc-meta">
                        <span className="video-player-desc-views">{video.views.toLocaleString()} views</span>
                        <span className="video-player-desc-dot">•</span>
                        <span className="video-player-desc-date">{video.uploadDate}</span>
                    </div>
                    <div className="video-player-desc-text">
                        {descToShow}
                        {showMore && !descExpanded && (
                            <span className="desc-more" onClick={() => setDescExpanded(true)}>...more</span>
                        )}
                        {showMore && descExpanded && (
                            <span className="desc-less" onClick={() => setDescExpanded(false)}> Show less</span>
                        )}
                    </div>
                </div>
                <div className="video-player-comments">
                    <div className="video-player-comments-title">
                        {comments.length} Comments
                    </div>
                    <div className="video-player-add-comment">
                        <img src={currentUser.avatar} alt="You" className="video-player-comment-avatar" />
                        <input
                            className="video-player-comment-input"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleComment(); }}
                        />
                        <button
                            className="video-player-comment-btn"
                            onClick={handleComment}
                            disabled={!comment.trim()}
                        >
                            Comment
                        </button>
                    </div>
                    <div className="video-player-comments-list">
                        {comments.map(comment => (
                            <div className="video-player-comment" key={comment._id}>
                                <img src={comment.avatar} alt={comment.username} className="video-player-comment-avatar" />
                                <div className="video-player-comment-body">
                                    <div className="video-player-comment-header">
                                        <span className="video-player-comment-username">{comment.username}</span>
                                        <span className="video-player-comment-time">
                                            {new Date(comment.timestamp).toLocaleDateString()}
                                        </span>
                                        <span
                                            className="comment-meatball"
                                            tabIndex={0}
                                            onClick={() =>
                                                setMenuOpen(menuOpen === comment._id ? null : comment._id)
                                            }
                                        >
                                            <BsThreeDotsVertical />
                                            {menuOpen === comment._id && comment.username === currentUser.username && (
                                                <div className="comment-menu-dropdown">
                                                    <button
                                                        className="comment-menu-item"
                                                        onClick={() => handleEdit(comment)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="comment-menu-item delete"
                                                        onClick={() => handleDelete(comment._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </span>
                                    </div>
                                    <div className="video-player-comment-text">
                                        {editId === comment._id ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <input
                                                    className="video-player-comment-input"
                                                    value={editText}
                                                    onChange={e => setEditText(e.target.value)}
                                                    style={{ flex: 1, minWidth: 0 }}
                                                />
                                                <button
                                                    className="video-player-comment-btn"
                                                    style={{ padding: "0.3rem 1rem", fontSize: "0.95rem" }}
                                                    onClick={() => handleEditSave(comment._id)}
                                                    disabled={!editText.trim()}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="video-player-comment-btn"
                                                    style={{ padding: "0.3rem 1rem", fontSize: "0.95rem", background: "#eee", color: "#222" }}
                                                    onClick={handleEditCancel}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            comment.text
                                        )}
                                    </div>
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