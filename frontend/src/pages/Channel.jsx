import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import YourChannel from '../components/YourChannel.jsx';
import CreateChannel from '../components/CreateChannel.jsx';
import { useNavigate, useOutletContext } from 'react-router-dom'
import Login from './Login.jsx'

function Channel() {
    const { sidebarOpen } = useOutletContext();
    const {user} = useAuth();
    const navigate = useNavigate();

    // useEffect(()=> {
    //     if(!user) {
    //         navigate("/login");
    //     }
    // }, [user, navigate]);

    // if(!user) {
    //     return <p>Redirecting to login...</p>;
    // }

    return (
        <div className='channel-page'>
            {user?.channelId ? <YourChannel />:<CreateChannel />}
        </div>
    )
}

export default Channel