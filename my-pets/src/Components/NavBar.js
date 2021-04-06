import { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap'
import {Link } from 'react-router-dom'

const NavBar = () => {
const [expanded, setExpanded] = useState(false)    
    return (
        <Navbar expanded={expanded} onToggle={() => setExpanded(!expanded)} expand="lg" bg="dark" variant="dark"
        onSelect={() => {
            // setExpanded(false)
            console.log("aaaaaaaa")
        }}>
            <Navbar.Brand href="#home">My Pets</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onClick={() => {
             setExpanded(false)
        }}>
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/about">Cards</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/login">Log in</Nav.Link>
                    <Nav.Link href="#signup">Sign up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavBar
