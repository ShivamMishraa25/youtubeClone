import React from 'react'
import '../css/homePage.css'

function Video({ title, channel, views, thumbnail }) {
    return (
        <div className='video'>    
            <img src={thumbnail} alt={title} className='thumbnail' />
            <div>
                <figure className='channel'>
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className='channel-icon' />
                </figure>
                <div>
                    <div className='video-title'>{title}</div>
                    <div className='channel-name'>{channel}</div>
                    <div className='views'>{views}</div>
                </div>
            </div>
        </div>
    )
}

export default Video
