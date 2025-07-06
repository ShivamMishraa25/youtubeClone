import React, { useState } from 'react'
import { dummyChannel } from '../contexts/dummyChannel.jsx'
import '../css/channel.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit, MdDelete, MdUpload } from "react-icons/md";
import { useOutletContext } from 'react-router-dom'

function YourChannel() {
  const { sidebarOpen } = useOutletContext();
  const [videos, setVideos] = useState(dummyChannel.videos);
  const [menuOpen, setMenuOpen] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Delete this video?")) {
      setVideos(videos => videos.filter(v => v._id !== id));
      setMenuOpen(null);
    }
  };

  const handleEdit = (id) => {
    // TODO: open edit modal or navigate to edit page
    alert("Edit video " + id);
    setMenuOpen(null);
  };

  const handleUpload = () => {
    // TODO: open upload modal or navigate to upload page
    alert("Upload video (not implemented)");
  };

  return (
    <div className="channel-page" style={{ flex: 1 }}>
      <div className="channel-banner-container">
        <img
          className="channel-banner"
          src={dummyChannel.channelBanner}
          alt="Channel banner"
        />
      </div>
      <div className="channel-header">
        <img className="channel-avatar" src={dummyChannel.channelPic} alt={dummyChannel.channelName} />
        <div className="channel-info">
          <div className="channel-title">{dummyChannel.channelName}</div>
          <div className="channel-meta">
            <span className="channel-handle">@{dummyChannel.channelName.toLowerCase().replace(/\s/g, '')}-ic4ou</span>
            <span className="channel-dot">·</span>
            <span className="channel-subs">{dummyChannel.subscribers} subscribers</span>
            <span className="channel-dot">·</span>
            <span className="channel-videos">{videos.length} videos</span>
          </div>
          <div className="channel-desc">
            {dummyChannel.description}
          </div>
          <div className="channel-actions">
            <button className="channel-btn" onClick={handleUpload}>
              <MdUpload style={{ marginRight: 6, fontSize: "1.2rem" }} />
              Upload video
            </button>
            <button className="channel-btn secondary">Customize channel</button>
            <button className="channel-btn secondary">Manage videos</button>
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
        {videos.map(video => (
          <div className="channel-video-card" key={video._id}>
            <img className="channel-video-thumb" src={video.thumbnail} alt={video.title} />
            <div className="channel-video-info">
              <div className="channel-video-title">{video.title}</div>
              <div className="channel-video-meta">
                <span>{video.views} views</span>
                <span className="channel-dot">·</span>
                <span>{video.uploadDate}</span>
              </div>
            </div>
            <div className="channel-video-actions">
              <span
                className="channel-video-meatball"
                tabIndex={0}
                onClick={() => setMenuOpen(menuOpen === video._id ? null : video._id)}
              >
                <BsThreeDotsVertical />
                {menuOpen === video._id && (
                  <div className="channel-video-dropdown">
                    <button className="channel-video-dropdown-item" onClick={() => handleEdit(video._id)}>
                      <MdEdit style={{ marginRight: 6 }} /> Edit
                    </button>
                    <button className="channel-video-dropdown-item delete" onClick={() => handleDelete(video._id)}>
                      <MdDelete style={{ marginRight: 6 }} /> Delete
                    </button>
                  </div>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YourChannel