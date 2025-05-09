import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [fetchData, setFetchData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://youtube-v31.p.rapidapi.com/search', {
                    params: {
                        q: query,
                        part: "snippet,id",
                        regionCode: "US",
                        maxResults: 50,
                        order: "date"
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
    }, [query]);

    if (!fetchData) {
        return
    } else {
        document.title = "Search Result";
        return (
            <div className="p-4 max-w-6xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Search Results for "Query"</h2>
                <div className="space-y-4">
                    {fetchData.map((elem, idx) => {
                        if (elem.id.kind === "youtube#video") {
                            return (
                                <div key={idx}>
                                    <Link to={`/video/${elem.id.videoId}`}>
                                        <div className="flex space-x-4">
                                            <img
                                                src={elem.snippet.thumbnails.high.url}
                                                alt="Video Thumbnail"
                                                className="w-60 h-32 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-bold text-lg">{elem.snippet.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {elem.snippet.channelTitle} • {elem.snippet.publishedAt.replace("T", " ")}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {elem.snippet.description.slice(0, 100)}...
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        } else {
                            return null; 
                        }
                    })}



                </div>
            </div>
        )
    }
}

export default Search