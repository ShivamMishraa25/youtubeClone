import React, { useState } from 'react'
import Header from './components/Header.jsx'
import SideBar from './components/SideBar.jsx'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Calculate left margin based on sidebar state
    const mainContentStyle = {
        marginLeft: sidebarOpen ? 220 : 72,
        transition: 'margin-left 0.2s cubic-bezier(.4,0,.2,1)'
    };

    return (
        <>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="app-layout">
                <SideBar sidebarOpen={sidebarOpen} />
                <div className="main-content" style={mainContentStyle}>
                    <Outlet context={{ sidebarOpen }} />
                </div>
            </div>
        </>
    )
}

export default App