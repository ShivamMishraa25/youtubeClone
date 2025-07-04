import React, { useState } from 'react'
import Header from './components/header.jsx'
import Homepage from './pages/Homepage.jsx'
import './App.css'

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Homepage sidebarOpen={sidebarOpen} />
        </>
    )
}

export default App