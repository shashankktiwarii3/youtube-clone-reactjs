import React from 'react'
import { Link } from 'react-router-dom'

const Asidebar = () => {
    return (
        <div>
            <aside className="w-64 bg-gray-100 hidden md:block p-4 overflow-y-auto">
                <ul className="space-y-2">
                    <Link to={"/"}><li>🏠 Home</li></Link>
                    <Link to={"/search?q=News"}><li>🔥 News</li></Link>
                    <Link to={"/history"}><li>📺 History</li></Link>
                </ul>
            </aside>
        </div>
    )
}

export default Asidebar