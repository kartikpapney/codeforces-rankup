import React from 'react'
import { colors } from '../constant';

function CardView(props) {
  const profile = props.props;
  return (
    <div className="flex flex-col m-2 p-3 bg-white border border-gray-200 rounded-se-3xl shadow-md">
      <img className="mb-2 w-[250px] h-[250px] " src={profile.titlePhoto} alt=""/>
      <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900"><span style={{color: colors[profile.rank]}}>{profile.rank || "Unranked"}</span> @ {profile.rating || "Unrated"}</h5>
      <div>
        <a href={`https://codeforces.com/profile/${profile.handle}`} target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800">
          {profile.handle}
        </a>
      </div>
    </div>
  )
}

export default CardView