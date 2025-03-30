import React from 'react';

export default function CardView({ props }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col items-center">
      <div className="w-24 h-24 mb-2">
        {props.avatar ? (
          <img 
            src={props.avatar} 
            alt={props.handle} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <h2 className="text-lg font-medium text-gray-800">{props.handle}</h2>
      <p className="text-sm text-green-500 mb-2">{props.rank}</p>
      
      <div className="grid grid-cols-2 gap-6 w-full mt-1">
        <div className="text-center">
          <p className="text-xs text-gray-500">Current</p>
          <p className="text-lg font-medium">{props.rating}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Max</p>
          <p className="text-lg font-medium">{props.maxRating}</p>
        </div>
      </div>
    </div>
  );
}