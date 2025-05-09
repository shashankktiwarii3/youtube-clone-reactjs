import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const History = () => {
  const authData = useContext(AuthContext);


  const history = Array.isArray(authData) ? authData : [];


  if (history.length === 0) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Watch History</h1>
        <p>No history found</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Watch History</h1>
      <div className="space-y-4">
        {history.map((elem, index) => (
          <Link key={index} to={`/video/${elem.id}`} className="flex space-x-4 mb-4 hover:bg-gray-100 p-2 rounded transition">
            <img
              src={elem.thumbnail}
              alt={elem.title}
              className="w-40 h-24 object-cover rounded"
            />
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-gray-800">{elem.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default History;
