import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaUser } from "react-icons/fa";
import { RiVideoUploadLine } from "react-icons/ri";
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import '../css/homePage.css'
import '../css/registerLogin.css'
import UserModal from './UserModal.jsx'
import axios from 'axios';

function Header({ sidebarOpen, setSidebarOpen, searchedVal, setSearchedVal, onSearch }) {
    const { user, setUser } = useAuth(); // get user from context
    const navigate = useNavigate(); // get useNavigate hook from react-router-dom
    const [showModal, setShowModal] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [form, setForm] = useState({
        title: '',
        videoLink: '',
        thumbnail: '',
        description: '',
        category: ''
    });
    const [formLoading, setFormLoading] = useState(false);

    function handleSearchInput(e) {
        setSearchedVal(e.target.value);
    }

    function handleSearchBtn(e) {
        e.preventDefault();
        if (onSearch) onSearch();
    }

    // Open upload modal
    const handleUpload = () => {
        setForm(initialForm);
        setShowUpload(true);
    };

    // Upload video logic (same as YourChannel)
    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        // Trim all fields
        const trimmed = {
            title: form.title.trim(),
            videoLink: form.videoLink.trim(),
            thumbnail: form.thumbnail.trim(),
            description: form.description.trim(),
            category: form.category.trim()
        };
        // Check required fields
        if (!trimmed.title || !trimmed.videoLink || !trimmed.thumbnail) {
            alert("Please fill in all required fields.");
            setFormLoading(false);
            return;
        }
        try {
            // user is available from context
            await axios.post(
                "http://localhost:5100/api/video",
                trimmed,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert("Video uploaded!");
            setShowUpload(false);
            setForm({
                title: '',
                videoLink: '',
                thumbnail: '',
                description: '',
                category: ''
            });
        } catch (err) {
            alert("Failed to upload video: " + (err.response?.data?.message || err.message));
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <>
            {/* Upload Modal */}
            {showUpload && (
                <div className="create-channel-modal-bg" style={{ zIndex: 3000 }}>
                    <div className="create-channel-modal" style={{ maxWidth: 500 }}>
                        <h2 className="create-channel-title">Upload Video</h2>
                        <form className="create-channel-form" onSubmit={handleUploadSubmit}>
                            <div className="create-channel-fields">
                                <label className="create-channel-label">Title</label>
                                <input
                                    className="create-channel-input"
                                    name="title"
                                    type="text"
                                    placeholder="Video title"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    required
                                    autoFocus
                                />
                                <label className="create-channel-label">Video Link (URL)</label>
                                <input
                                    className="create-channel-input"
                                    name="videoLink"
                                    type="url"
                                    placeholder="Video file URL"
                                    value={form.videoLink}
                                    onChange={e => setForm({ ...form, videoLink: e.target.value })}
                                    required
                                />
                                <label className="create-channel-label">Thumbnail URL</label>
                                <input
                                    className="create-channel-input"
                                    name="thumbnail"
                                    type="url"
                                    placeholder="Thumbnail image URL"
                                    value={form.thumbnail}
                                    onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                                    required
                                />
                                <label className="create-channel-label">Description</label>
                                <textarea
                                    className="create-channel-input"
                                    name="description"
                                    placeholder="Video description"
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    rows={2}
                                />
                                <label className="create-channel-label">Category</label>
                                <input
                                    className="create-channel-input"
                                    name="category"
                                    type="text"
                                    placeholder="Category"
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                />
                            </div>
                            <div className="create-channel-actions">
                                <button
                                    type="button"
                                    className="create-channel-cancel"
                                    onClick={() => setShowUpload(false)}
                                    disabled={formLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="create-channel-submit"
                                    disabled={!form.title || !form.videoLink || !form.thumbnail || formLoading}
                                >
                                    {formLoading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <header className='header'>
                <div className='left'>
                    <span onClick={() => setSidebarOpen(!sidebarOpen)} style={{cursor: 'pointer'}}>
                        <RxHamburgerMenu />
                    </span>
                    <Link to="/" className='youtube'>
                        <FaYoutube className="fa-youtube" />
                        <h2>YouTube</h2>
                    </Link>
                </div>
                <div className='mid'>
                    <input placeholder="Search" onChange={handleSearchInput} value={searchedVal} />
                    <button onClick={handleSearchBtn}><CiSearch /></button>
                </div>
                <div className='right'>
                    {
                        user?.channelId &&
                        <RiVideoUploadLine onClick={() => setShowUpload(true)} />
                    }
                    <FaBell />
                    {user ? (
                        <>
                            <img
                                src={user.avatar}
                                alt="User"
                                className="header-avatar"
                                onClick={() => setShowModal(v => !v)}
                                style={{ cursor: 'pointer', borderRadius: '50%' }}
                            />
                            {showModal && <UserModal setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
                        </>
                        ) : (
                        <>
                            <Link to="/login" className="header-auth-link">Sign in</Link>
                            <Link to="/register" className="header-auth-link signup">Sign up</Link>
                        </>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header
