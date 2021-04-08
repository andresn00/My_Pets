import { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [expanded, setExpanded] = useState(false)
    return (
        <Navbar expanded={expanded} onToggle={() => setExpanded(!expanded)} expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">My Pets</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onClick={() => {
                    setExpanded(false)
                }}>
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/profilePage">Cards</Nav.Link>
                </Nav>
                <Nav onClick={() => { setExpanded(false) }}>
                    <Nav.Link as={Link} to="/signIn">Sign in</Nav.Link>
                    <Nav.Link as={Link} to="/signUp">Sign up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
