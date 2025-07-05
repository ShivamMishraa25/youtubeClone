import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaUser } from "react-icons/fa";
import { RiVideoUploadLine } from "react-icons/ri";
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import '../css/homePage.css'
import '../css/registerLogin.css'

function Header({ sidebarOpen, setSidebarOpen }) {
    const { user } = useAuth(); // get user from context
    const navigate = useNavigate(); // get useNavigate hook from react-router-dom


    return (
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
                <input placeholder="Search" />
                <button><CiSearch /></button>
            </div>
            <div className='right'>
                <RiVideoUploadLine />
                <FaBell />
                {user ? (
                    <img
                        src={user.avatar}
                        alt="User"
                        className="header-avatar"
                        onClick={() => navigate('/profile')} // or toggle dropdown
                        style={{ cursor: 'pointer', borderRadius: '50%' }}
                    />
                    ) : (
                    <>
                        <Link to="/login" className="header-auth-link">Sign in</Link>
                        <Link to="/register" className="header-auth-link signup">Sign up</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header

// localStorage.setItem("user", JSON.stringify({
//   username: "shivam_dev",
//   userId: "user01",
//   avatar: "https://placehold.co/40x40.png?text=S", 
//   channelId: null // later set to some ID like "channel01"
// }));