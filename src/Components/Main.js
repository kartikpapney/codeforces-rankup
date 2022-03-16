import React from 'react'
import '../App.css'
import {useParams, useNavigate } from "react-router";
import { useState, useEffect} from 'react';
import {Container} from 'react-bootstrap'
import CardView from './Card.js'
import Problems from './Problems.js'


export default function Main() {

    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState({});
    const [friendProfile, setFriendProfile] = useState({});
    const avRating = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500];
    const tags = ["all", "2-sat",
"binary search",
"bitmasks",
"brute force",
"chinese remainder theorem",
"combinatorics",
"constructive algorithms",
"data structures",
"dfs and similar",
"divide and conquer",
"dp",
"dsu",
"expression parsing",
"fft",
"flows",
"games",
"geometry",
"graph matchings",
"graphs",
"greedy",
"hashing",
"implementation",
"interactive",
"math",
"matrices",
"meet-in-the-middle",
"number theory",
"probabilities",
"schedules",
"shortest paths",
"sortings",
"string suffix structures",
"strings",
"ternary search",
"trees",
"two pointers"]
    const [problemList, setProblemList] = useState({});
    // const [tagList, setTagList] = useState(['implementation']);
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
            if(data.status === 'OK') {
                const result = data.result;
                const problems = {}
                for(var r = 100; r<=3500; r+=100) problems[r] = new Map();
                result.map((obj, idx) => {
                if(obj.verdict === 'OK') {
                    const {contestId, index, name, rating, tags} = obj.problem;
                    if(contestId && index && name && rating && tags) {
                        const id = contestId + "/" + index;
                        problems[rating][id] = {contestId, index, name, rating, tags, solved:false};
                    }
                }
            });

            fetch(`https://codeforces.com/api/user.status?handle=${id}&from=1`)
            .then((res) => res.json())
            .then((data) => {
                if(data.status === 'OK') {
                    const result = data.result;
                    result.map((obj, idx) => {
                    if(obj.verdict === 'OK') {
                        const {contestId, index, name, rating} = obj.problem;
                        if(contestId && index && name && rating) {
                            const id = contestId + "/" + index;
                            if(problems[rating] && problems[rating][id]) problems[rating][id].solved = true;
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
            if(data.status === 'OK') {
                setUserProfile(data.result[0]);
                setFriendProfile(data.result[1]);
            } else {
                alert("Please enter valid IDs");
                navigate("../")
            }
        });
    }, []);

    useEffect(() => {
        if(problemTag === 'all') {
            setList(problemList[problemRating]);
        } else {
            const nlist = {};
            Object.keys(problemList[problemRating]).map(key => {
                const values = problemList[problemRating][key]
                if((values.tags).includes(problemTag)) {
                    nlist[key] = values;
                }
            })
            setList(nlist);
        }
    }, [problemRating, problemList, problemTag])

    return (
            <Container className='main-container'>
                <CardView props={userProfile}/>
                <Problems problemRating={problemRating} list={list} avRating={avRating} setProblemRating={setProblemRating} tags={tags} setProblemTag={setProblemTag} problemTag={problemTag}/>
                <CardView props={friendProfile}/>
            </Container>
    )
}

