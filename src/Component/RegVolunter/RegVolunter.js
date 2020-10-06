import React, { useContext, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import _ from "lodash/fp";
import { UserContext } from '../../App';
import Logo from '../../images/logos/Group 1329.png';
import './RegVolunter.scss';
const RegVolunter = () => {
    // match task
    const {taksID} = useParams();
    const [mathcData, setMathcData] = useState([]);
    useEffect(() => {
        fetch('https://volunteer-network-server-node.herokuapp.com/child-info')
            .then(response => response.json())
            .then(data => {
                const singleData = data.map(singleData => singleData);
                const matchInfo = singleData.find(info => info._id === taksID);
                setMathcData(matchInfo);
            })
    }, [])
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/event" } }
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const { name, email } = loggedinUser;
    const { register, handleSubmit, errors } = useForm();
    const validCheck = data => {
        const imageName = mathcData.image;
        const userinfo = { ...loggedinUser, ...data, imageName};
        fetch('https://volunteer-network-server-node.herokuapp.com/register-user', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(userinfo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            history.replace(from);
        })
    };
    return (
        <>
            <Container>
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="reg">
                <h3>Regs as a volunteer</h3>
                <Form onSubmit={handleSubmit(validCheck)}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Name" name="name" value={name} ref={register({
                            required: true,
                        })} />
                        {_.get("name.type", errors) === "required" && (
                            <p className="text-danger">Name field is required</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="email" placeholder="Email" value={email} name="email" ref={register({
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })} />
                        {_.get("email.type", errors) === "required" && (
                            <p className="text-danger">Email field is required</p>
                        )}
                        {_.get("email.type", errors) === "pattern" && (
                            <p className="text-danger">Please write a valid email</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="date" name="date" ref={register({
                            required: true,
                        })} />
                        {_.get("date.type", errors) === "required" && (
                            <p className="text-danger">Date field is required</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Description" name="description" ref={register({
                            required: true,
                        })} />
                        {_.get("description.type", errors) === "required" && (
                            <p className="text-danger">Destination field is required</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Organize Book at the library" value={mathcData.eventName} name="Organize" ref={register({
                            required: true,
                        })} />
                        {_.get("Organize.type", errors) === "required" && (
                            <p className="text-danger">Organize field is required</p>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <input type="submit" className="btn custom-button btn-warning w-100" value="Registration" />
                    </Form.Group>
                </Form>
                </div>
            </Container>
        </>
    );
};

export default RegVolunter;