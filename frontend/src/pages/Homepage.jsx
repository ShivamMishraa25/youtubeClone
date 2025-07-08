import React from 'react'
import SideBar from '../components/SideBar.jsx'
import VideoList from '../components/VideoList.jsx'
import '../css/homepage.css'
import { useOutletContext } from 'react-router-dom'

function Homepage() {
  const { sidebarOpen } = useOutletContext();
  return (
    <div className='homepage'>
        <VideoList sidebarOpen={sidebarOpen} />
    </div>
  )
}

export default Homepage