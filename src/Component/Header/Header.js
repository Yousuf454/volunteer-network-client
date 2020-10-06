import React, { useContext } from 'react';
import {Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../images/logos/Group 1329.png';
import './Header.scss'
const Header = () => {
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    return (
        <div id="navbar">
            <Container>
                <Navbar expand="lg">
                    <Link to="/" className="navbar-brand">
                        <img src={Logo} alt=""/>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/" className="nav-link" >Home</Link>
                            <Link to="/" className="nav-link" >Donation</Link>
                            <Link to="/" className="nav-link" >Event</Link>
                            <Link to="/" className="nav-link" >Blog</Link>
                            <Link to="/" className="nav-link register">Register</Link>
                            <Link to="/" className="nav-link admin">Admin</Link>
                            {
                                loggedinUser.name && <Link className="btn btn-warning" onClick={() => setLoggedinUser({})}>{loggedinUser.name}</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
};

export default Header;