import React from 'react'
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import CardView from './Card.js'
import Problems from './Problems.js'

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
        fetch(`https://codeforces.com/api/user.status?handle=${friend}&from=1`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'OK') {
                    const result = data.result;
                    const problems = {}
                    for (var r = 100; r <= 3500; r += 100) problems[r] = new Map();
                    result.map((obj, idx) => {
                        if (obj.verdict === 'OK') {
                            const { contestId, index, name, rating, tags } = obj.problem;
                            if (contestId && index && name && rating && tags) {
                                const id = contestId + "/" + index;
                                problems[rating][id] = { contestId, index, name, rating, tags, solved: false };
                            }
                        }
                    });

                    fetch(`https://codeforces.com/api/user.status?handle=${id}&from=1`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.status === 'OK') {
                                const result = data.result;
                                result.map((obj, idx) => {
                                    if (obj.verdict === 'OK') {
                                        const { contestId, index, name, rating } = obj.problem;
                                        if (contestId && index && name && rating) {
                                            const id = contestId + "/" + index;
                                            if (problems[rating] && problems[rating][id]) problems[rating][id].solved = true;
                                        }
                                    }
                                });
                                setProblemList(problems);
                            }
                        }).catch((e) => {

                        });
                }
            }).catch((e) => {

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
    }, []);

    useEffect(() => {
        if (problemTag === 'all') {
            setList(problemList[problemRating]);
        } else {
            const nlist = {};
            Object.keys(problemList[problemRating]).map(key => {
                const values = problemList[problemRating][key]
                if ((values.tags).includes(problemTag)) {
                    nlist[key] = values;
                }
            })
            setList(nlist);
        }
    }, [problemRating, problemList, problemTag])

    return (
        <div className="flex bg-blue-200 w-screen min-h-screen h-full items-center justify-center">
            <div className="m-10 p-10 w-8/12 min-h-[400px] rounded-se-3xl shadow-md flex flex-wrap justify-center items-center bg-white overflow-autO">
                <CardView props={userProfile} />
                <CardView props={friendProfile} />
                <Problems props={
                    {
                        problemRating,
                        list,
                        setProblemRating,
                        setProblemTag,
                        problemTag
                    }
                } />
            </div>
        </div>
    )
}

