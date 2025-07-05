import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

function UserModal() {
    const { user } = useAuth();

    return (
        <div className='user-modal'>
            
        </div>
    )
}

export default UserModal