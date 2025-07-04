import React from 'react'
import SideBar from './SideBar.jsx'
import '../css/homepage.css'
import { useOutletContext } from 'react-router-dom'

function VideoPlayer() {
    const { sidebarOpen } = useOutletContext();
    return (
        <div className='homepage'>
            <SideBar sidebarOpen={sidebarOpen} />
            <div style={{ flex: 1, padding: '2rem' }}>videoPlayer</div>
        </div>
    )
}

export default VideoPlayer