import React from "react";
import { useNavigate } from "react-router";
import { useState } from 'react';
import logo from '../Image/logo.png'
export default function Home() {

    const [friend, setFriend] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${id}&${friend}`);
    }

    return (
        <div className="flex bg-blue-200 w-screen h-screen items-center justify-center">
            <div className="p-4 w-8/12 rounded-se-3xl shadow-md flex flex-col justify-center items-center bg-white ">
                <img src={logo} className="lg:h-[400px] sm:h-[200px] mb-2" />
                <div className="mb-2"> 
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Your Handle"
                        onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Opponent's Handle"
                        onChange={(e) => setFriend(e.target.value)} />
                </div>
                <button className="m-2 flex-shrink-0 bg-blue-600 border-blue-600 hover:border-blue-700 hover:bg-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button"
                    onClick={handleClick}>
                    Get Problems
                </button>
            </div>

        </div>
    )
}
