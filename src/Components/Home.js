import React from "react";
import { useNavigate } from "react-router";
import { useState } from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import logo from '../Image/logo.png'
export default function Home() {

    const [friend, setFriend] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${id}&${friend}`);
    }

    return (
        <div>
            <img src={logo}/>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl
                placeholder="Your Handle"
                aria-label="Your Handle"
                aria-describedby="basic-addon1"
                onChange={(e) => setId(e.target.value)}
            />
            </InputGroup>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl
                placeholder="Friend Handle"
                aria-label="Friend Handle"
                aria-describedby="basic-addon1"
                onChange={(e) => setFriend(e.target.value)}
            />
            </InputGroup>
                <div style={{"display": "flex", "justifyContent": "right"}}>
                <Button variant="secondary" onClick={handleClick}>Get Problems</Button>
            </div>   
        </div>
    )
}
