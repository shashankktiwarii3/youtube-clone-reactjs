import React, { useState, useEffect } from 'react'
import Asidebar from '../components/Asidebar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [fetchData, setFetchData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://youtube-v31.p.rapidapi.com/search', {
          params: {
            part: "snippet",
            q: "Trending",
            maxResults: 50,
          },
          headers: {
            'x-rapidapi-key': `${import.meta.env.VITE_API_KEY}`,

            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
          },
        });


        setFetchData(response.data.items)

      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    getData();
  }, []);
  if (!fetchData) {
    return "loading"
  } else {
    document.title = "Home";
    return (

      <div className="flex flex-1">
        <Asidebar />
        <main className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
          {fetchData.map((elem, index) => {
              if (elem.id.kind === "youtube#video") {
            return (
            
              <div key={index}>
                <Link to={`/video/${elem.id.videoId}`}>
                  <div className="bg-white shadow rounded p-2">
                    <div className="mb-2">
                      <img
                        src={elem.snippet.thumbnails.high.url}
                        alt=""
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                    <p className="font-semibold">
                      {new DOMParser().parseFromString(elem.snippet.title, "text/html").body.textContent}
                    </p>
                    <p className="text-sm text-gray-600">
                      {elem.snippet.channelTitle} • {elem.snippet.publishTime.replace("T", " • ")}
                    </p>
                  </div>
                </Link>
              </div>
              
            )
          }
          })}
        </main>
      </div>
    )
  }
}

export default Home