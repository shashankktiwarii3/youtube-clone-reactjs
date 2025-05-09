import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Recommended = ({ data }) => {
    const [fetchData, setFetchData] = useState(null)
    const videoID = data.id;

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://youtube-v31.p.rapidapi.com/search', {
                    params: {
                        relatedToVideoId: videoID,
                        part: "snippet,id ",
                        type: "video",
                        maxResults: 10
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
        
    } else {


        return (
            <aside className="w-full lg:w-80 space-y-4">
                {fetchData.map((item, idx) => (
                <div key={idx}>
                <Link to={`/video/${item.id.videoId}`} >
                <div className="flex space-x-2">
                    <img
                        src={`${item.snippet.thumbnails.default.url}`}
                        alt="Video Thumbnail"
                        className="w-32 h-20 object-cover rounded"
                    />
                    <div>
                        <p className="font-semibold text-sm">{item.snippet.title}</p>
                        <p className="text-xs text-gray-500">{item.snippet.channelTitle}• 1.2M views</p>
                    </div>
                </div>
                </Link>
                </div>
                ))}
            </aside>

        )
    }
}

export default Recommended