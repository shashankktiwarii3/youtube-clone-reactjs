import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ data }) => {
    const [fetchData, setFetchData] = useState(null)


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://youtube-v31.p.rapidapi.com/search', {
                    params: {
                        channelId: data,
                        part: "snippet,id",
                        order: "date",
                        maxResults: 100
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
    }, [data]);
    if (!fetchData) {
        return "Loading";
    } else {
        return (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fetchData.map((elem, idx) => (
                    <Link key={idx}  to={`/video/${elem.id.videoId}`}>
                    <div className="bg-white shadow rounded p-2">
                        <img
                            src={elem.snippet.thumbnails.high.url}
                            alt={elem.snippet.title}
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                        <p className="font-semibold">{elem.snippet.title}</p>
                        <p className="text-sm text-gray-600">Views • Time</p>
                    </div>
                    </Link>

                ))}

            </div>




        )
    }
}

export default VideoCard