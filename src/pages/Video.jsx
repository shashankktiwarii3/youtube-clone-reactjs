import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Recommended from '../components/Recommended'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
const Video = () => {
  const authData = useContext(AuthContext);
  const params = useParams();
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://youtube-v31.p.rapidapi.com/videos', {
          params: {
            part: "contentDetails,snippet,statistics",
            id: params.id
          },
          headers: {
            'x-rapidapi-key': `${import.meta.env.VITE_API_KEY}`,
            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
          },
        });

        setFetchData(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    getData();
  }, [params.id]);

  useEffect(() => {
    if (!fetchData) return;
  
    const newVideo = {
      id: params.id,
      title: fetchData.snippet.localized.title,
      thumbnail: fetchData.snippet.thumbnails.default.url,
    };
    const rawHistory = JSON.parse(localStorage.getItem("History")) || [];
    const historyArray = Array.isArray(rawHistory) ? rawHistory.flat() : [];
    const alreadyExists = historyArray.some(video => video.id === newVideo.id);
  
    if (!alreadyExists) {
      const updatedHistory = [...historyArray, newVideo];
      localStorage.setItem("History", JSON.stringify(updatedHistory));
    } 
  }, [fetchData, params.id]);

  if (!fetchData) return null;
  document.title = fetchData.snippet.localized.title;
    return (
      <div className="flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex-1">
          <div className="aspect-video w-full mb-4">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${params.id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
          <h2 className="text-xl font-bold">{fetchData.snippet.localized.title}</h2>
          <p className="text-sm text-gray-600">{fetchData.snippet.publishedAt.replace("T", " ")}</p>
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center gap-2">
              <div>
                <Link to={`/channel/${fetchData.snippet.channelId}`} >
                  <p className="font-semibold">{fetchData.snippet.channelTitle}</p>
                </Link>
              </div>
            </div>
          </div>

        </div>
        <Recommended data={params} />
      </div>

    )
  }


export default Video