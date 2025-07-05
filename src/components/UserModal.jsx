import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import '../css/userModal.css'
import { Link } from 'react-router-dom'
import { FiChevronRight } from "react-icons/fi";
import { MdOutlineAccountCircle, MdOutlineSwitchAccount, MdLogout, MdOutlineSettings, MdOutlineLanguage, MdOutlineLocationOn } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaRegKeyboard } from "react-icons/fa";

function UserModal({ onClose }) {
    const { user } = useAuth();

    // Placeholder handlers
    const handleViewChannel = () => {};
    const handleCreateChannel = () => {};
    const handleSignOut = () => {};

    return (
        <div className="user-modal-overlay" onClick={onClose}>
            <div className="user-modal" onClick={e => e.stopPropagation()}>
                <div className="user-modal-header">
                    <img src={user.avatar} alt={user.username} className="user-modal-avatar" />
                    <div className="user-modal-info">
                        <div className="user-modal-username">{user.username}</div>
                        <div className="user-modal-userid">@{user.username?.toLowerCase().replace(/\s/g, '') || 'user'}</div>
                        {user.channelId ? (
                            <Link to="/channel" className="user-modal-link">View your channel</Link>
                        ) : (
                            <span className="user-modal-link" onClick={handleCreateChannel}>Create your channel</span>
                        )}
                    </div>
                </div>
                <div className="user-modal-divider"></div>
                <div className="user-modal-list">
                    <a className="user-modal-listitem" href="#">
                        <MdOutlineAccountCircle className="user-modal-icon" />
                        Google Account
                    </a>
                    <div className="user-modal-listitem user-modal-listitem-arrow">
                        <MdOutlineSwitchAccount className="user-modal-icon" />
                        Switch account
                        <FiChevronRight className="user-modal-arrow" />
                    </div>
                    <div className="user-modal-listitem" onClick={handleSignOut}>
                        <MdLogout className="user-modal-icon" />
                        Sign out
                    </div>
                </div>
                <div className="user-modal-divider"></div>
                <div className="user-modal-list">
                    <div className="user-modal-listitem">
                        <MdOutlineSettings className="user-modal-icon" />
                        YouTube Studio
                    </div>
                    <div className="user-modal-listitem">
                        <MdOutlineSettings className="user-modal-icon" />
                        Purchases and memberships
                    </div>
                </div>
                <div className="user-modal-divider"></div>
                <div className="user-modal-list">
                    <div className="user-modal-listitem">
                        <MdOutlineSettings className="user-modal-icon" />
                        Your data in YouTube
                    </div>
                    <div className="user-modal-listitem user-modal-listitem-arrow">
                        <BsSun className="user-modal-icon" />
                        Appearance: Light
                        <FiChevronRight className="user-modal-arrow" />
                    </div>
                    <div className="user-modal-listitem user-modal-listitem-arrow">
                        <MdOutlineLanguage className="user-modal-icon" />
                        Language: English
                        <FiChevronRight className="user-modal-arrow" />
                    </div>
                    <div className="user-modal-listitem">
                        <MdOutlineSettings className="user-modal-icon" />
                        Restricted Mode: Off
                    </div>
                    <div className="user-modal-listitem">
                        <MdOutlineLocationOn className="user-modal-icon" />
                        Location: India
                    </div>
                    <div className="user-modal-listitem">
                        <FaRegKeyboard className="user-modal-icon" />
                        Keyboard shortcuts
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal