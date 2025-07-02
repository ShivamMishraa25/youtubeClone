import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";

function Header() {
    return (
        <header>
            <div className='left'>
                {/* burger icon and youtube icon */}
                <RxHamburgerMenu />
                <FaYoutube />
            </div>
            <div className='mid'>
                {/* search bar, button and mic icon */}
            </div>
            <div className='right'>
                {/* notification and user icon */}
            </div>
        </header>
    )
}

export default Header