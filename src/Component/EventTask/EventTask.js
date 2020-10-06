import React, { useContext, useEffect, useState } from 'react';
import {Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import './EventTask.scss'
import ShowEvent from './ShowEvent';
const EventTask = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [event, setEvent] = useState([]);
    useEffect(() => {
        fetch('https://volunteer-network-server-node.herokuapp.com/register-person?email=' + loggedinUser.email)
            .then(response => response.json())
            .then(data => setEvent(data))
    }, [])
    
    return (
        <div className="tesk_event">
            <Container>
                <Row>
                    {
                        event.map(eventInfo => <ShowEvent key={eventInfo._id} eventData = {eventInfo}></ShowEvent>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default EventTask;