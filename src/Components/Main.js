import React from 'react'
import '../App.css'
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from 'react';
import {InputGroup, FormControl, Button, ListGroup} from 'react-bootstrap'

export default function Main() {
    const [problemList, setProblemList] = useState({});
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
                    const {contestId, index, name, rating} = obj.problem;
                    if(contestId && index && name && rating) {
                        const id = contestId + "/" + index;
                        problems[rating][id] = {contestId, index, name, rating, solved:false};
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
                console.log("zyz");
            });
        }
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setList(problemList[problemRating]);
    }, [problemRating, problemList])

    return (
        <ListGroup className="list" >
            {
                list && Object.keys(list).map((key) => {
                    const mprob = list[key];
                    return mprob.solved?<ListGroup.Item action variant="success" key={key}>{mprob.name}</ListGroup.Item>:<ListGroup.Item action variant="light" key={key}>{mprob.name}</ListGroup.Item>
                })
            }
        </ListGroup>
    )
}
