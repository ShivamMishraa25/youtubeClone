import React, { useState } from 'react'
import Header from './components/header.jsx'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Outlet context={{ sidebarOpen }} />
        </>
    )
}

export default App