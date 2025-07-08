import React, { useState, useEffect } from 'react'
import '../css/videoPlayer.css'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.jsx';

function VideoPlayer() {
    const { videoId } = useParams();
    const { user } = useAuth();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [descExpanded, setDescExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    // Fetch video and comments
    useEffect(() => {
        setLoading(true);
        setError(null);
        Promise.all([
            axios.get(`http://localhost:5100/api/video/${videoId}`),
            axios.get(`http://localhost:5100/api/comment/${videoId}`)
        ])
            .then(([videoRes, commentRes]) => {
                setVideo(videoRes.data);
                setLikeCount(videoRes.data.likes || 0);
                setDislikeCount(videoRes.data.dislikes || 0);
                setComments(
                    (commentRes.data || []).map(c => ({
                        _id: c._id,
                        username: c.user?.username || "Unknown",
                        avatar: c.user?.avatar || "https://placehold.co/40x40.png?text=?",
                        text: c.text,
                        timestamp: c.timestamp || c.createdAt,
                        userId: c.user?._id
                    }))
                );
                // Set liked/disliked state based on backend
                if (user) {
                    setLiked(videoRes.data.likedBy?.includes(user._id));
                    setDisliked(videoRes.data.dislikedBy?.includes(user._id));
                } else {
                    setLiked(false);
                    setDisliked(false);
                }
            })
            .catch(err => {
                setError("Failed to load video.");
            })
            .finally(() => setLoading(false));
    }, [videoId, user]);

    // Like/dislike logic (persist to backend)
    const handleLike = async () => {
        if (!user) return;
        try {
            if (liked) {
                const res = await axios.patch(
                    `http://localhost:5100/api/video/${videoId}/unlike`,
                    {},
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
                setLiked(false);
                setLikeCount(res.data.likes);
                setDislikeCount(res.data.dislikes);
            } else {
                const res = await axios.patch(
                    `http://localhost:5100/api/video/${videoId}/like`,
                    {},
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
                setLiked(true);
                setDisliked(false);
                setLikeCount(res.data.likes);
                setDislikeCount(res.data.dislikes);
            }
        } catch (err) {
            alert("Failed to update like");
        }
    };

    const handleDislike = async () => {
        if (!user) return;
        try {
            if (disliked) {
                const res = await axios.patch(
                    `http://localhost:5100/api/video/${videoId}/undislike`,
                    {},
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
                setDisliked(false);
                setLikeCount(res.data.likes);
                setDislikeCount(res.data.dislikes);
            } else {
                const res = await axios.patch(
                    `http://localhost:5100/api/video/${videoId}/dislike`,
                    {},
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
                setDisliked(true);
                setLiked(false);
                setLikeCount(res.data.likes);
                setDislikeCount(res.data.dislikes);
            }
        } catch (err) {
            alert("Failed to update dislike");
        }
    };

    // Add comment logic (POST to backend, then fetch comments)
    const handleComment = async () => {
        if (!user || !comment.trim()) return;
        try {
            await axios.post(
                "http://localhost:5100/api/comment",
                { text: comment, videoId },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // Fetch updated comments from backend
            const res = await axios.get(`http://localhost:5100/api/comment/${videoId}`);
            setComments(
                (res.data || []).map(c => ({
                    _id: c._id,
                    username: c.user?.username || "Unknown",
                    avatar: c.user?.avatar || "https://placehold.co/40x40.png?text=?",
                    text: c.text,
                    timestamp: c.timestamp || c.createdAt,
                    userId: c.user?._id
                }))
            );
            setComment("");
        } catch (err) {
            alert("Failed to add comment");
        }
    };

    // Delete comment logic (DELETE to backend, then fetch comments)
    const handleDelete = async (id) => {
        if (!user) return;
        if (!window.confirm("Delete this comment?")) return;
        try {
            await axios.delete(
                `http://localhost:5100/api/comment/${id}`,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // Always fetch updated comments from backend after delete
            const res = await axios.get(`http://localhost:5100/api/comment/${videoId}`);
            setComments(
                (res.data || []).map(c => ({
                    _id: c._id,
                    username: c.user?.username || "Unknown",
                    avatar: c.user?.avatar || "https://placehold.co/40x40.png?text=?",
                    text: c.text,
                    timestamp: c.timestamp || c.createdAt,
                    userId: c.user?._id
                }))
            );
            setMenuOpen(null);
        } catch (err) {
            alert("Failed to delete comment");
        }
    };

    // Edit comment logic (PATCH to backend, then fetch comments)
    const handleEdit = (comment) => {
        setEditId(comment._id);
        setEditText(comment.text);
        setMenuOpen(null);
    };

    const handleEditSave = async (id) => {
        if (!user || !editText.trim()) return;
        try {
            await axios.patch(
                `http://localhost:5100/api/comment/${id}`,
                { text: editText },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // Fetch updated comments from backend
            const res = await axios.get(`http://localhost:5100/api/comment/${videoId}`);
            setComments(
                (res.data || []).map(c => ({
                    _id: c._id,
                    username: c.user?.username || "Unknown",
                    avatar: c.user?.avatar || "https://placehold.co/40x40.png?text=?",
                    text: c.text,
                    timestamp: c.timestamp || c.createdAt,
                    userId: c.user?._id
                }))
            );
            setEditId(null);
            setEditText("");
        } catch (err) {
            alert("Failed to edit comment");
        }
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditText("");
    };

    // Description logic
    const descLimit = 180;
    const showMore = video && video.description && video.description.length > descLimit;
    const descToShow = video && video.description
        ? (descExpanded ? video.description : video.description.slice(0, descLimit))
        : "";

    if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
    if (error) return <div style={{ padding: 32, color: 'red' }}>{error}</div>;
    if (!video) return null;

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
                            <img src={video.channel?.channelPic} alt={video.channel?.channelName} className="video-player-channel-pic" />
                        </Link>
                        <Link to={`/channels/:${video?.channel?._id}`}>
                            <div className="video-player-channel-info">
                                <div className="video-player-channel-name">{video.channel?.channelName}</div>
                                <div className="video-player-subscribers">{video.channel?.subscribers?.toLocaleString() || 0} subscribers</div>
                            </div>
                        </Link>
                        <button className="video-player-subscribe-btn">Subscribe</button>
                    </div>
                    <div className="video-player-actions">
                        <button
                            className={`video-player-action-btn${liked ? ' active' : ''}`}
                            onClick={handleLike}
                            disabled={!user}
                            title={!user ? "Login to like" : ""}
                        >
                            {liked ? <AiFillLike /> : <AiOutlineLike />}
                            <span>{likeCount}</span>
                        </button>
                        <button
                            className={`video-player-action-btn${disliked ? ' active' : ''}`}
                            onClick={handleDislike}
                            disabled={!user}
                            title={!user ? "Login to dislike" : ""}
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
                        <span className="video-player-desc-views">{(video.views || 0).toLocaleString()} views</span>
                        <span className="video-player-desc-dot">•</span>
                        <span className="video-player-desc-date">{video.uploadDate ? (typeof video.uploadDate === "string" ? video.uploadDate : new Date(video.uploadDate).toLocaleDateString()) : ""}</span>
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
                        <img
                            src={user?.avatar || "https://placehold.co/40.png?text=?"}
                            alt={user?.username || "User"}
                            className="video-player-comment-avatar"
                        />
                        <input
                            className="video-player-comment-input"
                            placeholder={user ? "Add a comment..." : "Login to comment"}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleComment(); }}
                            disabled={!user}
                        />
                        <button
                            className="video-player-comment-btn"
                            onClick={handleComment}
                            disabled={!user || !comment.trim()}
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
                                            {comment.timestamp ? new Date(comment.timestamp).toLocaleDateString() : ""}
                                        </span>
                                        {user && comment.userId === user._id && (
                                            <span
                                                className="comment-meatball"
                                                tabIndex={0}
                                                onClick={() =>
                                                    setMenuOpen(menuOpen === comment._id ? null : comment._id)
                                                }
                                            >
                                                <BsThreeDotsVertical />
                                                {menuOpen === comment._id && (
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
                                        )}
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