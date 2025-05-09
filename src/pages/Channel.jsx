import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'

const Channel = () => {
    //"UCO1BFpNSSq56d3BYpHOjZCA"
    ///channels?part=snippet%2Cstatistics&id=UCBVjMGOIkavEAhyqpxJ73Dw',
    const param = useParams()
    const [fetchData, setFetchData] = useState(null)


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://youtube-v31.p.rapidapi.com/channels', {
                    params: {
                        id: param.id,
                        part: "snippet,statistics",
                    },
                    headers: {
                        'x-rapidapi-key': `${import.meta.env.VITE_API_KEY}`,
                        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
                    },
                });


                setFetchData(response.data.items[0])

            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        getData();
        
    }, [param]);
    if (!fetchData) {
        return "Loading"
    } else {
        document.title = fetchData.snippet.title;
        return (
            <main className="flex-1 overflow-auto">


                <div className="flex items-center justify-between p-4 bg-white shadow">
                    <div className="flex items-center space-x-4">
                        <img
                            src={fetchData.snippet.thumbnails.default.url}
                            alt={fetchData.snippet.title}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">{fetchData.snippet.title}</h2>
                            <p className="text-sm text-gray-600">{fetchData.statistics.subscriberCount} subscribers</p>
                        </div>
                    </div>
                </div>





                <VideoCard data={param.id} />



            </main>
        )
    }
}

export default Channel