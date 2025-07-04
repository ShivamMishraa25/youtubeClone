import React from 'react'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import '../css/homePage.css'

function SideBar({ sidebarOpen }) {
    return (
        <nav className={`sideBar${sidebarOpen ? '' : ' collapsed'}`}>
            <div className="sideBar-item">
                <IoMdHome />
                <span className="sideBar-label">Home</span>
            </div>
            <div className="sideBar-item">
                <SiYoutubeshorts />
                <span className="sideBar-label">Shorts</span>
            </div>
            <div className="sideBar-item">
                <MdSubscriptions />
                <span className="sideBar-label">Subscriptions</span>
            </div>
        </nav>
    )
}

export default SideBar
