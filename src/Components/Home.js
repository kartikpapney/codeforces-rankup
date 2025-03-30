import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from '../Image/logo.png';

export default function Home() {
  const [friend, setFriend] = useState('');
  const [id, setId] = useState('');
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}&${friend}`);
  };
  
  return (
    <div className="flex bg-gray-100 w-screen h-screen items-center justify-center">
      <div className="p-8 min-w-fit w-10/12 md:w-8/12 lg:w-6/12 rounded-lg border border-gray-200 flex flex-col justify-center items-center bg-white">
        <img
          src={logo}
          className="lg:h-[300px] md:h-[250px] sm:h-[200px] mb-8 object-contain"
          alt="Logo"
        />
        
        <p className="text-center mb-6">
          Compare your Codeforces problem-solving progress with a friend! 
          Just enter your handles, and we'll find the shared problems.
        </p>

        <div className="w-full max-w-md space-y-4 mb-6">
          <div>
            <input
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
              type="text"
              placeholder="Your Handle"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          
          <div>
            <input
              className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
              id="username"
              type="text"
              placeholder="Opponent's Handle"
              onChange={(e) => setFriend(e.target.value)}
            />
          </div>
        </div>
        
        <button
          className="w-full max-w-md py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
          type="button"
          onClick={handleClick}
        >
          Get Problems
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Developed by <a href="https://www.kartikpapney.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Kartik Papney</a> | <a href="https://github.com/kartikpapney" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
        </p>
      </div>
    </div>
  );
}