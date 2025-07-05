import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

function UserModal() {
    const { user } = useAuth();

    return (
        <div className='user-modal'>
            <div className='user'>
                <div>
                    <img src={user.avatar} alt={user.username} />
                </div>
                <div>
                    <p>{user.username}</p>
                    {
                        user.channelId?<p onClick={handleViewChannel}>View your channel</p>
                        :
                        <p onClick={handleCreateChannel}>Create your channel</p>
                    }
                </div>
            </div>
            <div className='static-options'>

            </div>
        </div>
    )
}

export default UserModal