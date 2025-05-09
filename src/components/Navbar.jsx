import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (keyword.trim()) {
          
            navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
        }
    }
    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-white shadow">
                <div className="flex items-center space-x-4">
                    <button className="md:hidden">☰</button>
                    <Link to={'/'}>
                        <span className="font-bold text-xl">YouTube</span>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="hidden md:block w-1/2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full border p-2 rounded"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </form>
                <div className="space-x-4 hidden md:flex">
                    <Link to={"/history"}>
                    <button>👤</button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Navbar