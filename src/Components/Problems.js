import React from 'react'
import Dropdown from './Dropdown.js';
import { rating, tags } from '../constant.js';

export default function Problems({ props }) {
    

    const { problemRating, problemTag, setProblemRating, setProblemTag, list={} } = props

    return (
        <div className="flex-1 flex-col">
            <div className='flex flex-col items-start'>
                <Dropdown
                    props={{
                        list: rating,
                        value: problemRating,
                        setValue: setProblemRating,
                    }} />
                <Dropdown
                    props={{
                        list: tags,
                        value: problemTag,
                        setValue: setProblemTag
                    }}
                />
            </div>
            <div className='m-1 h-[400px] overflow-y-auto max-w-[300px]'>
                    <table className="w-full border p-2">
                        <tbody>
                            {Object.keys(list).map((key) => {
                                const mprob = list[key];
                                return (
                                    <tr key={key}>
                                        <td
                                            target="_blank"
                                            className={`${mprob.solved ? "bg-green-100" : "bg-red-100"} p-2 cursor-pointer text-sm`}
                                        >
                                            <a href={`https://codeforces.com/contest/${mprob.contestId}/problem/${mprob.index}`} rel="noopener noreferrer" target='_blank'>{mprob.name}</a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div >
        </div>

    )
}