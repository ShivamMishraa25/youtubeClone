import React from 'react'
import '../css/homePage.css'

function Video({ title, channel, views, thumbnail }) {
    return (
        <div className='video'>    
            <img src={thumbnail} alt={title} className='thumbnail' />
            <div>
                <figure className='channel'>
                    <img src={channel.channelPic} alt={channel.channelName} className='channel-icon' />
                </figure>
                <div>
                    <div className='video-title'>{title}</div>
                    <div className='channel-name'>{channel.channelName}</div>
                    <div className='views'>{views} views</div>
                </div>
            </div>
        </div>
    )
}

export default Video
