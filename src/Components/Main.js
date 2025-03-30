import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import CardView from './Card.js';
import Problems from './Problems.js';

export default function Main() {
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({});
    const [friendProfile, setFriendProfile] = useState({});
    const [problemList, setProblemList] = useState({});
    const [problemTag, setProblemTag] = useState('all');
    const [problemRating, setProblemRating] = useState(1700);
    const [list, setList] = useState({});

    const params = useParams();
    const id = params.id;
    const friend = params.friend;

    useEffect(() => {
        // ... (fetch data as before)
        fetch(`https://codeforces.com/api/user.status?handle=${friend}&from=1`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'OK') {
                    const result = data.result;
                    const problems = {}
                    for (var r = 100; r <= 3500; r += 100) problems[r] = new Map();
                    for(const obj of result) {
                        if (obj.verdict === 'OK') {
                            const { contestId, index, name, rating, tags } = obj.problem;
                            if (contestId && index && name && rating && tags) {
                                const id = contestId + "/" + index;
                                problems[rating][id] = { contestId, index, name, rating, tags, solved: false };
                            }
                        }
                    }

                    fetch(`https://codeforces.com/api/user.status?handle=${id}&from=1`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.status === 'OK') {
                                const result = data.result;
                                
                                for(const obj of result) {
                                    if (obj.verdict === 'OK') {
                                        const { contestId, index, name, rating } = obj.problem;
                                        if (contestId && index && name && rating) {
                                            const id = contestId + "/" + index;
                                            if (problems[rating] && problems[rating][id]) problems[rating][id].solved = true;
                                        }
                                    }
                                }
                                setProblemList(problems);
                            }
                        }).catch((e) => {
                            // Error handling
                        });
                }
            }).catch((e) => {
                // Error handling
            });

        fetch(`https://codeforces.com/api/user.info?handles=${id};${friend}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'OK') {
                    setUserProfile(data.result[0]);
                    setFriendProfile(data.result[1]);
                } else {
                    alert("Please enter valid IDs");
                    navigate("../")
                }
            });
    }, [friend, id, navigate]);

    useEffect(() => {
        if (problemTag === 'all') {
            setList(problemList[problemRating]);
        } else {
            const nlist = {};
            for(const key of Object.keys(problemList[problemRating] || {})) {
                const values = problemList[problemRating][key]
                if ((values.tags).includes(problemTag)) {
                    nlist[key] = values;
                }
            }
            setList(nlist);
        }
    }, [problemRating, problemList, problemTag])

    return (
        <div className="flex bg-gray-100 w-screen min-h-screen h-full items-center justify-center">
            <div className="min-w-fit w-11/12 md:w-10/12 lg:w-9/12 p-6 md:p-8 min-h-[500px] rounded-lg border border-gray-200 flex flex-col md:flex-row flex-wrap bg-white">
                {/* Left Side - User Profiles */}
                <div className="w-full md:w-3/12 pr-0 md:pr-6 mb-6 md:mb-0 self-start">
                    <div className="mb-2 text-sm text-gray-500">
                      Developed by <a href="https://www.kartikpapney.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Kartik Papney</a> | <a href="https://www.github.com/kartikpapney" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                    </div>
                    <div className="mb-6">
                        <CardView props={userProfile} />
                    </div>
                    <div>
                        <CardView props={friendProfile} />
                    </div>
                </div>
                
                {/* Right Side - Problems */}
                <div className="w-full md:w-9/12 overflow-auto max-h-[100vh]">
                    <Problems props={{
                        problemRating,
                        list,
                        setProblemRating,
                        setProblemTag,
                        problemTag
                    }} />
                </div>
            </div>
        </div>
    );
}