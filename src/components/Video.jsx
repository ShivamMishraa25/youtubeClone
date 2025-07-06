import React from 'react'
import '../css/homePage.css'
import { Link } from 'react-router-dom'

function Video({ _id, title, channel, views, thumbnail }) {
    return (
        <div className='video'> 
            <Link to={`/Video/${_id}`}>
                <img src={thumbnail} alt={title} className='thumbnail' />
            </Link>
            <div>
                <figure className='channel'>
                    <Link to={`/channels/:${channel._id}`}>
                        <img src={channel.channelPic} alt={channel.channelName} className='channel-icon' />
                    </Link>
                </figure>
                <div>
                    <Link to={`/Video/${_id}`}>
                        <div className='video-title'>{title}</div>
                    </Link>
                    <Link to={`/channels/:${channel._id}`}>
                        <div className='channel-name'>{channel.channelName}</div>
                    </Link>
                    <div className='views'>{views} views</div>
                </div>
            </div>
        </div>
    )
}

export default Video
