import React from 'react'
import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Route, Router, Routes } from 'react-router-dom';
import Video from './pages/Video.jsx';
import Search from './pages/Search.jsx';
import Channel from './pages/Channel.jsx';
import History from './pages/History.jsx';
const App = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
       <div className="flex flex-col h-screen">
       <Navbar />
      <Routes >
        <Route path={'/'} element={<Home />} />
        <Route path={'/video/:id'} element={<Video />} />
        <Route path={'/search'} element={<Search />} />
        <Route path={'/channel/:id'} element={<Channel />} />
        <Route path={'/history'} element={<History />} />
      </Routes>
      </div>
    </div>
  )
}

export default App