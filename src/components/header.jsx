import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaUser } from "react-icons/fa";
import { RiVideoUploadLine } from "react-icons/ri";
import '../css/homePage.css'

function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className='header'>
            <div className='left'>
                <span onClick={() => setSidebarOpen(!sidebarOpen)} style={{cursor: 'pointer'}}>
                    <RxHamburgerMenu />
                </span>
                <div className='youtube'>
                    <FaYoutube className="fa-youtube" />
                    <h2>YouTube</h2>
                </div>
            </div>
            <div className='mid'>
                <input placeholder="Search" />
                <button><CiSearch /></button>
            </div>
            <div className='right'>
                <RiVideoUploadLine />
                <FaBell />
                <FaUser />
            </div>
        </header>
    )
}

export default Header
