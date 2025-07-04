import React from 'react'
import SideBar from '../components/sideBar.jsx'
import VideoList from '../components/videoList.jsx'
import '../css/homepage.css'

function Homepage({ sidebarOpen }) {
  return (
    <div className='homepage'>
        <SideBar sidebarOpen={sidebarOpen} />
        <VideoList sidebarOpen={sidebarOpen} />
    </div>
  )
}

export default Homepage