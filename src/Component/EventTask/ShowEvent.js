import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const ShowEvent = (props) => {
    const { Organize, date, imageName, _id } = props.eventData;
    const deleteEvent = (id, event) => {
        alert('Are You sure you want to delete');
        fetch(`https://volunteer-network-server-node.herokuapp.com/deleteEvent/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if(result){
                const infoCard = document.getElementById('infoCard');
                infoCard.parentNode.style.display = 'none';
            }

        })
    }
    return (
        <>
            <Col md={6}>
                <div className="info-card" id="infoCard">
                    <Row>
                        <Col md={6}>
                            <img src={require(`../../images/${imageName}`)} alt={imageName} />
                        </Col>
                        <Col md={6}>
                            <h3>{Organize}</h3>
                            <h4>{date}</h4>
                            <Button onClick={() => deleteEvent(_id)} className="btn btn-primary custom-btn">Cancel</Button>
                        </Col>
                    </Row>
                </div>
            </Col> 
        </>
    );
};

export default ShowEvent;