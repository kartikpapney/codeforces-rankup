import React from 'react'
import {Card, Container, Button, Spinner} from 'react-bootstrap'

function CardView(props) {
  const color = {"newbie": "rgb(204,204,204)", "pupil": "rgb(138,235,118)", "specialist": "rgb(122,221,187)"
  , "expert": "rgb(170,170,254)", "candidate master": "rgb(224,129,254)", 
  "master": "rgb(247,203,136)", "international master": "rgb(244,185,85)", 
  "grandmaster": "rgb(230,113,119)", "international grandmaster": "rgb(228,79,52)",
  "legendary grandmaster": "rgb(173,56,2)"};
  const profile = props.props;
  return (
    <Container className='profile-container' style={{ "overflow": "hidden", "width": "100%", "height": "100%"}}>
        {
          (profile.handle === undefined?<Spinner animation="border" variant="secondary" />:
          <Card style={{ "overflow": "hidden", "display": "block", "width": '18rem' , "height": '70%', "border": `2px solid ${color[profile.rank]}`}}>
            <Card.Img variant="top" src={profile.titlePhoto} height='300px' width='auto' />
            <Card.Body>
                <Card.Title style={{"color": color[profile.rank]}}>{profile.handle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{profile.rank || "Unranked"}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{profile.rating || "Unrated"}</Card.Subtitle>
                <Button variant="secondary" target="_blank" href={`https://codeforces.com/profile/${profile.handle}`}>Checkout</Button>
            </Card.Body>
          </Card>)
        }
    </Container>
  )
}

export default CardView