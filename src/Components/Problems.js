import React from 'react'
import {ListGroup, DropdownButton, Dropdown, ButtonGroup, Container, Spinner} from 'react-bootstrap'

export default function Problems({problemRating, problemTag, setProblemRating, setProblemTag, list, avRating, tags}) {
    const variant = "secondary";
    return (
        <Container style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
            {(list == undefined)?<Spinner animation="border" variant="secondary" />:(
                <Container className='problem-container'>
                    <DropdownButton 
                        as={ButtonGroup}
                        id={`dropdown-variants-${variant}`}
                        variant={variant.toLowerCase()}
                        title={problemRating}
                        onSelect={(e) => {setProblemRating(e);}}
                    >
                            {
                                avRating.map((r) => <Dropdown.Item key={r} eventKey={r}>{r}</Dropdown.Item>)
                            }
                    </DropdownButton>
                    <DropdownButton style={{"marginTop": "0.5rem"}}
                        as={ButtonGroup}
                        id={`dropdown-variants-${variant}`}
                        variant={variant.toLowerCase()}
                        title={problemTag}
                        onSelect={(e) => {setProblemTag(e);}}
                    >
                            {
                                tags.map((r) => <Dropdown.Item key={r} eventKey={r}>{r}</Dropdown.Item>)
                            }
                    </DropdownButton>
                    {(Object.keys(list).length === 0)?<p><b>Nothing To Show</b></p>:
                    <Container className='problems'>
                        <ListGroup>
                            {
                                Object.keys(list).map((key) => {
                                    const mprob = list[key];
                                    return (mprob.solved
                                    ?<ListGroup.Item href={`https://codeforces.com/contest/${mprob.contestId}/problem/${mprob.index}`} target="_blank" action variant="success"  key={key}>{mprob.name}</ListGroup.Item>
                                    :<ListGroup.Item href={`https://codeforces.com/contest/${mprob.contestId}/problem/${mprob.index}`} target="_blank" action variant="light" key={key}>{mprob.name}</ListGroup.Item>)
                                })
                            }
                        </ListGroup>
                    </Container>}
                </Container>
            )
            }
        </Container>
    )
}