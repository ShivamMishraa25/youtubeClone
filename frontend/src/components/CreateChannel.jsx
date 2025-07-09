import React, { useState } from 'react'
import '../css/createChannel.css'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function CreateChannel() {
    const [form, setForm] = useState({
        channelName: '',
        description: '',
        channelPic: '',
        channelBanner: ''
    });
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to create a channel.");
            return;
        }
        // Trim all fields
        const trimmed = {
            channelName: form.channelName.trim(),
            description: form.description.trim(),
            channelPic: form.channelPic.trim(),
            channelBanner: form.channelBanner.trim()
        };
        // Check required fields
        if (!trimmed.channelName) {
            alert("Channel name is required.");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:5100/api/channel",
                trimmed,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // Update user context with new channelId
            setUser({ ...user, channelId: data.channelId || data._id });
            alert("Channel created!");
            navigate("/channel");
        } catch (err) {
            alert("Failed to create channel: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-channel-modal-bg">
            <div className="create-channel-modal">
                <h2 className="create-channel-title">How you'll appear</h2>
                <form className="create-channel-form" onSubmit={handleSubmit}>
                    <div className="create-channel-avatar-section">
                        <img
                            src={form.channelPic || "https://placehold.co/50.png?text=You"}
                            alt="Channel avatar"
                            className="create-channel-avatar"
                        />
                        <input
                            type="url"
                            name="channelPic"
                            placeholder="Channel picture URL"
                            value={form.channelPic}
                            onChange={handleChange}
                            className="create-channel-input"
                            style={{ marginTop: "0.7rem" }}
                        />
                    </div>
                    <div className="create-channel-fields">
                        <label className="create-channel-label">Name</label>
                        <input
                            className="create-channel-input"
                            name="channelName"
                            type="text"
                            placeholder="Channel name"
                            value={form.channelName}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <label className="create-channel-label">Description</label>
                        <textarea
                            className="create-channel-input"
                            name="description"
                            placeholder="Channel description"
                            value={form.description}
                            onChange={handleChange}
                            rows={2}
                        />
                        <label className="create-channel-label">Banner URL (optional)</label>
                        <input
                            className="create-channel-input"
                            name="channelBanner"
                            type="url"
                            placeholder="Channel banner URL"
                            value={form.channelBanner}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="create-channel-actions">
                        <button
                            type="button"
                            className="create-channel-cancel"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="create-channel-submit"
                            disabled={!form.channelName || loading}
                        >
                            {loading ? "Creating..." : "Create channel"}
                        </button>
                    </div>
                    <div className="create-channel-terms">
                        By clicking Create Channel you agree to <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube's Terms of Service</a>.
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateChannel