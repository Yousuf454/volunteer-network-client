import React, { useEffect, useState } from 'react';
import { Form, Button, FormControl, Row, Col} from 'react-bootstrap';
import './Home.scss';
import { Container } from '@material-ui/core';
import ChildInfo from '../ChildInfo/ChildInfo';
const Home = () => {

    const [childInfo, setChildInfo] = useState([]);
    useEffect(() => {
        fetch('https://volunteer-network-server-node.herokuapp.com/child-info')
            .then(response => response.json())
            .then(data => setChildInfo(data))
    }, []);
    

    return (
        <div id="home">
        <Container>
                <div className="header">
                    <h2>I Grow by helping people in need</h2>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </div>
                <Row>
                    {
                        childInfo.map(data => <ChildInfo key={data._id} info={data}></ChildInfo>)
                    }
                </Row>
        </Container>
        </div>
    );
};

export default Home;